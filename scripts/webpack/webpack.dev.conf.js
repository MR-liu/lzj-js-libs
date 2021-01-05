const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf.js');
const HtmlWebPackPlugin = require('html-webpack-plugin');
module.exports = merge(baseWebpackConfig('dev'), {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    host: '0.0.0.0',         // 指定使用一个host，可用ip地址访问，没有的话如果别人访问会被禁止。默认localhost。
    hot: true,               // 启用模块热替换特性
    inline: true,            // 启用内联模式，一段处理实时重载的脚本被插入到bundle中，并且构建消息会出现在浏览器控制台
  },
  plugins: [
    // 定制全局变量
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
        PROJECT_ENV: '"dev"',
      },
    }),
    new HtmlWebPackPlugin({
      filename: 'index.html',
      template: resolvePath('index.html'),
      inject: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
});
