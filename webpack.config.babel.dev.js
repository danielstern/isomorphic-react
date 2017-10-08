import webpack from 'webpack';
import path from 'path';

export default {
    entry: [
        'webpack-hot-middleware/client',
        'babel-regenerator-runtime',
        path.resolve(__dirname, 'src/')
    ],
    output: {
        path: path.resolve(__dirname, 'public'),
        /**
         * Public path is necessary for webpack HMR to reload correctly when on a path other than '/'
         */
        publicPath: '/',
        filename: 'bundle.js',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
                WEBPACK: true
            }
        })
    ],
    resolve: {
        extensions: ['.js', '.json', '.jsx'],
    },
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                use: {
                    loader: 'babel-loader'
                },
                include: path.resolve(__dirname, 'src'),
            },
        ]
    }
}