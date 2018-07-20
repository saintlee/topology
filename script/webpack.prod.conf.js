/** node模块引用 **/
const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

// webpack需要的相关配置
const config = require('./webpack.config.conf');
const webpackBaseConfig = require('./webpack.base.conf');

const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

module.exports = webpackMerge(webpackBaseConfig, {
  plugins: [
    new UglifyjsWebpackPlugin({
      sourceMap: true,
      compress: {
        warnings: false, // 去除warning警告
        dead_code: true, // 去除无用代码
        pure_funcs: ['console.log'], // 配置发布时，不被打包的函数
        drop_debugger: true, // 发布时去除debugger
        drop_console: false // 发布时去除console
      }
    }),
  ]
});
