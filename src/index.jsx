import App from './App'
import ReactDOM from 'react-dom'
import React from 'react';
import fetch from 'isomorphic-fetch';

import { Provider } from 'react-redux';

import { ConnectedRouter } from 'react-router-redux'
import getStore from './getStore';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();
const store = getStore(history);

// console.log("Router?",Route);

/**
 * TODO ... is caching as a module variable the best solution
 */

/**
 * Todo... reconcile server state pre-fetching and live data fetching...
 */
let _data;

fetch('/data')
    .then(data=>data.json())
    .then(data=>{
        _data = data;
        render(App,_data);
    });

if (module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default;
        render(NextApp, _data);
    })
}

const render = (_App,data)=>{
    ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter  history={history}>
                 <_App {...data}/>
             </ConnectedRouter>
         </Provider>
        ,document.getElementById("AppContainer"));
};