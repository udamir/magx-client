const webpack = require('webpack');
const path = require('path')
const pkg = require('./package.json');

module.exports = function(options) {
    if (!options) options = {};

    return {
        mode: "production",
        entry: path.join(__dirname, "src/index.ts"),

        output: {
            path: path.join(__dirname, "./dist/"),
            filename: (options.production)
                ? "magx.js"
                : "magx.dev.js",

            globalObject: "self || this", // compatibility with Web Workers.
            libraryTarget: "umd",
            library: "MagX"
        },

        // devtool: 'inline-source-map',

        module: {
            rules: [
                { test: /\.ts$/, loader: "ts-loader" },
            ],
        },

        plugins: [
            new webpack.BannerPlugin({ banner: `magx.js@${pkg.version}` }),
            // new webpack.DefinePlugin({ 'process.env.VERSION': JSON.stringify(pkg.version) }),
        ],

        // hack: react-native is not used for the distribution build
        externals: {
        },

        optimization: {
            minimize: (options.production || false) // only minimize on production
        },

        resolve: {
            extensions: ['.ts', '.js', '.json']
        }

    }
};