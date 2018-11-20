// 基于node commonjs 规范
// web server
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
  mode: 'development',
  /*
  * 单页引入多个js
  * entry: ['./src/index.js', './src/a.js']
  *
  * 多入口: 多出口
  *
  * */
  entry: {
    index: './src/index.js',
    a: './src/index.js'
  },
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve('./build')
  },
  devServer: {
    contentBase: './build',
    port: '8080',
    compress: true,
    open: true
  },
  module: {},
  plugins: [
    new CleanWebpackPlugin(['./build']),
    new HtmlWebpackPlugin({
      filename: 'a.html',
      template: './index.html',
      title: 'Arch',
      hash: true,
      chunks: ['a']
      // minify: {
      //   removeAttributeQuote: true,
      //   collapseWhitespace: true
      // }
    }),
    new HtmlWebpackPlugin({
      filename: 'b.html',
      template: './index.html',
      title: 'Arch',
      hash: true,
      chunks: ['index']
    })
  ],
  resolve: {}
};
