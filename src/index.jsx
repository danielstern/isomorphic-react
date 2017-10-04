import App from './App'
import ReactDOM from 'react-dom'
import React from 'react';
import fetch from 'isomorphic-fetch';

if(process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept();
}

fetch('/data')
    .then(data=>data.json())
    .then(data=>{
        console.info("Rendering application");
        ReactDOM.render(<App {...data}/>,document.getElementById("AppContainer"))
    });