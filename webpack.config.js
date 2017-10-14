const path = require('path');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const plugins = [];

if (process.env.DEPLOY) {
    plugins.push(new MinifyPlugin(
        {},
        {
            comments: false
        }));
}

module.exports = {
    entry: {
        'Hypermedia': path.resolve(__dirname, 'src/libs/Hypermedia.js'),
        'Utils': path.resolve(__dirname, 'src/libs/Utils.js'),
        'Templates': path.resolve(__dirname, 'src/libs/templates/index.js'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".js"],
        mainFields: ['jsnext:main', 'browser', 'main']
    },
    output: {
        path: path.resolve(__dirname, `dist/libs`),
        filename: '[name].js',
        libraryTarget: 'umd',
        library: "[name]"
    },
    plugins: plugins,
    devtool: 'source-map'
};
