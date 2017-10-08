import React from 'react';

const QuestionListItem = ({tags,answer_count,title,views})=>(
    <div>
        <h3>
            {title}!!
        </h3>
        <code>
            {tags.join(',')}
        </code>
    </div>);

export default ({questions})=>{
    return questions.map(question=><QuestionListItem key={question.question_id} {...question}/>);
};