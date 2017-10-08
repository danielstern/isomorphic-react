import React from 'react';
import QuestionList from './components/QuestionList';
import { Route, IndexRoute } from 'react-router-dom'

/**
 *  Todo... is routes file necessary for server render?
 */
export default ()=>(
    <Route path="/" component={App}>
        {/*<IndexRoute component={Home}/>*/}
        <Route path="/repos" component={Repos}>
            <Route path="/repos/:userName/:repoName" component={Repo}/>
        </Route>
        <Route path="/about" component={About}/>
    </Route>
)