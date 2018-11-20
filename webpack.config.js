// 基于node commonjs 规范
// web server
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurifycssWebapck = require('purifycss-webpack');
const glob = require('glob');
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
      use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader'
      }, {
        loader: 'postcss-loader',
        options: {
          plugins() {
            return [autoprefixer];
          }
        }
      }]
   }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].min.css'
    }),
    new CopyWebpackPlugin([{
      from: './src/doc',
      to: 'public'
    }]),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(['./build']),
    new HtmlWebpackPlugin({
      template: './index.html',
      title: 'Arch',
      hash: true
    }),
    new PurifycssWebapck({
      path: glob.sync(path.resolve('src/*.html'))
    })
  ],
  resolve: {}
};
