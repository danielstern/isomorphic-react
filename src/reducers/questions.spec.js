/**
 * Placing every test inside a "describe" block is not a requirement but makes for a good, clean means of organization.
 */
import { questions } from './questions';

/**
 * Testing Reducers is the easiest part of a a React / Redux application.
 * Reducers are pure functions, so they never depend on dependencies that need to be mocked, and
 * can be relied upon to return the same data given similar arguments.
 */
describe("The questions reducer",()=>{
    it ("Should return the same state on an inapplicable action",()=>{
        const state = ["foo","bar"];
        const newState = questions(state,{type:"UNDEFINED_ACTION"});

        /**
         * In this case both toBe and toEqual will return true. However, the real test in this example is toBe, since we want literally the same object both times.
         *
         */
        expect(newState).toBe(state);
        expect(newState).toEqual(state);
    });

    it ("Should add a new questions to the list on a FETCHED_QUESTION action",()=>{
        const state = [{question_id:"foo"},{question_id:"bar"}];
        const newState = questions(state,{type:`FETCHED_QUESTION`,question:{question_id:"baz"}});

        /** Here a map is used to allow a simple one-liner as an equality check.
         * TODO... is there a more applicable matcher available?
         */
        expect(newState.map(q=>q.question_id))
            .toEqual(["baz","foo","bar"]);
    });
});