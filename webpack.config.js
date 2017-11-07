const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // "uglify" our output js code
const OptimizeCssAssets = require('optimize-css-assets-webpack-plugin');

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
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?context=src/assets/images/&name=images/[path][name].[ext]',
          {
            // images loader
            loader: 'image-webpack-loader',
            query: {
              mozjpeg: {
                progressive: true
              },
              gifsicle: {
                interlaced: false
              },
              optipng: {
                optimizationLevel: 4
              },
              pngquant: {
                quality: '75-90',
                speed: 3
              }
            }
          }
        ],
        exclude: /node_modules/,
        include: __dirname
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css') // call the ExtractTextPlugin constructor and name our css file
    // new webpack.optimize.UglifyJsPlugin() // call the uglify plugin
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './public'), // A directory or url to serve html content from
    historyApiFallback: true, // fallback to /index.html from Single Page Application
    inline: true, // inline mode (set to false to disable including client scripts (like livereload))
    open: true // open default browser while launching
  },
  devtool: 'eval-source-map' // enable devtool for better debugging experience
};

module.exports = config;

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins.push(new UglifyJsPlugin(), new OptimizeCssAssets());
}
