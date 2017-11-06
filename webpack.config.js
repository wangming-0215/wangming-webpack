const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'output.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/, // files ending with .js
        exclude: /node_modules/, // exclude the node_modules directory
        loader: 'babel-loader' // use this (babel-loader) loader
      },
      {
        test: /\.scss$/,
        // loader: ['style-loader', 'css-loader', 'sass-loader']
        use: ExtractTextPlugin.extract({
          // call our plugin with extract method
          use: ['css-loader', 'sass-loader'], // use these loaders
          fallback: 'style-loader' // fallback for any css not extracted
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css') // call the ExtractTextPlugin constructor and name our css file
  ]
};

module.exports = config;
