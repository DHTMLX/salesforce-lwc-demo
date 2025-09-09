@isTest
private class GanttDataTest {
    @isTest
    static void testGetTasks() {
        GanttTask__c parentTask = new GanttTask__c(Name = 'Parent Task', Start_Date__c = Date.today(), Duration__c = 5);
        insert parentTask;

        GanttTask__c childTask = new GanttTask__c(Name = 'Child Task', Start_Date__c = Date.today().addDays(1), Duration__c = 3, Parent__c = parentTask.Id);
        insert childTask;

        GanttLink__c link = new GanttLink__c(Type__c = '1', Source__c = parentTask.Id, Target__c = childTask.Id);
        insert link;

        Test.startTest();
        Map<String, Object> result = GanttData.getTasks();
        Test.stopTest();

        System.assert(result.containsKey('tasks'), 'Should contain key tasks');
        System.assert(result.containsKey('links'), 'Should contain key links');

        List<GanttTask__c> tasks = (List<GanttTask__c>)result.get('tasks');
        List<GanttLink__c> links = (List<GanttLink__c>)result.get('links');

        System.assert(tasks.size() >= 2, 'There should be at least 2 tasks');
        System.assert(links.size() >= 1, 'There should be at least one link');
    }
}
