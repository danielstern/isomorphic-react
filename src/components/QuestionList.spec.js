/**
 * In this file we explore testing a React-Redux component by wrapping it in a MemoryRouter and checking the results
 */

import React from 'react';
import { QuestionListItem } from './QuestionList'
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router';


/**
 *  Here we test a React-Redux component. The key takeaway is that it is easier to test the decoupled "display"
    component and consider the "connect" component as an implementation detail.
 */
describe("The question list",()=>{
   describe("The items of the question list",()=>{
       it ("should display a list of items",()=>{
           /**
            * Here we can run into a problem - since the component contains a link, it will throw an error by default unless
            * this component is nested in a router.
            * As a solution, the React Router GitHub page suggest wrapping the component in a memory router.
            * https://github.com/ReactTraining/react-router/issues/4795
            * This actually makes sense since any automatic solution would be too unpredictable.
            */
           const tree = renderer
               .create(
                   <MemoryRouter>
                       <QuestionListItem
                           tags={["css","javascript"]}
                           title="The meaning of life"
                           answer_count={42}
                           question_id="108" />
                   </MemoryRouter>
               );

           /**
            * Here we are using the basic functionality of the React Test Renderer to run assertions against
            * the rendered HTML (and thus avoiding additional libraries such as Enzyme)
            */
           expect(tree.root.findByType("h3").children[0]).toEqual("The meaning of life");
           expect(tree.toJSON()).toMatchSnapshot();
       });

   });
});
