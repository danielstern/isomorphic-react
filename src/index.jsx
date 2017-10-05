import App from './App'
import ReactDOM from 'react-dom'
import React from 'react';
import fetch from 'isomorphic-fetch';

import { Provider } from 'react-redux';

import { ConnectedRouter } from 'react-router-redux'
import getStore from './getStore';
import createHistory from 'history/createBrowserHistory';
const history = createHistory();

if(process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept();
}


const store = getStore(history);

fetch('/data')
    .then(data=>data.json())
    .then(data=>{
        console.info("Rendering application",data);
        ReactDOM.render(
            <Provider store={store}>
                <ConnectedRouter  history={history}>
                     <App {...data}/>
                 </ConnectedRouter>
             </Provider>
            ,document.getElementById("AppContainer"))
    });

/**
 * How to reload reducers?
 */