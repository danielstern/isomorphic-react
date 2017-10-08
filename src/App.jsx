import React from 'react';
import QuestionList from './components/QuestionList'
import QuestionDetail from './components/QuestionDetail'
import { connect } from 'react-redux';

import {
    HashRouter,
    Switch,
    Route,
    Link
} from 'react-router-dom'

const AppDisplay =  ({loadQuestion = ()=>{}})=>(
    <div>
        <h1>React Application</h1>
        <div>
            <Link to={`/`}>
                Home
            </Link>
        </div>
        <Route exact path='/' render={()=><QuestionList />}/>
        <Route exact path='/questions/:id' render={({match})=>{
            /**
             * todo... load question details
             */
            {/*setTimeout(loadQuestion(match.params.id),10);*/}

            return <QuestionDetail question_id={match.params.id}/>
        }}/>
    </div>
);

const mapStateToProps = (state,ownProps)=>({
    ...state,
});

const mapDispatchToProps = (dispatch)=>{
    return {
        loadQuestion(question_id){
            dispatch({type:`REQUEST_LOAD_QUESTION`,question_id});
        }
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(AppDisplay);