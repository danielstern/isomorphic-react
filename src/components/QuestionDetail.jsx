import React from 'react';
import Markdown from 'react-markdown';
import { connect } from 'react-redux';

const QuestionDetailDisplay = ({title,body})=>(
    <div>
            <h3>
                Question Detail
            </h3>

                <div>
                <h4>
                    {title}
                </h4>
            </div>
        {body ? <div>
                <Markdown source={body}/>
            </div>: <div>
            <h4>
                Loading question..
            </h4>
        </div>}


    </div>
);

const mapStateToProps = (state,ownProps)=>{
    // debugger;

    const detail = state.questions.find(({question_id})=>question_id.toString() === ownProps.question_id.toString());
    console.log("Rendering question detail...",detail);
    return {
        ...detail
    }
};

const mapDispatchToProps = (dispatch)=>({});

export default connect(mapStateToProps,mapDispatchToProps)(QuestionDetailDisplay);