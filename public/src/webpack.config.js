 const webpack = require('webpack');

 const debug = process.env.NODE_ENV !== "production";

const plugins = [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console:true
            },
            output: {
                comments: false,
            },
        })
];

 module.exports = {
     entry: {
         dashboard:'./app.js'
        },
     output: {
         path: './website/public/js',
         filename: '[name].bundle.js'
     },
     watch:true,
     module: {
         loaders: [{
             test: /\.js$/,
             exclude: /node_modules/,
             loader: 'babel-loader',
             query: {
                presets:[['react'], ['es2015']]
             }
         }]
     }, plugins: (debug)? null : plugins
 };