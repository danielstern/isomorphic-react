import { createStore, combineReducers,applyMiddleware } from 'redux'
import { routerReducer as router, routerMiddleware } from 'react-router-redux'
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import fetchQuestionSaga from './sagas/fetch-question-saga'
import fetchQuestionsSaga from './sagas/fetch-questions-saga'
import * as reducers from './reducers'

/**
 * Get store creates a new instance of the store configurable for use
 * on the client (for a living app) and the server (for pre-rendered HTML)
 * @param history
 * A history component. Should be browserHistory for client, and memoryHistroy for server.
 * @param defaultState
 * The default state of the application. Since this is used by React Router, this can affect
 * the application's initial render
 */
export default function(history,defaultState = {}){
    /**
     * Create middleware for React-router and pass in history
     */
    const middleware = routerMiddleware(history);

    /**
     * Create saga middleware to run our sagas
     */
    const sagaMiddleware = createSagaMiddleware();

    /**
     * Create a logger to provide insights to the application's state from the developer window
     * You are encouraged to remove this for production.
     */


    const middlewareChain = [middleware, sagaMiddleware];
    if(process.env.NODE_ENV === 'development') {
        const logger = createLogger();
        middlewareChain.push(logger);
    }

    /**
     * Create a store with the above middlewares, as well as an object containing reducers
     */
    const store = createStore(combineReducers({
        ...reducers,
        router
    }), defaultState,applyMiddleware(...middlewareChain));

    /**
     * Run the sagas which will in turn wait for the appropriate action type before making requests
     */
    sagaMiddleware.run(fetchQuestionSaga);
    sagaMiddleware.run(fetchQuestionsSaga);

    /**
     * Return the store to the caller for application initialization
     */
    return store;
}
