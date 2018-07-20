/** node模块引用 **/
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

// webpack需要的相关配置
const config = require('./webpack.config.conf');
const webpackBaseConfig = require('./webpack.base.conf');

module.exports = webpackMerge(webpackBaseConfig, {
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: config.absolutePath.build,
    host: config.server.host,
    port: config.server.port,
    compress: true,
    quiet: false,
    noInfo: false,
    inline: true,
    open: true,
    watchOptions: {
      aggregateTimeout: 500,
      ignored: /node_modules/,
      poll: 1000
    }
  }
});
