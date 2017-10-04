import path from 'path';
import express from 'express';
import webpack from 'webpack';
import yields from 'express-yields';
import fs from 'fs-extra';

const app = express();

if(process.env.NODE_ENV === 'development') {
    const config = require('../webpack.config.babel.dev').default;
    const compiler = webpack(config);
    app.use(require('webpack-dev-middleware')(compiler,{
        noInfo: true,
        // publicPath: "/public/bundle.js",
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
    app.use(express.static(path.resolve(__dirname, 'src')));
}

app.get('*', function *(req,res){
    const file = yield fs.readFile('./public/index.html',"utf-8");
    console.log("Server is serving...",process.env.NODE_ENV);
    res.send(file);
    // if(process.env.NODE_ENV === 'development') {
    //     res.send(`
		// 	<!doctype html>
		// 	<html>
		// 		<head>
		// 			<title>My Universal App</title>
		// 		</head>
		// 		<body>
		// 			<div id='app'></div>
		// 			<script src='bundle.js'></script>
		// 		</body>
		// 	</html>
		// `);
    // }
});


app.listen(3000, '0.0.0.0', (err) => {
    if(err) {
        console.error(err);
    } else {
        console.info('Listening at http://localhost:3000');
    }
});