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
import { questions, question } from '../data/api-real-url';
import { get } from 'request-promise';
import { ConnectedRouter } from 'react-router-redux';
import getStore from '../src/getStore'
import { Provider } from 'react-redux';
import createHistory from 'history/createMemoryHistory';

/**
 * Try and find a specific port as provided by an external cloud host, or go with a default value
 */
const port = process.env.PORT || 3000;
const app = express();

/**
 * Get basic configuration settings from arguments
 * This can be replaced with webpack configuration or other global variables as required
 * When useServerRender is true, the application will be pre-rendered on the server. Otherwise,
 * just the normal HTML page will load and the app will bootstrap after it has made the required AJAX calls
 */
const useServerRender = argv.useServerRender === 'true';

/**
 * When useLiveData is true, the application attempts to contact Stackoverflow and interact with its actual API.
 * NOTE: Without an API key, the server will cut you off after 300 requests. To solve this, get an API key from
 * Stackoverflow (for free at https://stackapps.com/apps/oauth/register)
 * OR, just disable useLiveData
 */
const useLiveData = argv.useLiveData === 'true';

/**
 * The block below will run during development and facilitates live-reloading
 * If the process is development, set up the full live reload server
 */
if(process.env.NODE_ENV === 'development') {
    /**
     * Get the development configuration from webpack.config.
     */
    const config = require('../webpack.config.dev.babel.js').default;

    /**
     * Create a webpack compiler which will output our bundle.js based on the application's code
     */
    const compiler = webpack(config);

    /**
     * Use webpack-dev-middleware, which facilitates creating a bundle.js in memory and updating it automatically
     * based on changed files
     */
    app.use(require('webpack-dev-middleware')(compiler,{
        /**
         * @noInfo Only display warnings and errors to the concsole
         */
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

    /**
     * Hot middleware allows the page to reload automatically while we are working on it.
     * Can be used instead of react-hot-middleware if Redux is being used to manage app state
     */
    app.use(require('webpack-hot-middleware')(compiler));
} else {
    /**
     * If the process is production, just serve the file from the dist folder
     * Build should have been run beforehand
     */
    app.use(express.static(path.resolve(__dirname, '../dist')));
}

/**
 * Returns a response object with an [items] property containing a list of the 30 or so newest questions
 */
function * getQuestions (){
    let data;
    if (useLiveData) {
        /**
         * If live data is used, contact the external API
         */
        data = yield get(questions,{gzip:true});
    } else {
        /**
         * If live data is not used, read the mock questions file
         */
        data = yield fs.readFile('./data/mock-questions.json',"utf-8");
    }

    /**
     * Parse the data and return it
     */
    return JSON.parse(data);
}

function * getQuestion (question_id) {
    let data;
    if (useLiveData) {
        /**
         * If live data is used, contact the external API
         */
        data = yield get(question(question_id),{gzip:true,json:true});
    } else {
        /**
         * If live data is not used, get the list of mock questions and return the one that
         * matched the provided ID
         */
        const questions = yield getQuestions();
        const question = questions.items.find(_question=>_question.question_id == question_id);
        /**
         * Create a mock body for the question
         */
        question.body = `Mock question body: ${question_id}`;
        data = {items:[question]};
    }
    return data;
}

/**
 * Creates an api route localhost:3000/api/questions, which returns a list of questions
 * using the getQuestions utility
 */
app.get('/api/questions',function *(req,res){
    const data = yield getQuestions();
    /**
     * Insert a small delay here so that the async/hot-reloading aspects of the application are
     * more obvious. You are strongly encouraged to remove the delay for production.
     */
    yield delay(150);
    res.json(data);
});

/**
 * Special route for returning detailed information on a single question
 */
app.get('/api/questions/:id',function *(req,res){
    const data = yield getQuestion(req.params.id);
    /**
     * Remove this delay for production.
     */
    yield delay(150);
    res.json(data);
});

/**
 * Create a route that triggers only when one of the two view URLS are accessed
 */
app.get(['/','/questions/:id'], function *(req,res){
    /**
     * Read the raw index HTML file
     */
    let index = yield fs.readFile('./public/index.html',"utf-8");

    /**
     * Create a memoryHistory, which can be
     * used to pre-configure our Redux state and routes
     */
    const history = createHistory({
        /**
         * By setting initialEntries to the current path, the application will correctly render into the
         * right view when server rendering
         */
        initialEntries: [req.path],
    });

    /**
     * Create a default initial state which will be populated based on the route
     */
    const initialState = {
        questions:[]
    };

    /**
     * Check to see if the route accessed is the "question detail" route
     */
    if (req.params.id) {
        /**
         * If there is req.params.id, this must be the question detail route.
         * You are encouraged to create more robust conditions if you add more routes
         */
        const question_id = req.params.id;
        /**
         * Get the question that corresponds to the request, and preload the initial state with it
         */
        const response = yield getQuestion(question_id);
        const questionDetails = response.items[0];
        initialState.questions = [{...questionDetails,question_id}];
    } else {
        /**
         * Otherwise, we are on the "new questions view", so preload the state with all the new questions (not including their bodies or answers)
         */
        const questions = yield getQuestions();
        initialState.questions = [...questions.items]
    }

    /**
     * Create a redux store that will be used only for server-rendering our application (the client will use a different store)
     */
    const store = getStore(history,initialState);

    /**
     * If server render is used, replace the specified block in index with the application's rendered HTML
     */
    if (useServerRender) {
        const appRendered = renderToString(
            /**
             * Surround the application in a provider with a store populated with our initialState and memoryHistory
             */
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <App />
                </ConnectedRouter>
            </Provider>
        );
        index = index.replace(`<%= preloadedApplication %>`,appRendered)
    } else {
        /**
         * If server render is not used, just output a loading message, and the application will appear
         * when React boostraps on the client side.
         */
        index = index.replace(`<%= preloadedApplication %>`,`Please wait while we load the application.`);
    }
    res.send(index);
});

/**
 * Listen on the specified port for requests to serve the application
 */
app.listen(port, '0.0.0.0', ()=>console.info(`Listening at http://localhost:${port}`));