/**
 * In this file we explore testing a React Redux component by writing seperate tests for the display and the container
 */
import { QuestionDetailDisplay , mapStateToProps } from '../QuestionDetail'
import renderer from 'react-test-renderer';
import React from 'react';

describe("The question detail view",()=>{
    describe("The display component",()=>{
       it("Should not regress",()=>{
           const tree = renderer
               .create(
                   <QuestionDetailDisplay
                       title="The meaning of life"
                       body="42"
                       answer_count={0}
                       tags={["hitchhiking"]}
                   />
               );
           expect(tree.toJSON()).toMatchSnapshot();

       }) ;
    });

    /**
     * Note that since Map State to Props is a pure function, we can easily test it here
     * without needing to scaffold the entire application around it.
     */
    describe("Map state to props",()=>{
        const sampleQuestion = {
            question_id:42,
            body:"Space is big"
        };

        const appState = {
            questions:[sampleQuestion]
        };

        const ownProps = {
            question_id: 42
        };

        const componentState = mapStateToProps(appState,ownProps);

        expect(componentState).toEqual(sampleQuestion);

    });
});