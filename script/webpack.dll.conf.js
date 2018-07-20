/** node模块引用 **/
const path = require('path');
const glob = require('glob');
const webpack = require('webpack');

// webpack需要的相关配置
const config = require('./webpack.config.conf');
const webpackBaseConfig = require('./webpack.base.conf');

webpackBaseConfig.entry = config.external;
webpackBaseConfig.plugins=[
  new webpack.DllPlugin({
    context: config.absolutePath.root,
    path: 'manifest.json', // 会生成一个json文件，里面是关于dll.js的一些配置信息
    name: '[name]_[chunkhash]' // 与上面output中配置对应
  })
]

module.exports = webpackBaseConfig;



