describe(`This is a QuestionList test`, () => {
    beforeEach(() => {
        console.log("Printing before each....");
    });

    beforeAll(() => {
        console.log("Printing before all....");
    });

    afterEach(() => {
        console.log("Printing after each....");
    });

    afterAll(() => {
        console.log("Printing after all....");
    });

    it('This is a list of items -ve test', function() {
        expect(2+2).toEqual(4);
    });

    it('This is a list of items for +ve test', function() {
        expect(2+2).not.toEqual(5);
    });

    it.skip('This test will be skipped', function() {
        expect(2+2).not.toEqual(5);
    });

    /* Only this test will be run if enabled */
    // it.only('This test will be skipped', function() {
    //     expect(2+2).not.toEqual(5);
    // });
});
