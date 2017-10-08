import { createStore, combineReducers,applyMiddleware } from 'redux'
import { routerReducer as router, routerMiddleware } from 'react-router-redux'
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import fetchQuestionSaga from './sagas/fetch-question-saga'
import fetchQuestionsSaga from './sagas/fetch-questions-saga'
import * as reducers from './reducers'

export default function(history,defaultState = {}){
    const middleware = routerMiddleware(history);
    const sagaMiddleware = createSagaMiddleware();
    const logger = createLogger();
    const store = createStore(combineReducers({
        ...reducers,
        router
    }),defaultState,applyMiddleware(middleware, sagaMiddleware,logger));

    sagaMiddleware.run(fetchQuestionSaga);
    sagaMiddleware.run(fetchQuestionsSaga);

    return store;
}
