import webpack from 'webpack';
import path from 'path';

export default {
    entry: [
        /**
         * This line may only be required when using express,
         * Or possibly not at all
         */
        'webpack-hot-middleware/client',
        path.resolve(__dirname, 'src/')
    ],
    output: {
        path: path.resolve(__dirname, 'public'),
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