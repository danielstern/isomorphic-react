# Isomorphic React
## A Starter Isomorphic React Application with All Best Practices and No Frills
![image](https://user-images.githubusercontent.com/4268152/31387801-c091f5c8-ad99-11e7-9cb6-42fcde98fc88.png)
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
`npm install && npm run postinstall`
3) Run the dev server
`npm run start-dev`
4) Navigate to the application's url
`http://localhost:3000/`

### Usage
#### Enabling / Disabling Server Rendering
Server rendering is great, but sometimes we want to disable it when there's an error in our render and we'd rather troubleshoot it in the client.
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

### Troubleshooting
#### `unexpected token import`
This error appears when babel is not configured correctly. This can actually be caused by outdated global dependencies, and is hard to fix. For best results, try the following -
- Install `babel-register` as a local saved dependency
- Update global versions of `babel`, `webpack` and all dependencies to latest / course versions

#### Any Error That is Taking a Long Time to Troubleshoot
Things can always go wrong in the world of programming. If this happens, clone the master branch of this repo to a new directory and run the installation instructions. If desired, you can work backwards, pruning extra files until you get the application in the state you want.

#### Problems with the Repo
I want this repo to work perfectly for as many users as possible. Got a problem? <a href=https://github.com/danielstern/isomorphic-react/issues/new>Open an issue!</a> Let's figure out a solution together.

