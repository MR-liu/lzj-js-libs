const path = require('path');
const webpack = require('webpack');

// 清楚dist文件
const CleanWebpaclPlugin = require('clean-webpack-plugin');
// 终端输出进度条
const WebpackBar = require('webpackbar');

// 显示编译时间
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const resolvePath = (dirname) => {
  return path.resolve(__dirname, '../../', dirname);
};
module.exports = (env) => {
  const isDev = env === 'dev';
  const baseConfig = {
    mode: 'production',
    entry: {
      index: resolvePath('src/index.ts'),
    },
    output: {
      path: resolvePath('dist'),
      filename: `[name].js`,
      chunkFilename: `[name].js`,
      publicPath: '/',
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    performance: {
      hints: false,
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: ['ts-loader?transpileOnly=true'],
          // use: ['babel-loader?cacheDirectory=true', 'ts-loader?transpileOnly=true'],
        },
      ],
    },
    plugins: [
      // 显示打包时间
      new ProgressBarPlugin({
        format: `build [:bar] ${chalk.green.bold(':percent')} (:elapsed seconds)`,
      }),
      // 开启线程check ts
      new ForkTsCheckerWebpackPlugin({
        checkSyntacticErrors: true,
        tsconfig: resolvePath('tsconfig.json'),
        // tslint: resolvePath('tslint.json'),
        watch: [resolvePath('src/**/*.tsx')],
      }),

      // 进度条
      new WebpackBar(),
      new webpack.HashedModuleIdsPlugin(),
      new webpack.NamedChunksPlugin(
        chunk => chunk.name || Array.from(chunk.modulesIterable, m => m.id).join('_')
      )
    ],
  };
  if (!isDev) {
    baseConfig.plugins.push(
      new CleanWebpaclPlugin(resolvePath('dist'), {
        root: resolvePath('/'),
        verbose: true,
      })
    );
  }
  return baseConfig;
};
