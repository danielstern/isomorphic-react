import React from 'react';
import { connect } from 'react-redux';
import {
    Link
} from 'react-router-dom'

 const QuestionListItem = ({tags,answer_count,title,views,question_id})=>(
    <div>
        <h3>
            {title}
        </h3>
        <code>
            {tags.join(',')}
        </code>
        <Link to={`/questions/${question_id}`}>
            <button>Go</button>
        </Link>
    </div>);

const QuestionList = ({questions})=>{
    console.log("Render question list",questions);
    return <div>
        { questions ? <div>
                <h1>Questions</h1>
                {questions.map(question=><QuestionListItem key={question.question_id} {...question}/>)}
            </div> : <div>
                Loading questions...
            </div>}

    </div>
};

const mapStateToProps = (state)=>{
    return {
        questions:state.questions
    }
};

export default connect(mapStateToProps)(QuestionList);