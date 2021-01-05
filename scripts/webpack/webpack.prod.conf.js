const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf.js');
const utilsData = require('../../utils.json')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const resolve = (dirname) => {
	return path.resolve(__dirname, '../../', dirname);
};
const entry = {}
Object.keys(utilsData).forEach(key => {
  entry[key] = path.resolve(__dirname, '../../', utilsData[key]);
})
entry['index'] = path.resolve(__dirname, '../../', 'src/index.ts');
module.exports = merge(baseWebpackConfig('test'), {
  entry: entry,
	output: {
		library: 'lib',
		libraryTarget: "",
		umdNamedDefine: true,

	},
	plugins: [
		new MinifyPlugin(),
		// 定制全局变量
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"',
				PROJECT_ENV: '"prd"',
			},
		}),
	],
});
