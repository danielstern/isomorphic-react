import React from 'react';
import Markdown from 'react-markdown';
import TagsList from './TagsList'
import { connect } from 'react-redux';

/**
 * Question Detail Display outputs a view containing question information when passed a question
 * as its prop
 * If no question is found, that means the saga that is loading it has not completed, and display an interim message
 */
export const QuestionDetailDisplay = ({title,body,answer_count,tags})=>(
    <div>
        <h3 className="mb-2">
            {title}
        </h3>
        {body ?
            <div>
                <div className="mb-3">
                    <TagsList tags={tags}/>
                </div>
                <Markdown source={body}/>
                <div>
                    {answer_count} Answers
                </div>
            </div> :
            <div>
                {/* If saga has not yet gotten question details, display loading message instead. */}
                <h4>
                    Loading Question...
                </h4>
            </div>
        }
    </div>
);

export const mapStateToProps = (state,ownProps)=>({
    /**
     * Find the question in the state that matches the ID provided and pass it to the display component
     */
    ...state.questions.find(({question_id})=>question_id == ownProps.question_id)
});

/**
 * Create and export a connected component
 */
export default connect(mapStateToProps)(QuestionDetailDisplay);