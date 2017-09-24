const path = require('path');
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
    entry: {
        'Hypermedia': path.resolve(__dirname, 'src/libs/Hypermedia.js'),
        'Utils': path.resolve(__dirname, 'src/libs/Utils.js')
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
    plugins: [
        /*new MinifyPlugin(
            {},
            {
                comments: false
            })*/
    ],
    devtool: 'source-map'
};
