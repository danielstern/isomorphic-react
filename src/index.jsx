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
//     module.hot.accept(()=>{
//         location.reload();
//     });
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default;
        render(NextApp);
    });
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
console.log("Test??");

let initialRender = false;
store.subscribe(()=>{
    const state = store.getState();
    if (! initialRender && state.questions.length > 0) {
        initialRender = false;
        render(App);
    }
});

const fetchDataForLocation = location=>{
    console.log("Location?",location);
    if (location.pathname === "/"){
        console.log("dispatching action...");
        store.dispatch({type:`REQUEST_FETCH_QUESTIONS`})
    }
    if (location.pathname.includes(`questions`)) {
        store.dispatch({type:`REQUEST_FETCH_QUESTION`,question_id:location.pathname.split('/')[2]});
    }
};
fetchDataForLocation(history.location);
history.listen(fetchDataForLocation);