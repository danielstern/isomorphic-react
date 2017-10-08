import { createStore, combineReducers,applyMiddleware } from 'redux'
import { routerReducer as router, routerMiddleware } from 'react-router-redux'

export default function(history,defaultState = {}){
    const middleware = routerMiddleware(history);
    const store = createStore(combineReducers({
        items:(items = defaultState.items || [])=>items,
        router
    }),defaultState,applyMiddleware(middleware));

    if (process.env.NODE_ENV === 'development' && module.hot) {
        /**
         * Todo... implement hot reducer reload
         */
        /*
         module.hot.accept('./reducers', () => {
             store.replaceReducer(require('./reducers'));
        });
        */
    }
    return store;
}