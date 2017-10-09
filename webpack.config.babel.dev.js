import webpack from 'webpack';
import path from 'path';

/**
 * Development webpack config designed to be loaded by express development server
 */
export default {
    /**
     * The scripts in entry are combined in order to create our bundle
     */
    entry: [
        /**
         * Webpack hot middleware enables hot reloading.
         * reload?true causes the page to reload when no hot reload handler is specified
         */
        'webpack-hot-middleware/client?reload=true',
        /**
         * babel-regenerator-runtime lets us use generators and yield
         */
        'babel-regenerator-runtime',
        /**
         * The entry point of the main application
         */
        path.resolve(__dirname, 'src/')
    ],
    /**
     * Output contains detailed information about the bundle.js
     * In this case, bundle.js is never created but server by webpack-dev-middleware in ./server
     */
    output: {
        path: path.resolve(__dirname, 'public'),
        /**
         * Public path is necessary for webpack HMR to reload correctly when on a path other than '/'
         */
        publicPath: '/',
        filename: 'bundle.js',
    },
    plugins: [
        /**
         * Needed for Hot module reloading
         */
        new webpack.HotModuleReplacementPlugin(),
        /**
         * Causes the relative path of the module to be used in HMR
         * Recommended by docs for development configurations: https://webpack.js.org/plugins/named-modules-plugin/
         */
        new webpack.NamedModulesPlugin(),
        /**
         * Defines the env as 'development', which triggers different behaviors in some scripts
         * To see more, search project for 'development'
         */
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
                WEBPACK: true
            }
        })
    ],
    /**
     * Resolve allows files to be imported without specifying an extension as long as they match one specified, i.e.
     * import component from './component'
     */
    resolve: {
        extensions: ['.js', '.json', '.jsx'],
    },
    module: {
        loaders: [
            {
                /**
                 * Babel loader is used for any JS or JSX files in the src directory
                 */
                test: /\.jsx?/,
                use: {
                    loader: 'babel-loader'
                },
                include: path.resolve(__dirname, 'src'),
            },
        ]
    }
}