const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'adaptabi-utils.js',
        libraryTarget: 'umd',
        library: 'adaptabiUtils',
    },
    mode: "production",
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
        }],
    },
    externals: [
        /^moment/i,
    ],
};