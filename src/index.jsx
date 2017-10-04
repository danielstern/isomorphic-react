console.log("The app is running!!.....");;
import App from './App'
import ReactDOM from 'react-dom'
import React from 'react';

if(process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept();
}

ReactDOM.render(<App />,document.getElementById("AppContainer"));