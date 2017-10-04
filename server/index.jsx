import path from 'path';
import express from 'express';
import webpack from 'webpack';
import yields from 'express-yields';
import fs from 'fs-extra';
import App from '../src/App';
import { delay } from 'redux-saga';
import { renderToString } from 'react-dom/server'
import React from 'react'

const app = express();
const port = process.env.PORT || 3000;
/*
Todo... pass in with ARGV
 */
const useServerRender = true;

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
    const data = yield fs.readFile('./data/api-mock-response.json',"utf-8");
    return JSON.parse(data);
}

app.get('/data',function *(req,res){
    const data = yield getData();
    yield delay(1000);
    res.json(data);
});

app.get('/', function *(req,res){

    const index = yield fs.readFile('./public/index.html',"utf-8");
    const data = yield getData();
    let indexRender = index.replace(`<%= data %>`,data);
    if (useServerRender) {
        const appRendered = renderToString(<App {...data}/>);
        indexRender = indexRender.replace(`<%= preloadedApplication %>`,appRendered)
    } else {
        indexRender = indexRender.replace(`<%= preloadedApplication %>`,`Please wait while we load the application.`);
    }
    res.send(indexRender);
});


app.listen(port, '0.0.0.0', ()=>console.info(`Listening at http://localhost:${port}`));