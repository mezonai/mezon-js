const path = require('path');

module.exports = {
    entry: './index.ts',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
        }, {
            test: /\.m?js/,
            resolve: {
                fullySpecified: false
            }
        }]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.mjs']
    },
    mode: 'development'
};