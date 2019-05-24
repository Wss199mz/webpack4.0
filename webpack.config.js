'use strict'
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

module.exports = (env, argv) => {
 const devMode = argv.mode !== 'production'
 return {
  entry: [
   "babel-polyfill",
   path.join(__dirname, './src/index.js')
  ],
  output: {                   // 出口
   filename: "bundle.js",      // 生成打包文件的名字
   path: path.join(__dirname, "dist")  // 打包文件的路径，__dirname指当前根目录
  },
  devServer: {
   contentBase: path.join(__dirname, "dist"),
   hot: true,
   compress: true,
   host: "localhost",
   port: 8081
  },
  module: {
   rules: [
    {
     test: /\.js$/,
     exclude: /node_modules/,
     use: {
      loader: "babel-loader"
     }
    },
    {
     test: /\.css$/,
     use: [
      devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
      'css-loader',
      'postcss-loader'
     ]
    },
    {
     test: /\.less$/,
     use: ["style-loader", "css-loader", "less-loader"]
    },
    // {
    //  test: /\.less$/,
    //  use: ExtractTextPlugin.extract('style-loader', 'css-loader','less-loader'),
    // },
    {
     test: /\.html$/,
     use: [{
      loader: "html-loader",
      options: {
       minimize: true
      }
     }]
    },
    {
     test: /\.(png|jpg|gif|jpeg)/,
     use: [{
      loader: 'file-loader',
      options: {
       limit: 500   //是把小于500B的文件打成Base64的格式，写入JS
      }
     }]
    }
   ]
  },
  plugins: [
   new CleanWebpackPlugin(),
   new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './src/index.html',
    inject: true,
    // chunks: ['index'],  // 多入口时需要用到
    hash: true      // 插入的文件后面加一段随机数
   }),
   new MiniCssExtractPlugin({
    filename: "[name].css",
    chunkFilename: "[id].css"
   })
  ]
 }
}

