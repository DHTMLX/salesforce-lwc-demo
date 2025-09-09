global with sharing class DefaultDataReset implements Schedulable {

    /*───────────────────────── Schedulable ─────────────────────────*/
    global void execute(SchedulableContext sc){
        restoreScheduler();
        restoreGantt();
        restoreKanban();
    }
    /*─────────────────────────  R E S E T  ─────────────────────────*/
    public static void reset() {
        restoreScheduler();
        restoreGantt();
        restoreKanban();
    }

/*═══════════════  S C H E D U L E R  ═══════════════*/
    private class DemoEvt{
        Integer dayShift;          // 0 = mo, 1 = tu
        String  fromHHmm;          // «HH:mm»
        String  toHHmm;
        String  text;
        DemoEvt(Integer ds,String f,String t,String txt){
            dayShift = ds; fromHHmm = f; toHHmm = t; text = txt;
        }
    }

    /** events */
    private static void restoreScheduler(){

        /* 1. wipe */
        delete [SELECT Id FROM SchedulerEvent__c];

        List<DemoEvt> tpl = new List<DemoEvt>{
            new DemoEvt(0,'02:00','10:20','Product Strategy Hike'),
            new DemoEvt(0,'12:00','16:00','Agile Meditation and Release'),
            new DemoEvt(1,'06:00','11:00','Tranquil Tea Time'),
            new DemoEvt(1,'11:30','19:00','Sprint Review and Retreat'),
            new DemoEvt(2,'01:00','03:00','Kayaking Workshop'),
            new DemoEvt(2,'06:00','08:00','Stakeholder Sunset Yoga Session'),
            new DemoEvt(2,'07:00','12:00','Roadmap Alignment Walk'),
            new DemoEvt(2,'13:00','18:00','Mindful Team Building'),
            new DemoEvt(3,'01:00','18:00','Cross-Functional Expedition'),
            new DemoEvt(3,'14:00','20:00','User Feedback Picnic'),
            new DemoEvt(4,'03:00','08:00','Demo and Showcase'),
            new DemoEvt(4,'11:00','17:00','Quality Assurance Spa Day'),
            new DemoEvt(5,'01:00','03:00','Motion Cycling Adventure'),
            new DemoEvt(5,'10:00','16:00','Competitor Analysis Beach Day'),
            new DemoEvt(6,'02:00','06:00','Creativity Painting Retreat')
        };

        /* 3. start of the current week (Monday) */
        Date weekStart = mondayOfThisWeek();  // API 59+

        /* 4. construct records */
        List<SchedulerEvent__c> evts = new List<SchedulerEvent__c>();
        for(DemoEvt d : tpl){
            Date target = weekStart.addDays(d.dayShift);
            evts.add(new SchedulerEvent__c(
                Start_Date__c = dt(target, d.fromHHmm),
                End_Date__c   = dt(target, d.toHHmm),
                Text__c       = d.text
            ));
        }
        insert evts;
    }

   
    /** Date + «HH:mm» → DateTime  */
    private static DateTime dt(Date base, String hhmm){
        List<String> t = hhmm.split(':');
        Integer h = Integer.valueOf(t[0]);
        Integer m = Integer.valueOf(t[1]);
        return DateTime.newInstanceGMT(base.year(), base.month(), base.day(), h, m, 0);
    }

    private static Date mondayOfThisWeek() {
        // toStartOfWeek() → Sunday, +1 day → Monday
        return Date.today().toStartOfWeek().addDays(1);
    }
    
/*═══════════════  G A N T T  ═══════════════*/
    private static void restoreGantt(){

        /* 1. wipe */
        delete [SELECT Id FROM GanttLink__c];
        delete [SELECT Id FROM GanttTask__c];

        /* 2. date adjust */
        Date    anchor     = d('02-04-2024');
        Integer shiftDays  = anchor.daysBetween( mondayOfThisWeek() );

        /* 3. (demoId, parentDemoId, text, progress, start_ddMMyyyy, duration) */
        List<GanttTask__c>      tasks      = new List<GanttTask__c>();
        Map<Integer,Integer>    idx2demo   = new Map<Integer,Integer>();

        addTask(tasks,idx2demo,1 ,0 ,'Office itinerancy'         ,0.40,'02-04-2024',17,shiftDays);
        addTask(tasks,idx2demo,2 ,1 ,'Office facing'             ,0.60,'02-04-2024', 8,shiftDays);
        addTask(tasks,idx2demo,5 ,2 ,'Interior office'           ,0.80,'02-04-2024', 7,shiftDays);
        addTask(tasks,idx2demo,6 ,2 ,'Air conditioners check'    ,0.60,'03-04-2024', 7,shiftDays);
        addTask(tasks,idx2demo,3 ,1 ,'Furniture installation'    ,0.80,'11-04-2024', 8,shiftDays);
        addTask(tasks,idx2demo,7 ,3 ,'Workplaces preparation'    ,0.60,'11-04-2024', 8,shiftDays);
        addTask(tasks,idx2demo,4 ,1 ,'The employee relocation'   ,0.50,'14-04-2024', 5,shiftDays);
        addTask(tasks,idx2demo,8 ,4 ,'Preparing workplaces'      ,0.80,'14-04-2024', 5,shiftDays);
        addTask(tasks,idx2demo,9 ,4 ,'Workplaces importation'    ,0.70,'14-04-2024', 4,shiftDays);
        addTask(tasks,idx2demo,10,4 ,'Workplaces exportation'    ,0.75,'14-04-2024', 3,shiftDays);
        addTask(tasks,idx2demo,11,0 ,'Product launch'            ,0.60,'02-04-2024',13,shiftDays);
        addTask(tasks,idx2demo,12,11,'Perform Initial testing'   ,1.00,'03-04-2024', 5,shiftDays);
        addTask(tasks,idx2demo,13,11,'Development'               ,0.50,'03-04-2024',11,shiftDays);
        addTask(tasks,idx2demo,17,13,'Develop System'            ,1.00,'03-04-2024', 2,shiftDays);
        addTask(tasks,idx2demo,25,13,'Beta Release'              ,0.00,'06-04-2024', 0,shiftDays); // milestone
        addTask(tasks,idx2demo,18,13,'Integrate System'          ,0.80,'08-04-2024', 2,shiftDays);
        addTask(tasks,idx2demo,19,13,'Test'                      ,0.82,'10-04-2024', 4,shiftDays);
        addTask(tasks,idx2demo,20,13,'Marketing'                 ,0.60,'10-04-2024', 4,shiftDays);
        addTask(tasks,idx2demo,14,11,'Analysis'                  ,0.80,'02-04-2024', 6,shiftDays);
        addTask(tasks,idx2demo,15,11,'Design'                    ,0.20,'03-04-2024', 5,shiftDays);
        addTask(tasks,idx2demo,21,15,'Design database'           ,0.50,'03-04-2024', 4,shiftDays);
        addTask(tasks,idx2demo,22,15,'Software design'           ,0.10,'03-04-2024', 4,shiftDays);
        addTask(tasks,idx2demo,23,15,'Interface setup'           ,0.00,'03-04-2024', 5,shiftDays);
        addTask(tasks,idx2demo,16,11,'Documentation creation'    ,0.00,'02-04-2024', 7,shiftDays);
        addTask(tasks,idx2demo,24,11,'Release v1.0'              ,0.00,'15-04-2024', 0,shiftDays); // milestone

        insert tasks;

        /* 4. demo-id → real id  +   Parent__c */
        Map<Integer,Id>     demo2real  = new Map<Integer,Id>();
        List<GanttTask__c>  parentFix  = new List<GanttTask__c>();

        Integer p = 0;
        for (GanttTask__c t : tasks){
            Integer demo = idx2demo.get(p++);
            demo2real.put(demo, t.Id);

            if (t.Parent__c != null){
                Integer parentDemo = Integer.valueOf(t.Parent__c);
                t.Parent__c = demo2real.get(parentDemo);
                parentFix.add(t);
            }
        }
        if (!parentFix.isEmpty()) update parentFix;

        /* 5. links */
        insert new List<GanttLink__c>{
            link(demo2real,1 ,2 ,'1'),
            link(demo2real,2 ,3 ,'0'),
            link(demo2real,3 ,4 ,'0'),
            link(demo2real,11,12,'1'),
            link(demo2real,17,25,'0'),
            link(demo2real,18,19,'0'),
            link(demo2real,19,20,'0'),
            link(demo2real,13,24,'0'),
            link(demo2real,25,18,'0')
        };
    }

    /* helper: dd-MM-yyyy → Date */
    private static Date d(String ddMMyyyy){
        List<String> p = ddMMyyyy.split('-');
        return Date.newInstance(Integer.valueOf(p[2]), Integer.valueOf(p[1]), Integer.valueOf(p[0]));
    }

    /* helper: add task with date shift */
    private static void addTask(List<GanttTask__c> bucket, Map<Integer,Integer> idx2demo,
                                Integer demoId,Integer parentDemo,String txt,Decimal prog,
                                String start,Integer dur,Integer shift){
        idx2demo.put(bucket.size(), demoId);
        Date shifted = d(start).addDays(shift);
        bucket.add(new GanttTask__c(
            Name          = txt,
            Parent__c     = parentDemo==0 ? null : String.valueOf(parentDemo),
            Start_Date__c = shifted,
            Duration__c   = dur,
            Progress__c   = prog==null?null:(Integer)(prog*100)
        ));
    }

    /* helper: build link */
    private static GanttLink__c link(Map<Integer,Id> m,Integer src,Integer tgt,String typ){
        return new GanttLink__c(
            Source__c = String.valueOf(m.get(src)),
            Target__c = String.valueOf(m.get(tgt)),
            Type__c   = typ
        );
    }


/*═══════════════  K A N B A N  ═══════════════*/
    private static Integer nextSort = 10;

    private static void restoreKanban() {

        /* 1. wipe */
        delete [SELECT Id FROM KanbanAttachment__c];
        delete [SELECT Id FROM KanbanCardUser__c];
        delete [SELECT Id FROM KanbanVote__c];
        delete [SELECT Id FROM KanbanLink__c];
        delete [SELECT Id FROM KanbanCard__c];
        delete [SELECT Id FROM KanbanRow__c];
        delete [SELECT Id FROM KanbanColumn__c];

        /* 2. columns & rows (+ save Id) */
        List<KanbanColumn__c> cols = new List<KanbanColumn__c>{
            new KanbanColumn__c(Label__c = 'Backlog',     ApiName__c = 'backlog'),
            new KanbanColumn__c(Label__c = 'In progress', ApiName__c = 'inprogress'),
            new KanbanColumn__c(Label__c = 'Testing',     ApiName__c = 'testing'),
            new KanbanColumn__c(Label__c = 'Done',        ApiName__c = 'done')
        };
        insert cols;
        Map<String,Id> colId = new Map<String,Id>();
        for (KanbanColumn__c c : cols) colId.put(c.ApiName__c, c.Id);

        List<KanbanRow__c> rows = new List<KanbanRow__c>{
            new KanbanRow__c(Label__c = 'Feature', ApiName__c = 'feature'),
            new KanbanRow__c(Label__c = 'Task',    ApiName__c = 'task')
        };
        insert rows;
        Map<String,Id> rowId = new Map<String,Id>();
        for (KanbanRow__c r : rows) rowId.put(r.ApiName__c, r.Id);

        /* 3. date adjust */
        Integer shift = Date.newInstance(2021,1,7).daysBetween(mondayOfThisWeek());

        /* 4. cards */
        List<KanbanCard__c> cards     = new List<KanbanCard__c>();
        Map<Integer,Integer> idx2demo = new Map<Integer,Integer>();

        addCard(cards,idx2demo,1 , 'Integration with Angular/React',1 , '#65D3B3',
                colId.get('backlog'), rowId.get('feature'), null, '07-01-2021', shift);
        addCard(cards,idx2demo,2 , 'Archive the cards/boards'      ,3 , '#58C3FE',
                colId.get('backlog'), rowId.get('feature'), 100 , null         , shift);
        addCard(cards,idx2demo,3 , 'Searching and filtering'       ,1 , '#58C3FE',
                colId.get('backlog'), rowId.get('task')   , 100 , '09-01-2021', shift);
        addCard(cards,idx2demo,4 , 'Set the tasks priorities'      ,null, '#FFC975',
                colId.get('inprogress'), rowId.get('feature'), 75 , '21-12-2020', shift);
        addCard(cards,idx2demo,5 , 'Custom icons'                  ,null, '#65D3B3',
                colId.get('inprogress'), rowId.get('task')   , null, '07-01-2021', shift);
        addCard(cards,idx2demo,6 , 'Integration with Gantt'        ,null, '#FFC975',
                colId.get('inprogress'), rowId.get('task')   , 75 , '21-12-2020', shift);
        addCard(cards,idx2demo,7 , 'Drag and drop'                 ,1 , '#58C3FE',
                colId.get('testing'), rowId.get('feature')  , 100 , null,        shift);
        addCard(cards,idx2demo,8 , 'Adding images'                 ,null, '#58C3FE',
                colId.get('testing'), rowId.get('task')     , null, null,        shift);
        addCard(cards,idx2demo,9 , 'Create cards and lists …'      ,3 , '#65D3B3',
                colId.get('done'), rowId.get('feature')     , null, '07-01-2021', shift);
        addCard(cards,idx2demo,10, 'Draw swimlanes'                ,null, '#FFC975',
                colId.get('done'), rowId.get('feature')     , null, null,        shift);
        addCard(cards,idx2demo,11, 'Progress bar'                  ,1 , '#FFC975',
                colId.get('done'), rowId.get('task')        , 100 , '09-12-2020', shift);

        insert cards;

        /* 5. demo-id → real */
        Map<Integer,Id> demo2real = new Map<Integer,Id>();
        Integer p = 0; for (KanbanCard__c c : cards) demo2real.put(idx2demo.get(p++), c.Id);

        /* 6. votes, comments, links */
        Id me = (Id)'005gL000004ayjJQAQ'; // 'Aron Long'

        Id otherUser = (Id)'005gL000004asAsQAI'; // Steve Smith

        Id thirdUser = (Id)'005gL000004ayJVQAY'; // 005gL000004ayJVQAY
        /* 7. assignees */ 
        Map<Integer,List<Id>> assignees = new Map<Integer,List<Id>>{
            1  => new List<Id>{thirdUser,          otherUser},   // [3,2]
            2  => new List<Id>{otherUser},                       // [4]
            3  => new List<Id>{otherUser,          me},          // [3,1]
            4  => new List<Id>{otherUser},                       // [4]
            5  => new List<Id>{me,          otherUser},   // [3,2]
            6  => new List<Id>{me},                       // [4]
            7  => new List<Id>{otherUser,          me},          // [3,1]
            8  => new List<Id>{otherUser},                       // [4]
            9  => new List<Id>{me,          otherUser},   // [3,2]
            10 => new List<Id>{          otherUser},             // [2]
            11 => new List<Id>{me, thirdUser,      otherUser}    // [1,4,3]
        };

        List<KanbanCardUser__c> toInsertUsers = new List<KanbanCardUser__c>();
        List<KanbanCard__c>     toUpdateCards = new List<KanbanCard__c>();

        for (Integer demoId : assignees.keySet()) {
            Id realCardId = demo2real.get(demoId);
            List<Id> users = assignees.get(demoId);

            for (Id uid : users)
                toInsertUsers.add(new KanbanCardUser__c(
                    KanbanCard__c = realCardId,
                    User__c       = uid
                ));

            
            KanbanCard__c stub = new KanbanCard__c(
                Id            = realCardId,
                AssignedTo__c = users.isEmpty() ? null : users[0]
            );
            toUpdateCards.add(stub);
        }

        insert toInsertUsers;
        update toUpdateCards;        
            
        insert new List<KanbanVote__c>{
            new KanbanVote__c(KanbanCard__c = demo2real.get(1), User__c = me),
            new KanbanVote__c(KanbanCard__c = demo2real.get(1), User__c = otherUser),
            new KanbanVote__c(KanbanCard__c = demo2real.get(2), User__c = me)
        };

        insert new List<KanbanComment__c>{
            new KanbanComment__c(
                KanbanCard__c = demo2real.get(1),
                User__c       = otherUser,
                Text__c       = 'Hi, Aaron. I am sure that that\'s exactly what is thought best out there in Dunwall. Let\'s just do what we are supposed to do to get the result.'
            ),
            new KanbanComment__c(
                KanbanCard__c = demo2real.get(1),
                User__c       = me,
                Text__c       = 'Greetings, fellow colleagues. I would like to share my insights on this task. I reckon we should deal with at least half of the points in the plan without further delays.'
            )
        
        };     

        insert new List<KanbanLink__c>{
            new KanbanLink__c(MasterCard__c = demo2real.get(1), SlaveCard__c = demo2real.get(3), Relation__c = 'parent'),
            new KanbanLink__c(MasterCard__c = demo2real.get(1), SlaveCard__c = demo2real.get(3), Relation__c = 'duplicate'),
            new KanbanLink__c(MasterCard__c = demo2real.get(2), SlaveCard__c = demo2real.get(1), Relation__c = 'relatesTo')
        };

        insert new List<KanbanAttachment__c>{
            new KanbanAttachment__c(
                KanbanCard__c = demo2real.get(4),
                Name          = 'img-1.jpg',
                Url__c        = 'https://snippet.dhtmlx.com/codebase/data/kanban/01/img/img-1.jpg',
                PreviewURL__c = 'https://snippet.dhtmlx.com/codebase/data/kanban/01/img/img-1.jpg',
                CoverURL__c   = 'https://snippet.dhtmlx.com/codebase/data/kanban/01/img/img-1.jpg',
                IsCover__c    = true
            ),
            new KanbanAttachment__c(
                KanbanCard__c = demo2real.get(8),
                Name          = 'img-2.jpg',
                Url__c        = 'https://snippet.dhtmlx.com/codebase/data/kanban/01/img/img-2.jpg',
                PreviewURL__c = 'https://snippet.dhtmlx.com/codebase/data/kanban/01/img/img-2.jpg',
                CoverURL__c   = 'https://snippet.dhtmlx.com/codebase/data/kanban/01/img/img-2.jpg',
                IsCover__c    = true
            )
        }; 
    }

    /*──────── helper-card ────────*/
    private static void addCard(
            List<KanbanCard__c> bucket,
            Map<Integer,Integer> idx2demo,
            Integer  demoId,
            String   label,
            Integer  pr,
            String   color,
            Id       colId,
            Id       rowId,
            Integer  prog,
            String   ddMMyyyy,
            Integer  shift) {

        idx2demo.put(bucket.size(), demoId);
        Date dt = (ddMMyyyy == null) ? null : d(ddMMyyyy).addDays(shift);

        bucket.add(new KanbanCard__c(
            Name             = label,
            /* fields ColumnApiName__c / RowApiName__c,
             Id → String */
            ColumnApiName__c = String.valueOf(colId),
            RowApiName__c    = String.valueOf(rowId),
            Priority__c      = pr == null ? null
                                        : (pr == 1 ? 'High'
                                        :  pr == 2 ? 'Medium' : 'Low'),
            Color__c         = color,
            Progress__c      = prog,
            StartDate__c     = dt,
            SortOrder__c     = nextSort
        ));
        nextSort += 10;
    }



/*═══════════════  U T I L S  ══════════════*/
    /** gets «YYYY-MM-DD hh:mm» or «DD-MM-YYYY hh:mm» */
    private static DateTime dt(String src){
        String s = src.trim();
        /* convert DD-MM-YYYY → YYYY-MM-DD */
        if(Pattern.matches('^\\d{2}-\\d{2}-\\d{4}.*',s)){
            List<String> p = s.split(' ');
            List<String> d = p[0].split('-');
            s = d[2]+'-'+d[1]+'-'+d[0]+(p.size()>1?' '+p[1]:' 00:00');
        }
        if(!s.contains(' ')) s += ' 00:00';
        if(s.length()==16)   s += ':00';
        return DateTime.valueOfGmt(s);
    }
}
