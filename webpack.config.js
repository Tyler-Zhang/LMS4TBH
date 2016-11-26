const webpack = require('webpack');
const path = require('path');
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
  context: path.join(__dirname, "public"),
  entry: {
    app:'./js/app.js'
  },
  output: {
    path: __dirname + 'public',
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets:['react', 'es2015'],
        plugins: ['react-html-attrs', 'transform-class-properties']
      }
    }]
  }, plugins: (debug)? null : plugins
};