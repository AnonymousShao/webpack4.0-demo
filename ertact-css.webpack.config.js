// 基于node commonjs 规范
// web server
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextWebapckPlugin = require('extract-text-webpack-plugin');
const lessExtract = new ExtractTextWebapckPlugin({
  filename: 'css/less.css',
  disable: true
});
const cssExtract = new ExtractTextWebapckPlugin({
  filename: 'css/css.css',
  disable: true
});
const webpack = require('webpack');
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'build.[hash:8].js',
    path: path.resolve('./build')
  },
  devServer: {
    contentBase: './build',
    port: '8080',
    compress: true,
    open: true,
    hot: true
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: cssExtract.extract({
        fallback: 'style-loader',
        use: [ {
          loader: 'css-loader'
        }]
      })
    }, {
      test: /\.less/,
      use: lessExtract.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader'
        }, {
          loader: 'less-loader'
        }]
      })
    }]
  },
  plugins: [
    // new ExtractTextWebapckPlugin({
    //   filename: './css/index.css'
    // }),

    // lessExtract,
    // cssExtract,

    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(['./build']),
    new HtmlWebpackPlugin({
      template: './index.html',
      title: 'Arch',
      hash: true
    })
  ],
  resolve: {}
};
