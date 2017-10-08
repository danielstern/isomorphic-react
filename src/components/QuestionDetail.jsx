import React from 'react';
import Markdown from 'react-markdown';
import { connect } from 'react-redux';

const QuestionDetailDisplay = ({title,body,answer_count,tags})=>(
    <div>
        <h3>
            {title}
        </h3>
        {body ?
            <div>
                <Markdown source={body}/>
                <div>
                    {answer_count} Answers
                </div>
                <div>
                    {tags.map(tag=>(
                        <div key={tag}>
                            {tag}
                        </div>
                    ))}
                </div>
            </div> :
            <div>
                <h4>
                    Loading question..
                </h4>
            </div>
        }
    </div>
);

const mapStateToProps = (state,ownProps)=>({
    ...state.questions.find(({question_id})=>question_id == ownProps.question_id)
});

export default connect(mapStateToProps)(QuestionDetailDisplay);