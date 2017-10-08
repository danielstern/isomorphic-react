import { createStore, combineReducers,applyMiddleware } from 'redux'
import { routerReducer as router, routerMiddleware } from 'react-router-redux'

export default function(history){
    const middleware = routerMiddleware(history);
    const store = createStore(combineReducers({router}),applyMiddleware(middleware));

    if (process.env.NODE_ENV === 'development' && module.hot) {
        /**
         * Todo... implement hot reducer reload
         */
        // module.hot.accept('./reducers', () => {
        //     store.replaceReducer(a=>a);
            // store.replaceReducer(require('./modules/reducer'));
        // });
    }
    return store;
}