import path from 'path';
import express from 'express';
import webpack from 'webpack';
import yields from 'express-yields';
import fs from 'fs-extra';

const app = express();
const port = process.env.PORT || 7777;

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
    app.use(express.static(path.resolve(__dirname, 'src')));
}

app.get('*', function *(req,res){
    const file = yield fs.readFile('./public/index.html',"utf-8");
    res.send(file);
});


app.listen(port, '0.0.0.0', (err) => {
    if(err) {
        console.error(err);
    } else {
        console.info('Listening at http://localhost:3000');
    }
});