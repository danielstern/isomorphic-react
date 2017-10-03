import webpack from 'webpack';
import path from 'path';

export default {
    entry: [
        // 'webpack-hot-middleware/client',
        path.resolve(__dirname, 'src')
    ],
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin(),
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
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets: ['react-hmre']
                    }
                },
                include: path.resolve(__dirname, 'src'),
            },
        ]
    }
}