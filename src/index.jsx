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

if (module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default;
        render(NextApp);
    })
}

const render = (_App)=>{
    ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter  history={history}>
                 <_App />
             </ConnectedRouter>
         </Provider>
        ,document.getElementById("AppContainer"));
};

// render(App);
let initialRender = false;
store.subscribe(()=>{
    const state = store.getState();
    if (! initialRender && state.questions.length > 0) {
        initialRender = false;
        render(App);
    }
});