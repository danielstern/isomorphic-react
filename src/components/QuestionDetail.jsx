import React from 'react';
import { connect } from 'react-redux';


/**
 * Todo... wrap component in container,
 * Have container dispatch an action
 * Have saga read action, get question from URL, update state
 * and have container update the application's display automatically
 */

const QuestionDetailDisplay = ()=>(<div>
    <h3>
        Question Detail....
    </h3>
</div>);

const mapStateToProps = (state,ownProps)=>{
    console.log("Rendering question...",state,ownProps);
    return {

    }
};
const mapDispatchToProps = (dispatch)=>({});

export default connect(mapStateToProps,mapDispatchToProps)(QuestionDetailDisplay);