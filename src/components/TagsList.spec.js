import React from 'react';
import TagsList from './TagsList'
import renderer from 'react-test-renderer';


describe("The tags list",()=>{
    /**
     * The tagsList can be tested against an expected snapshot value, as in below.
     */
   it ("renders as expected",()=>{
       const tree = renderer
           .create(<TagsList tags={[`css`,`html`,`typescript`,`coffeescript`]}/>)
           .toJSON();

       expect(tree).toMatchSnapshot();
   });
});