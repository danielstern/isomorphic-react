console.log("The app is running!!.....");;
import App from './App'
import ReactDOM from 'react-dom'
import React from 'react';

console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === 'development' && module.hot) {
    // console.log("Loading module");
    module.hot.accept();
    // module.hot.accept("./App",()=>{
    //     console.log("Replacing module.. ");
    // });
    // module.hot.accept("./App",()=>{
    //     console.log("Module loading time...");
    // });
}
const container = document.getElementById("AppContainer");
console.log("container?",container);
ReactDOM.render(<App />,container);