import React from 'react';
import { connect } from 'react-redux';

const QuestionDetailDisplay = ({title})=>(
    <div>
            <h3>
                Question Detail
            </h3>
            {title ?
                <div>
                <h4>
                    {title}
                </h4>
            </div>: <div>
            <h4>
                Loading question...
            </h4>
        </div>}


    </div>
);

const mapStateToProps = (state,ownProps)=>{
    const detail = state.questions.find(({question_id})=>question_id.toString() === ownProps.question_id.toString());
    return {
        ...detail
    }
};

const mapDispatchToProps = (dispatch)=>({});

export default connect(mapStateToProps,mapDispatchToProps)(QuestionDetailDisplay);