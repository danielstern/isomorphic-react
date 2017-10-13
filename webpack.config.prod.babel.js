const path = require('path');
const webpack = require('webpack');

/**
 * Production Webpack Config bundles JS, then uglifies it and exports it to the "dist" directory
 * See Development webpack config for detailed comments
 */
module.exports = {
    entry: [
        'babel-regenerator-runtime',
        path.resolve(__dirname, 'src')
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
                WEBPACK: true
            }
        }),
        /**
         * Uglifies JS which improves performance
         * React will throw console warnings if this is not implemented
         */
        new webpack.optimize.UglifyJsPlugin()
    ],
    resolve: {
        extensions: ['.js', '.json', '.jsx'],
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader'
                },
                include: path.resolve(__dirname, 'src')
            }
        ]
    }
};