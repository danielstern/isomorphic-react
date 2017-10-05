import React from 'react';


const QuestionListItem = ({tags,answer_count,title,views})=>(
    <div>
    <h3>
        {title}
    </h3>
    <code>
        {tags.join(',')}
    </code>
</div>);
const QuestionList = ({questions})=>{
    return questions.map(question=><QuestionListItem key={question.question_id} {...question}/>);
};
export default ({items = []})=>(
    <div>
        <h1>React Application</h1>
        <p>
            <code>{items.length}</code> New questions!
        </p>
        <QuestionList questions={items}/>
    </div>
)