import React from 'react';
import QuestionList from './components/QuestionList'
import QuestionDetail from './components/QuestionDetail'

import {
    HashRouter,
    Switch,
    Route,
    Link
} from 'react-router-dom'

export default ({items = []})=>(
    <div>
        <h1>React Application</h1>
        <div>
        <Link to={`/`}>
            Home
        </Link>
        </div>
        <div>


        <Link to={`/question/1234`}>
            Question
        </Link>
        </div>

        <p>
            <code>{items.length}</code> New questions!!!
        </p>

        <Route exact path='/' render={()=><QuestionList questions={items}/>}/>
        <Route exact path='/question/:id' render={({match})=><QuestionDetail {...match}/>}/>
    </div>
)