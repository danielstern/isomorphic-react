import React from 'react';
import { connect } from 'react-redux';
import {
    Link
} from 'react-router-dom'

/**
 * Each entry in the QuestionList is represtented by a QuestionListItem, which displays high-level information
 * about a question in a format that works well in a list
 */
const QuestionListItem = ({tags,answer_count,title,views,question_id})=>(
    <div>
        <h3>
            {title}
        </h3>
        <code>
            {tags.join(',')}
        </code>
        {/* A link to a dynamically rendered question detail page, whic his handled by React Router*/}
        <div>
            <Link to={`/questions/${question_id}`}>
                <button>More Info</button>
            </Link>
        </div>
    </div>);

/**
 * Display all questions in an array provided to it as a simple list
 */
const QuestionList = ({questions})=>(
    <div>
        { questions ?
            <div>
                {questions.map(question=><QuestionListItem key={question.question_id} {...question}/>)}
            </div> :
            <div>
                Loading questions...
            </div>
        }
    </div>
);

/**
 * Get the list of questions from the application's state
 * It is populated by a ../sagas/fetch-question(s)-saga.
 */
const mapStateToProps = ({questions})=>({
    questions
});

/**
 * Create and export a connected component
 */
export default connect(mapStateToProps)(QuestionList);