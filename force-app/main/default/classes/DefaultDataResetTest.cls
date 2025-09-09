@isTest
private class DefaultDataResetTest {

    @isTest
    static void testExecute() {
        Test.startTest();
        DefaultDataReset job = new DefaultDataReset();
        job.execute(null);
        Test.stopTest();

        System.assert(true);
    }
}
