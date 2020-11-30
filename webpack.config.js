const webpack = require('webpack');
const path = require('path')
const pkg = require('./package.json');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = function(options) {
    if (!options) options = {};

    return {
        mode: "production",
        entry: {
            "magx": path.join(__dirname, "src/index.ts"),
            "magx.dev": path.join(__dirname, "src/index.ts"),
        },
        output: {
            path: path.join(__dirname, "./dist/"),
            filename: "[name].js",

            globalObject: "self || this", // compatibility with Web Workers.
        },

        // devtool: 'inline-source-map',

        module: {
            rules: [
                { test: /\.ts$/, loader: "ts-loader" },
            ],
        },

        plugins: [
            new webpack.BannerPlugin({ banner: `magx.js@${pkg.version}` }),
            // new webpack.optimize.UglifyJsPlugin({ include: /\.min\.js$/, minimize: true})
        ],

        // hack: react-native is not used for the distribution build
        externals: {
        },

        optimization: {
            minimize: true,
            minimizer: [new UglifyJsPlugin({
                exclude: /\.dev\.js$/
            })]
        },

        resolve: {
            extensions: ['.ts', '.js', '.json']
        }

    }
};