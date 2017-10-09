# Isomorphic React
## A Starter Isomorphic React Application with All Best Practices and No Frills
### About The Application
This application is a basic API client which gathers data from an outside API (in this case, Stackoverflow) and generates an isomorphic, single-page application (SPA).

### Why Isomorphic React?
Great question!
- Uses React / Redux as main application engine
- Supports hot reloading and server rendering!
- Uses React Router (in a combination with server rendering that is truly amazing)
- No fluff, just the good stuff

### Getting Started
1) Clone the repository
2) install dependencies
`npm install -g babel-cli && npm install`
3) Run the dev server
`npm run start-dev`
4) Navigate to the application's url
`http://localhost:3000/`

### Usage
#### Enabling / Disabling Server Rendering
Server rendering is great, but sometimes we want to disable it when there's an error in our render and we'd rather troubleshoot it in the server.
This setting is passed in as a CLI argument via the `--useServerRender=true` argument.
You can modify this in `package.json` to `--useServerRender=false` which will disable any server-side rendering functionality.

#### Enabling / Disabling Live Data
This application is designed to grab the latest data from `Stackoverflow.com`. However, their API has a strict request limit which means that no questions will be returned after X requests (usually 300).
Therefore, the application comes loaded with mock-questions in the data directory.
To ease the learning process by eliminating potential sources of error, live data is disabled by default.
However, you are strongly encouraged to use live data once you understand the associated pitfalls.
* Note: You can increase your allotted requests to a much larger number by registering an application here,
`https://stackapps.com/apps/oauth/register` and then appending the key to the URLs in `data/api-real-url.js`

### Production Build
This application fully supports a production build setting, which disables live reloading in favor of precompiled and uglified JS, which boosts performance.
To run production, run the command `npm run start-prod`, which automatically triggers the `build` script.
This mode is recommended for production. However, this boilerplate has never been used in actual production so utilize caution if deploying as a real application.

