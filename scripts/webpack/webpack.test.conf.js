const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf.js');
const HtmlWebPackPlugin = require('html-webpack-plugin');

// const state = require('./stats');

const resolve = (dirname) => {
  return path.resolve(__dirname, '../../', dirname);
};
module.exports = merge(baseWebpackConfig('test'), {
  plugins: [
    new HtmlWebPackPlugin({
      filename: 'index.html',
      template: resolve('index.html'),
      inject: true,
    }),
    // 定制全局变量
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
        PROJECT_ENV: '"test"',
      },
    }),
  ],
});
