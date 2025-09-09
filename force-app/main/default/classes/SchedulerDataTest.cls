@isTest
private class SchedulerDataTest {

    @isTest
    static void testGetEvents() {
        // Arrange: Insert sample events
        List<SchedulerEvent__c> testEvents = new List<SchedulerEvent__c>{
            new SchedulerEvent__c(Name = 'Event 1', Start_Date__c = Date.today(), End_Date__c = Date.today().addDays(1), Text__c = 'First event'),
            new SchedulerEvent__c(Name = 'Event 2', Start_Date__c = Date.today().addDays(2), End_Date__c = Date.today().addDays(3), Text__c = 'Second event')
        };
        insert testEvents;

        // Act
        Test.startTest();
        Map<String, Object> result = SchedulerData.getEvents();
        Test.stopTest();

        // Assert
        System.assert(result.containsKey('events'));
        List<SchedulerEvent__c> fetchedEvents = (List<SchedulerEvent__c>) result.get('events');
        System.assertEquals(2, fetchedEvents.size());
    }
} 
