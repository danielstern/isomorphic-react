import path from 'path';
import express from 'express';
import webpack from 'webpack';
import yields from 'express-yields';
import fs from 'fs-extra';
import App from '../src/App';
import { delay } from 'redux-saga';
import { renderToString } from 'react-dom/server'
import React from 'react'
import { argv } from 'optimist';
import { questions } from '../data/api-real-url';
import { get } from 'request-promise';
import { ConnectedRouter } from 'react-router-redux';
import getStore from '../src/getStore'
import { Provider } from 'react-redux';
const app = express();
const port = process.env.PORT || 3000;
const useServerRender = argv.useServerRender === 'true';
const useLiveData = argv.useLiveData === 'true';
import createHistory from 'history/createMemoryHistory';

if(process.env.NODE_ENV === 'development') {
    const config = require('../webpack.config.babel.dev').default;
    const compiler = webpack(config);
    app.use(require('webpack-dev-middleware')(compiler,{
        noInfo: true,
        stats: {
            assets: false,
            colors: true,
            version: false,
            hash: false,
            timings: false,
            chunks: false,
            chunkModules: false
        }
    }));
    app.use(require('webpack-hot-middleware')(compiler));
}

function * getData (){
    let data;
    if (useLiveData) {
        data = yield get(questions,{gzip:true});
        console.log("data?",data);
    } else {
        data = yield fs.readFile('./data/api-mock-response.json',"utf-8");
    }

    return JSON.parse(data);
}

app.get('/data',function *(req,res){
    const data = yield getData();
    yield delay(50);
    res.json(data);
});

/**
 * Wildcard route serves main application to any URL,
 * while actual routing is handled by React Router.
 */

app.get(['/','/question/:id'], function *(req,res){
    const index = yield fs.readFile('./public/index.html',"utf-8");
    const data = yield getData();
    let indexRender = index.replace(`<%= data %>`,data);

    const history = createHistory({
        initialEntries: [req.path],
    });
    const store = getStore(history,{items:data.items});

    /**
     * Todo... there is quite a bit of repetition between this block and a block in src/index.jsx
     */
    if (useServerRender) {
        const appRendered = renderToString(
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <App {...data}/>
                </ConnectedRouter>
            </Provider>
        );
        indexRender = indexRender.replace(`<%= preloadedApplication %>`,appRendered)
    } else {
        indexRender = indexRender.replace(`<%= preloadedApplication %>`,`Please wait while we load the application.`);
    }
    res.send(indexRender);
});


app.listen(port, '0.0.0.0', ()=>console.info(`Listening at http://localhost:${port}`));