const path = require('path');
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
    entry: path.resolve(__dirname, 'src/libs/index.js'),
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
        filename: 'index.js',
        libraryTarget: 'umd',
        library: "AugeasConsole"
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
