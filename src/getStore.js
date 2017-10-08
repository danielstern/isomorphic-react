import { createStore, combineReducers,applyMiddleware } from 'redux'
import { routerReducer as router, routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga';
import fetchQuestionSaga from './sagas/fetch-question-saga'
import fetchQuestionsSaga from './sagas/fetch-questions-saga'
import * as reducers from './reducers'

export default function(history,defaultState = {}){
    const middleware = routerMiddleware(history);
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(combineReducers({
        ...reducers,
        router
    }),defaultState,applyMiddleware(middleware, sagaMiddleware));

    if (process.env.NODE_ENV === 'development' && module.hot) {
        /**
         * Todo... implement hot reducer reload
         * This should work out of the box if reducers index files maps all the reducers to an object
         */
        /*
         module.hot.accept('./reducers', () => {
             store.replaceReducer(require('./reducers'));
        });
        */
    }

    sagaMiddleware.run(fetchQuestionSaga);
    sagaMiddleware.run(fetchQuestionsSaga);
    return store;
}