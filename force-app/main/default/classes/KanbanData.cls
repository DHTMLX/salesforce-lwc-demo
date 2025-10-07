public with sharing class KanbanData {

    private static final String LIB_NAME = 'KanbanFiles';   //  Files lib

/*═══════════════  COLUMNS  ═══════════════*/
    /**
     * Returns the list of KanbanColumn__c records under the key "columns".
     */
    @AuraEnabled(cacheable=true)
    public static Map<String, Object> getColumns() {
        List<KanbanColumn__c> cols = [
            SELECT Id, ApiName__c, Label__c,
                   Collapsed__c, CssClass__c, Limit__c, StrictLimit__c, Overlay__c
            FROM KanbanColumn__c
        ];
        Map<String, Object> result = new Map<String, Object>();
        result.put('columns', cols);
        return result;
    }

/*═══════════════  ROWS  ═══════════════*/
    /**
     * Returns the list of KanbanRow__c records under the key "rows".
     */
    @AuraEnabled(cacheable=true)
    public static Map<String, Object> getRows() {
        List<KanbanRow__c> rows = [
            SELECT Id, ApiName__c, Label__c,
                   Collapsed__c, CssClass__c
            FROM KanbanRow__c
        ];
        Map<String, Object> result = new Map<String, Object>();
        result.put('rows', rows);
        return result;
    }

/*═══════════════  CARDS  ═══════════════*/
    /**
     * Returns the list of KanbanCard__c records including attachments, comments, and votes
     * under the key "cards".
     */
   @AuraEnabled(cacheable=true)
    public static Map<String, Object> getCards() {
        List<KanbanCard__c> cards = [
            SELECT Id, Name,
                ColumnApiName__c, RowApiName__c,
                Description__c, Progress__c,
                StartDate__c, EndDate__c,
                Priority__c, Color__c, CssClass__c,
                SortOrder__c,

                /* users, attachments, comments, votes */
                (SELECT User__c FROM KanbanUsers__r),
                (SELECT Id, Name, Url__c, PreviewURL__c, CoverURL__c, IsCover__c
                    FROM KanbanAttachments__r),
                (SELECT Id, User__c, Text__c, CreatedDate
                    FROM KanbanComments__r),
                (SELECT User__c FROM KanbanVotes__r),

                (SELECT Id, MasterCard__c, SlaveCard__c, Relation__c
                    FROM MasterLinks__r),
                (SELECT Id, MasterCard__c, SlaveCard__c, Relation__c
                    FROM SlaveLinks__r)

            FROM KanbanCard__c
            ORDER  BY SortOrder__c ASC, CreatedDate ASC
        ];
        return new Map<String,Object>{ 'cards' => cards };
    }

/*═════════════  USERS  ══════════════*/
    /**
     * Data Transfer Object for User (id, label, avatar).
     */
    public class UserDTO {
        @AuraEnabled public String id;
        @AuraEnabled public String label;
        @AuraEnabled public String avatar;
        public UserDTO(String id, String label, String avatar) {
            this.id    = id;
            this.label = label;
            this.avatar = avatar;
        }
    }

    /**
     * Returns only the six demo users, in DTO format.
     */
    @AuraEnabled(cacheable=true)
    public static List<UserDTO> getUsers() {
        /* ——— allowed user Ids ——— */
        // Comment out this
        // Set<Id> allowed = new Set<Id>{
        //     '005gL000004asAsQAI', // 'Steve Smith'
        //     '005gL000004ayJVQAY', // 'Angela Allen'
        //     '005gL000004ayjJQAQ', // 'Aron Long'
        //     '005gL000004ayplQAA', // 'Angela Long'
        //     '005gL000004qjErQAI' // DHTMLX USER
        // };

        // Comment out this
        // List<User> us = [
        //     SELECT Id, Name, SmallPhotoUrl
        //     FROM   User
        //     WHERE  Id IN :allowed
        //     AND    IsActive = true
        //     ORDER  BY Name
        // ];

        
        // Uncomment the following lines to retrieve all active users from your org.
        // WARNING: This may return a large number of users and impact performance.
        List<User> us = [
            SELECT Id, Name, SmallPhotoUrl
            FROM   User
            WHERE  IsActive = true
            ORDER  BY Name
        ];
        

        List<UserDTO> result = new List<UserDTO>();
        for (User u : us) {
            String avatarUrl = (u.SmallPhotoUrl != null) ? u.SmallPhotoUrl : '';
            result.add(new UserDTO(u.Id, u.Name, avatarUrl));
        }
        return result;
    }

/*══════════ LINKS  ══════════*/
    public class LinkDTO {
        @AuraEnabled public Id     id;
        @AuraEnabled public Id     masterId;
        @AuraEnabled public Id     slaveId;
        @AuraEnabled public String relation;
        public LinkDTO(KanbanLink__c l) {
            id        = l.Id;
            masterId  = l.MasterCard__c;
            slaveId   = l.SlaveCard__c;
            relation  = l.Relation__c;
        }
    }

    @AuraEnabled(cacheable=true)
    public static Map<String,Object> getLinks() {
        List<KanbanLink__c> ls = [
            SELECT Id, MasterCard__c, SlaveCard__c, Relation__c
            FROM   KanbanLink__c
        ];
        List<LinkDTO> dto = new List<LinkDTO>();
        for (KanbanLink__c l : ls) dto.add(new LinkDTO(l));
        return new Map<String,Object>{ 'links' => dto };
    }

/*═════════════  HELPERS  ══════════════*/
    private static Map<String,Object> parse(String jsonStr) {
        return (Map<String,Object>) System.JSON.deserializeUntyped(jsonStr);
    }

/*═══════════════  CARDS CRUD  ═══════════════*/
    @AuraEnabled
    public static Id createCard(String cardJson) {
        Map<String,Object> d = parse(cardJson);
        KanbanCard__c rec = new KanbanCard__c();
        rec.Name             = (String)d.get('label');
        rec.ColumnApiName__c = (String)d.get('column');
        rec.RowApiName__c    = (String)d.get('row');
        insert rec;
        return rec.Id;
    }
    /*═══════════════  UPDATE CARD  ═══════════════*/
    @AuraEnabled
    public static void updateCard(Id cardId, String cardJson) {

        Map<String, Object> d = parse(cardJson);

        KanbanCard__c rec = [
            SELECT Id, Name,
                ColumnApiName__c, RowApiName__c,
                Description__c, Progress__c,
                StartDate__c,   EndDate__c,
                Priority__c,    Color__c,
                CssClass__c,    AssignedTo__c,
                SortOrder__c
            FROM   KanbanCard__c
            WHERE  Id = :cardId
            LIMIT  1
            FOR UPDATE 
        ];

        if (d.containsKey('label'))       rec.Name             = (String)d.get('label');
        if (d.containsKey('column'))      rec.ColumnApiName__c = (String)d.get('column');
        if (d.containsKey('row'))         rec.RowApiName__c    = (String)d.get('row');
        if (d.containsKey('description')) rec.Description__c   = (String)d.get('description');
        if (d.containsKey('color'))       rec.Color__c         = (String)d.get('color');
        if (d.containsKey('css'))         rec.CssClass__c      = (String)d.get('css');

        /* ---------- progress ---------- */
        if (d.containsKey('progress')) {
            Object p = d.get('progress');
            if (p == null) {
                rec.Progress__c = null;
            } else {
                String s = String.valueOf(p).trim();
                if (s == '' || s.equalsIgnoreCase('null')) {
                    rec.Progress__c = null;
                } else {
                    if (s.contains('.')) s = s.split('\\.')[0];
                    if (s.contains(',')) s = s.split(',')[0];
                    try { rec.Progress__c = Integer.valueOf(s); }
                    catch (Exception ex) { rec.Progress__c = null; }
                }
            }
        }

        if (d.containsKey('start_date')) rec.StartDate__c = parseDateTime(d.get('start_date'));
        if (d.containsKey('end_date'))   rec.EndDate__c   = parseDateTime(d.get('end_date'));

        /* ---------- priority ---------- */
        if (d.containsKey('priority')) {
            Object pr = d.get('priority');
            if      (pr == null)             rec.Priority__c = null;
            else if (pr instanceof Integer) {
                Integer n = (Integer)pr;
                rec.Priority__c = (n == 1 ? 'High' : n == 2 ? 'Medium' : n == 3 ? 'Low' : null);
            } else  rec.Priority__c = String.valueOf(pr);
        }

        /* =================================================================== */
        /*  SORT ORDER                                                         */
        /* =================================================================== */

        String tgtCol  = d.containsKey('column') ? (String)d.get('column') : rec.ColumnApiName__c;
        String tgtRow  = d.containsKey('row')    ? (String)d.get('row')    : rec.RowApiName__c;
        Id     beforeId = (d.containsKey('before') && d.get('before') != null)
                        ? (Id)d.get('before') : null;

        if (beforeId != null && String.valueOf(beforeId).length() != 18)
            beforeId = null;
        List<KanbanCard__c> scope = [
            SELECT Id, SortOrder__c
            FROM   KanbanCard__c
            WHERE  ColumnApiName__c = :tgtCol
            AND    RowApiName__c    = :tgtRow
            AND    Id               != :rec.Id
            ORDER  BY SortOrder__c, CreatedDate
        ];
        /* position where to insert the current card */
        Integer idx = scope.size();           // by default — append to the end
        if (beforeId != null) {
            for (Integer i = 0; i < scope.size(); i++)
                if (scope[i].Id == beforeId) { idx = i; break; }
        }

        /* safe addition */
        if (idx == scope.size())
            scope.add(rec);
        else
            scope.add(idx, rec);

        /* recalculation of SortOrder__c */
        List<KanbanCard__c> upd = new List<KanbanCard__c>();
        for (Integer i = 0; i < scope.size(); i++) {
            Decimal want = (i + 1) * 10;
            if (scope[i].SortOrder__c != want) {
                scope[i].SortOrder__c = want;
                upd.add(scope[i]);
            }
        }

        /* =================================================================== */
        /*  USERS                                                              */
        /* =================================================================== */
        if (d.containsKey('users')) {
            List<Object> rawUsers = toList(d.get('users'));
            Set<Id> newUsers = new Set<Id>();
            for (Object o : rawUsers) newUsers.add((Id)o);

            Map<Id,KanbanCardUser__c> existing = new Map<Id,KanbanCardUser__c>([
                SELECT Id, User__c
                FROM   KanbanCardUser__c
                WHERE  KanbanCard__c = :cardId
            ]);

            List<KanbanCardUser__c> toInsert = new List<KanbanCardUser__c>(),
                                    toDelete = new List<KanbanCardUser__c>();

            for (Id uid : newUsers)
                if (!existing.containsKey(uid))
                    toInsert.add(new KanbanCardUser__c(KanbanCard__c = cardId, User__c = uid));

            for (Id uid : existing.keySet())
                if (!newUsers.contains(uid))
                    toDelete.add(existing.get(uid));

            if (!toDelete.isEmpty()) delete toDelete;
            if (!toInsert.isEmpty()) insert toInsert;

            rec.AssignedTo__c = newUsers.isEmpty() ? null : newUsers.iterator().next();
        }

        /* =================================================================== */
        /*  ATTACHMENTS                                   */
        /* =================================================================== */
        if (d.containsKey('attached')) {

                List<Object> incoming = toList(d.get('attached'));

                Map<Id,KanbanAttachment__c> existing = new Map<Id,KanbanAttachment__c>();
                for (KanbanAttachment__c a : [
                    SELECT Id, ContentDocumentId__c, IsCover__c
                    FROM   KanbanAttachment__c
                    WHERE  KanbanCard__c        = :cardId
                    AND    ContentDocumentId__c != null
                ]) existing.put(a.ContentDocumentId__c, a);

                List<KanbanAttachment__c> toIns = new List<KanbanAttachment__c>(),
                                        toUpd = new List<KanbanAttachment__c>(),
                                        toDel = new List<KanbanAttachment__c>();
                Set<Id> orphanDocs = new Set<Id>();

                for (Object o : incoming) {

                    Map<String,Object> m = (Map<String,Object>)o;
                    Id rawId      = (Id)m.get('id');
                    Boolean isCover = (m.get('isCover') == true);

                    /*  ContentDocumentId */
                    Id docId;
                    if (rawId.getSObjectType() == ContentDocument.SObjectType) {
                        docId = rawId;
                    } else if (rawId.getSObjectType() == ContentVersion.SObjectType) {
                        docId = [SELECT ContentDocumentId FROM ContentVersion WHERE Id = :rawId LIMIT 1]
                                .ContentDocumentId;
                    } else if (rawId.getSObjectType() == KanbanAttachment__c.SObjectType) {
                        KanbanAttachment__c ka = [
                            SELECT ContentDocumentId__c FROM KanbanAttachment__c WHERE Id = :rawId LIMIT 1
                        ];
                        docId = ka.ContentDocumentId__c;
                    } else {
                        continue;
                    }
                    if (docId == null) continue;

                    if (existing.containsKey(docId)) {
                        KanbanAttachment__c att = existing.remove(docId);
                        if (att.IsCover__c != isCover) { att.IsCover__c = isCover; toUpd.add(att); }
                        continue;
                    }

                    /* new file — creating a "wrapper" */
                    ContentDocument doc = [
                        SELECT Id, LatestPublishedVersionId, Title
                        FROM   ContentDocument
                        WHERE  Id = :docId
                        LIMIT  1
                    ];

                    if ([SELECT COUNT() FROM ContentDocumentLink
                        WHERE ContentDocumentId = :doc.Id AND LinkedEntityId = :cardId] == 0) {
                        insert new ContentDocumentLink(
                            ContentDocumentId = doc.Id,
                            LinkedEntityId    = cardId,
                            ShareType         = 'V'
                        );
                    }

                    String base = '/sfc/servlet.shepherd/';
                    String prev = base + 'version/renditionDownload?rendition=THUMB120BY90&versionId='
                                + doc.LatestPublishedVersionId;
                    String url  = base + 'document/download/' + doc.Id + '/'
                                + EncodingUtil.urlEncode(doc.Title,'UTF-8');

                    toIns.add(new KanbanAttachment__c(
                        KanbanCard__c        = cardId,
                        ContentDocumentId__c = doc.Id,
                        Name                 = doc.Title,
                        Url__c               = url,
                        PreviewURL__c        = prev,
                        CoverURL__c          = prev,
                        IsCover__c           = isCover
                    ));
                }

                if (!existing.isEmpty()) {
                    toDel.addAll(existing.values());
                    orphanDocs.addAll(existing.keySet());
                }

                if (!toDel.isEmpty()) Database.delete(toDel,false);
                if (!toUpd.isEmpty()) Database.update(toUpd,false);
                if (!toIns.isEmpty()) Database.insert(toIns,false);

                /* clean up physical documents without links */
                if (!orphanDocs.isEmpty()) {
                    List<ContentDocument> docsToDelete = new List<ContentDocument>();
                    for (AggregateResult ar : [
                        SELECT ContentDocumentId doc, COUNT(Id) cnt
                        FROM   ContentDocumentLink
                        WHERE  ContentDocumentId IN :orphanDocs
                        GROUP  BY ContentDocumentId
                    ]) {
                        if ((Integer)ar.get('cnt') == 0)
                            docsToDelete.add(new ContentDocument(Id = (Id)ar.get('doc')));
                    }
                    if (!docsToDelete.isEmpty()) Database.delete(docsToDelete,false);
                }
            }

        /* =================================================================== */
        /*  FINAL DML                                                          */
        /* =================================================================== */
        List<KanbanCard__c> toSave = new List<KanbanCard__c>();
        toSave.add(rec);                       // the card itself
        for (KanbanCard__c cItem : upd)        // neighbors with updated SortOrder__c
            if (cItem.Id != rec.Id) toSave.add(cItem);

        if (!toSave.isEmpty())
            Database.update(toSave, false);    // allOrNone = false
    }

    @AuraEnabled
    public static void deleteCard(Id cardId) {
        if (cardId == null) return;

        /* Links (both master & slave) */
        delete [
            SELECT Id
            FROM   KanbanLink__c
            WHERE  MasterCard__c = :cardId
               OR  SlaveCard__c  = :cardId
        ];

        /* Votes, users, comments */
        delete [SELECT Id FROM KanbanVote__c     WHERE KanbanCard__c = :cardId];
        delete [SELECT Id FROM KanbanCardUser__c WHERE KanbanCard__c = :cardId];
        delete [SELECT Id FROM KanbanComment__c  WHERE KanbanCard__c = :cardId];

        /* Attachments  →  ContentDocumentLink  →  (optionally) orphan docs */
        List<KanbanAttachment__c> atts = [
            SELECT Id, ContentDocumentId__c
            FROM   KanbanAttachment__c
            WHERE  KanbanCard__c = :cardId
        ];
        if (!atts.isEmpty()) {
            /* a) break doc ↔ card link */
            Set<Id> docIds = new Set<Id>();
            for (KanbanAttachment__c a : atts) if (a.ContentDocumentId__c != null)
                docIds.add(a.ContentDocumentId__c);

            if (!docIds.isEmpty()) {
                delete [
                    SELECT Id
                    FROM   ContentDocumentLink
                    WHERE  LinkedEntityId    = :cardId
                    AND    ContentDocumentId IN :docIds
                ];
            }
            /* b) delete attachment wrappers themselves */
            delete atts;

            /* c) auto cleanup orphaned ContentDocument (storage hygiene, optional) */
            List<ContentDocument> toZap = new List<ContentDocument>();
            if (!docIds.isEmpty()) {
                for (AggregateResult ar : [
                    SELECT ContentDocumentId doc, COUNT(Id) cnt
                    FROM   ContentDocumentLink
                    WHERE  ContentDocumentId IN :docIds
                    GROUP  BY ContentDocumentId
                ]) {
                    if ((Integer)ar.get('cnt') == 0)           // no more links at all
                        toZap.add(new ContentDocument(Id = (Id)ar.get('doc')));
                }
                if (!toZap.isEmpty()) Database.delete(toZap, /*allOrNone*/ false);
            }
        }

        /* Finally – remove the card itself */
        delete [SELECT Id FROM KanbanCard__c WHERE Id = :cardId LIMIT 1];
    }

/*═══════════════  COLUMNS CRUD  ═══════════════*/
    @AuraEnabled
    public static Id createColumn(String columnJson) {
        Map<String,Object> d = parse(columnJson);
        KanbanColumn__c rec = new KanbanColumn__c();
        rec.Label__c   = (String)d.get('label');
        rec.ApiName__c = (String)d.get('id');
        insert rec;
        return rec.Id;
    }

    @AuraEnabled
    public static void updateColumn(Id columnId, String columnJson) {
        Map<String,Object> d = parse(columnJson);
        KanbanColumn__c rec = [SELECT Id FROM KanbanColumn__c WHERE Id = :columnId LIMIT 1];
        if (d.containsKey('label')) rec.Label__c   = (String)d.get('label');
        if (d.containsKey('id'))    rec.ApiName__c = (String)d.get('id');
        update rec;
    }

    @AuraEnabled
    public static void deleteColumn(Id columnId) {
        delete [SELECT Id FROM KanbanColumn__c WHERE Id = :columnId LIMIT 1];
    }

/*═══════════════  ROWS CRUD  ═══════════════*/
    @AuraEnabled
    public static Id createRow(String rowJson) {
        Map<String,Object> d = parse(rowJson);
        KanbanRow__c rec = new KanbanRow__c();
        rec.Label__c   = (String)d.get('label');
        rec.ApiName__c = (String)d.get('id');
        insert rec;
        return rec.Id;
    }

    @AuraEnabled
    public static void updateRow(Id rowId, String rowJson) {
        Map<String,Object> d = parse(rowJson);
        KanbanRow__c rec = [SELECT Id FROM KanbanRow__c WHERE Id = :rowId LIMIT 1];
        if (d.containsKey('label')) rec.Label__c   = (String)d.get('label');
        if (d.containsKey('id'))    rec.ApiName__c = (String)d.get('id');
        update rec;
    }

    @AuraEnabled
    public static void deleteRow(Id rowId) {
        delete [SELECT Id FROM KanbanRow__c WHERE Id = :rowId LIMIT 1];
    }


/*══════════════  VOTES  ══════════════*/
    @AuraEnabled
    public static void addVote(Id cardId) {
        Id me = UserInfo.getUserId();
        if ([
            SELECT COUNT() FROM KanbanVote__c
            WHERE KanbanCard__c = :cardId AND User__c = :me
        ] == 0) {
            insert new KanbanVote__c(
                KanbanCard__c = cardId,
                User__c       = me
            );
        }
    }

    @AuraEnabled
    public static void deleteVote(Id cardId) {
        Id me = UserInfo.getUserId();
        List<KanbanVote__c> mine = [
            SELECT Id FROM KanbanVote__c
            WHERE KanbanCard__c = :cardId AND User__c = :me
        ];
        if (!mine.isEmpty()) delete mine;
    }


/*════════════  COMMENTS  ════════════*/
    @AuraEnabled
    public static Id addComment(Id cardId, String text) {
        KanbanComment__c c = new KanbanComment__c(
            KanbanCard__c = cardId,
            User__c       = UserInfo.getUserId(),
            Text__c       = text
        );
        insert c;
        return c.Id;
    }
    @AuraEnabled
    public static void updateComment(Id cardId, Id commentId, String text) {
        Id me = UserInfo.getUserId();

        KanbanComment__c c = [
            SELECT Id, Text__c
            FROM   KanbanComment__c
            WHERE  Id            = :commentId
            AND  KanbanCard__c = :cardId
            AND  User__c       = :me
            LIMIT 1
        ];

        c.Text__c = text;
        update c;
    }
    @AuraEnabled
    public static void deleteComment(Id cardId, Id commentId) {
        Id me = UserInfo.getUserId();
        KanbanComment__c c = [
            SELECT Id FROM KanbanComment__c
            WHERE Id = :commentId
            AND KanbanCard__c = :cardId
            AND User__c = :me
            LIMIT 1
        ];
        delete c;
    }

/*════════════  LINKS  ════════════*/
    @AuraEnabled
    public static Id createLink(String linkJson) {
        Map<String,Object> d = (Map<String,Object>)JSON.deserializeUntyped(linkJson);
        KanbanLink__c rec = new KanbanLink__c(
            MasterCard__c = (Id)d.get('masterId'),
            SlaveCard__c  = (Id)d.get('slaveId'),
            Relation__c   = (String)d.get('relation')
        );
        insert rec;
        return rec.Id;
    }

    @AuraEnabled
    public static void updateLink(Id linkId, String linkJson) {
        Map<String,Object> d = (Map<String,Object>)JSON.deserializeUntyped(linkJson);
        KanbanLink__c rec = [SELECT Id, Relation__c FROM KanbanLink__c WHERE Id = :linkId];
        rec.Relation__c = (String)d.get('relation');
        update rec;
    }

    @AuraEnabled
    public static void deleteLink(Id linkId) {
        delete [SELECT Id FROM KanbanLink__c WHERE Id = :linkId];
    }

/*═══════════════  HOUSEKEEPING  ═══════════════*/
    @AuraEnabled
    public static void deleteAllColumns() {
        List<KanbanColumn__c> cols = [SELECT Id FROM KanbanColumn__c];
        if (!cols.isEmpty()) delete cols;
    }

/*═══════════════  FILE UPLOAD  ═══════════════*/

  /*═══════════════  DTO  ══════════════*/
    public class UploadResult {
        @AuraEnabled public String id;         // ContentVersion.Id
        @AuraEnabled public String url;        // download URL
        @AuraEnabled public String previewURL; // thumb-120х90
        @AuraEnabled public String coverURL;   // mini-cover
        @AuraEnabled public String name;       // file name
    }

    /*═══════════════  UPLOAD  ══════════════*/
    /**
     *
     * @param fileName 
     * @param base64Body
     */
/*═══════════════  FILE UPLOAD  ══════════════*/


@AuraEnabled
public static UploadResult uploadAttachment(String fileName, String base64Body) {

    /* Locate the library */
    ContentWorkspace cw = [
        SELECT Id
        FROM   ContentWorkspace
        WHERE  Name = :LIB_NAME
        LIMIT  1
    ];
    if (cw == null)
        throw new AuraHandledException('Library «' + LIB_NAME + '» not found. Ask admin to create it in Files ▸ Libraries.');

    /* Decode the body */
    Blob data = EncodingUtil.base64Decode(base64Body);
    if (data == null || data.size() == 0)
        throw new AuraHandledException('Empty body');
    if (data.size() > 37000000)                // ≈37 MB
        throw new AuraHandledException('File is too big');

    /* create ContentVersion and publish directly to the library */
    ContentVersion cv = new ContentVersion(
        Title                  = fileName.left(255),
        PathOnClient           = fileName.left(255),
        VersionData            = data,
        IsMajorVersion         = true,
        FirstPublishLocationId = cw.Id
    );
    insert cv;

    /* Retrieve ContentDocument + construct URLs */
    cv = [SELECT Id, ContentDocumentId FROM ContentVersion WHERE Id = :cv.Id];
    ContentDocument doc = [
        SELECT Id, LatestPublishedVersionId, Title
        FROM   ContentDocument
        WHERE  Id = :cv.ContentDocumentId
        LIMIT  1
    ];

    String base  = '/sfc/servlet.shepherd/';
    String url   = base + 'document/download/' + doc.Id + '/'
                 + EncodingUtil.urlEncode(doc.Title, 'UTF-8');
    String thumb = base + 'version/renditionDownload'
                 + '?rendition=THUMB120BY90&versionId=' + doc.LatestPublishedVersionId;

    /* DTO */
    UploadResult res = new UploadResult();
    res.id         = cv.Id;
    res.url        = url;
    res.previewURL = thumb;
    res.coverURL   = thumb;
    res.name       = fileName;
    return res;
}
/*───────────────────────────────*/
/*──────────  UTILITIES  ────────*/
/*───────────────────────────────*/
    
    @TestVisible
    private static DateTime parseDateTime(Object val) {
        if (val == null) return null;

        /* epoch-millis */
        if (val instanceof Decimal || val instanceof Integer || val instanceof Long)
            return DateTime.newInstance(((Decimal)val).longValue());

        String s = String.valueOf(val).trim();
        if (s == '' || s == '{}' || s == 'null') return null;

        try {
            if (s.endsWith('Z')) {
                s = s.substring(0, s.length() - 1);
                if (s.contains('T'))
                    s = s.replace('T',' ').substring(0,19);
                return DateTime.valueOfGmt(s);
            }
            if (s.contains('T'))
                s = s.replace('T',' ').substring(0,19);
            return DateTime.valueOf(s);
        } catch (Exception ex) {
            return null;
        }
    }

    @TestVisible
    private static List<Object> toList(Object anyVal) {
        if (anyVal == null)
            return new List<Object>();

        if (anyVal instanceof List<Object>)
            return (List<Object>)anyVal;

        if (anyVal instanceof String) {
            try {
                return (List<Object>)
                    JSON.deserializeUntyped((String)anyVal);
            } catch (Exception e) {
                return new List<Object>();
            }
        }
        return new List<Object>();
    }    
}