@isTest
private class KanbanDataTest {

    static Id columnId;
    static Id rowId;
    static Id userId = UserInfo.getUserId();

    static void setupBaseData() {
        KanbanColumn__c col = new KanbanColumn__c(Label__c = 'To Do', ApiName__c = 'todo');
        KanbanRow__c row = new KanbanRow__c(Label__c = 'Backend', ApiName__c = 'backend');
        insert new List<SObject>{ col, row };
        columnId = col.Id;
        rowId = row.Id;
    }

    @isTest
    static void testGetColumnsAndRows() {
        setupBaseData();
        Test.startTest();
        Map<String, Object> cols = KanbanData.getColumns();
        Map<String, Object> rows = KanbanData.getRows();
        Test.stopTest();

        System.assert(((List<Object>)cols.get('columns')).size() > 0);
        System.assert(((List<Object>)rows.get('rows')).size() > 0);
    }

    @isTest
    static void testCreateAndDeleteCard() {
        setupBaseData();
        String json = JSON.serialize(new Map<String, Object>{
            'label' => 'Test Card',
            'column' => 'todo',
            'row' => 'backend'
        });

        Id cardId = KanbanData.createCard(json);
        System.assertNotEquals(null, cardId);

        Test.startTest();
        KanbanData.deleteCard(cardId);
        Test.stopTest();

        System.assertEquals(0, [SELECT count() FROM KanbanCard__c WHERE Id = :cardId]);
    }

    @isTest
    static void testGetUsers() {
        Test.startTest();
        List<KanbanData.UserDTO> users = KanbanData.getUsers();
        Test.stopTest();
        System.assertNotEquals(null, users);
    }

    @isTest
    static void testGetCardsEmpty() {
        Test.startTest();
        Map<String, Object> res = KanbanData.getCards();
        Test.stopTest();
        System.assert(res.containsKey('cards'));
    }

    @isTest
    static void testVoteLifecycle() {
        setupBaseData();
        KanbanCard__c card = new KanbanCard__c(Name = 'Card', ColumnApiName__c = 'todo', RowApiName__c = 'backend');
        insert card;

        KanbanData.addVote(card.Id);
        KanbanData.deleteVote(card.Id);
    }

    @isTest
    static void testCommentsLifecycle() {
        setupBaseData();
        KanbanCard__c card = new KanbanCard__c(Name = 'Card', ColumnApiName__c = 'todo', RowApiName__c = 'backend');
        insert card;

        Id commentId = KanbanData.addComment(card.Id, 'Initial');
        KanbanData.updateComment(card.Id, commentId, 'Updated');
        KanbanData.deleteComment(card.Id, commentId);
    }

    @isTest
    static void testCreateUpdateDeleteColumnRow() {
        String colJson = JSON.serialize(new Map<String, Object>{ 'label' => 'Column A', 'id' => 'col_a' });
        String rowJson = JSON.serialize(new Map<String, Object>{ 'label' => 'Row A', 'id' => 'row_a' });
        Id colId = KanbanData.createColumn(colJson);
        Id rowId = KanbanData.createRow(rowJson);

        KanbanData.updateColumn(colId, JSON.serialize(new Map<String, Object>{ 'label' => 'Updated', 'id' => 'updated_col' }));
        KanbanData.updateRow(rowId, JSON.serialize(new Map<String, Object>{ 'label' => 'Updated', 'id' => 'updated_row' }));

        KanbanData.deleteColumn(colId);
        KanbanData.deleteRow(rowId);
    }

    @isTest
    static void testLinkLifecycle() {
        setupBaseData();
        KanbanCard__c card1 = new KanbanCard__c(Name = 'Master', ColumnApiName__c = 'todo', RowApiName__c = 'backend');
        KanbanCard__c card2 = new KanbanCard__c(Name = 'Slave', ColumnApiName__c = 'todo', RowApiName__c = 'backend');
        insert new List<KanbanCard__c>{ card1, card2 };

        Id linkId = KanbanData.createLink(JSON.serialize(new Map<String, Object>{
            'masterId' => card1.Id,
            'slaveId' => card2.Id,
            'relation' => 'blocks'
        }));

        KanbanData.updateLink(linkId, JSON.serialize(new Map<String, Object>{ 'relation' => 'relates' }));
        KanbanData.deleteLink(linkId);
    }

    @isTest
    static void testGetLinksEmpty() {
        Test.startTest();
        Map<String, Object> links = KanbanData.getLinks();
        Test.stopTest();
        System.assert(links.containsKey('links'));
    }

    @isTest
    static void testDeleteAllColumns() {
        insert new KanbanColumn__c(Label__c = 'Tmp', ApiName__c = 'tmp');
        Test.startTest();
        KanbanData.deleteAllColumns();
        Test.stopTest();
        System.assertEquals(0, [SELECT count() FROM KanbanColumn__c]);
    }

    @isTest static void testParseDateTimeAndToList() {
        Object iso = '2024-01-01T12:00:00Z';
        Object epoch = 1704100800000L;
        Object empty = '';
        Object garbage = 'not-a-date';
        Object listStr = JSON.serialize(new List<String>{ 'a', 'b' });
        Object realList = new List<String>{ 'a', 'b' };

        DateTime dt1 = KanbanData.parseDateTime(iso);
        DateTime dt2 = KanbanData.parseDateTime(epoch);
        DateTime dt3 = KanbanData.parseDateTime(empty);
        DateTime dt4 = KanbanData.parseDateTime(garbage);
        List<Object> l1 = KanbanData.toList(listStr);
        List<Object> l2 = KanbanData.toList(realList);

        System.assertEquals(2, l1.size());
        System.assertEquals(2, l2.size());
    }

  @isTest
    static void testUpdateCard() {
        setupBaseData();

        KanbanCard__c card1 = new KanbanCard__c(Name = 'Old Name', ColumnApiName__c = 'todo', RowApiName__c = 'backend');
        KanbanCard__c card2 = new KanbanCard__c(Name = 'Another', ColumnApiName__c = 'todo', RowApiName__c = 'backend');
        insert new List<KanbanCard__c>{ card1, card2 };

        List<Id> userIds = new List<Id>();
        for (User u : [SELECT Id FROM User WHERE IsActive = true LIMIT 1]) {
            userIds.add(u.Id);
        }

        ContentVersion version = new ContentVersion(
            Title = 'TestDoc',
            PathOnClient = 'TestDoc.pdf',
            VersionData = Blob.valueOf('Test content')
        );
        insert version;

        ContentDocument doc = [SELECT Id FROM ContentDocument WHERE LatestPublishedVersionId = :version.Id LIMIT 1];

        String updateJson = JSON.serialize(new Map<String, Object>{
            'label' => 'New Name',
            'description' => 'Updated desc',
            'column' => 'todo',
            'row' => 'backend',
            'progress' => 50,
            'priority' => 1,
            'start_date' => '2023-12-01T12:00:00Z',
            'end_date' => '2023-12-10T12:00:00Z',
            'before' => card2.Id,
            'users' => userIds,
            'attached' => new List<Object>{
                new Map<String, Object>{
                    'id' => doc.Id,
                    'isCover' => true
                }
            }
        });

        Test.startTest();
        KanbanData.updateCard(card1.Id, updateJson);
        Test.stopTest();

        KanbanCard__c updated = [SELECT Name, Description__c, AssignedTo__c, Progress__c, Priority__c FROM KanbanCard__c WHERE Id = :card1.Id];
        System.assertEquals('New Name', updated.Name);
        System.assertEquals('Updated desc', updated.Description__c);
        System.assertEquals(userIds[0], updated.AssignedTo__c);
        System.assertEquals(50, updated.Progress__c);
        System.assertEquals('High', updated.Priority__c);
    }

}
