/** node模块引用 **/
const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
// webpack需要的相关配置
const config = require('./webpack.config.conf');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PurifycssWebpackPlugin = require('purifycss-webpack');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

let entries = getEntries(config.absolutePath.src + config.entry.js);
let entryChunks = Object.keys(entries);
let externalChunks = Object.keys(config.external);
let manifestFile = path.resolve(config.absolutePath.root, 'manifest.json');

Object.assign(entries, config.external);

module.exports = {
  entry: entries,
  output: {
    path: config.absolutePath.build,  // 指定输出文件夹
    filename: '[name].js',
    chunkFilename: 'js/[id].js?[hash]',
  },
  module: {
    rules: [
      /* css样式处理 */
      {
        test: /\.css$/,
        exclude: /node_modules|script/,
        use: ExtractTextWebpackPlugin.extract({
          use: [{
            loader: 'css-loader',
            options: {
              importLoaders: 1, //这里是为了把css里的@import先执行第一个loader
              modules: true
            }
          }, {
            loader: 'postcss-loader',
            options: {// 没有options会报错No PostCSS Config found或者配置postcss.config.js
              plugins: function () {
                return [
                  require('autoprefixer')({
                    browsers: ['last 5 versions']
                  }), //CSS浏览器兼容
                ]
              }
            }
          }],
          fallback: 'style-loader',
          publicPath: '../' /* 公共资源路径 */
        })
      },
      /* image图片处理 */
      {
        test: /\.(png|jpg|jpeg|gif)(\?.*)?$/,
        exclude: /node_modules|script/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: '[name].[md5:hash:hex:7].[ext]',
            outputPath: 'img/', /* 超出大小后的输出路径 */
          }
        }]
      },
      /* html中img标签中的图片处理 */
      {
        test: /\.(htm|html)$/i,
        exclude: /node_modules|script/,
        use: [{
          loader: 'html-withimg-loader'
        }]
      },
      /* font字体处理*/
      {
        test: /\.(woff|woff2|svg|eot|ttf|oft)(\?.*)?$/, /* 后面会带一串时间戳，需要特别匹配到 */
        exclude: /node_modules|script/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: '[name].[md5:hash:hex:7].[ext]',
            outputPath: 'font/', /* 输出路径 */
          }
        }]
      },
      /* 音频文件处理 */
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 4096,
          name: '[name].[md5:hash:hex:7].[ext]',
          outputPath: 'media/',
        },
      },
      /* less处理，因为不使用less,这里做loader介绍 */
      {
        test: /\.less$/,
        exclude: /node_modules|script/,
        use: [{  /* loader顺序不能改变 */
          loader: 'style-loader' // 创建style标签添加js文件中的样式
        }, {
          loader: 'css-loader' // 将css转换至CommonJS
        }, {
          loader: 'less-loader' // 编译less
        }]
      },
      /* sass处理 */
      {
        test: /\.scss$/,
        exclude: /node_modules|script/,
        use: ExtractTextWebpackPlugin.extract({
          use: [{
            loader: 'css-loader',
            options: {
              url: false,
              minimize: true,
              sourceMap: true
            }
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }],
          fallback: 'style-loader'
        })
      },
      /* Babel转换 */
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules|script/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    ...getHtmlWebpackPlugins(config.absolutePath.src + config.entry.html),  //es6拓展运算符,将数组变为参数序列
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new CleanWebpackPlugin([config.relativePath.build], {
      root: __dirname,
      allowExternal: true /* 允许清理文件夹外部文件 */
    }),
    new ExtractTextWebpackPlugin('css/[name].css'),
    new webpack.BannerPlugin('Copyright SaintLee <saint.lee@qq.com>'),
    new webpack.ProvidePlugin(config.providePlugin)
  ]
}
if (config.plugin.purify) {
  module.exports.plugins.push(
    new PurifycssWebpackPlugin({
      paths: glob.sync(config.absolutePath.src + config.entry.html)
    })
  );
}

if (externalChunks.length > 0) {
  module.exports.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      names: externalChunks,
      filename: 'assets/[name].js',
      minChunks: Infinity
    })
  );
}

if (entryChunks.length > 1) {
  module.exports.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common', // 注意不要.js后缀
      chunks: entryChunks,  // chunks 是需要提取的模块
      minChunks: function (module, count) { // 公共代码的判断标准
        return module.resource && !module.resource.includes('node_modules')
          && (/\.(css|scss|less)$/).test(module.resource) && count > 1;
      }
    })
  );
}

if (fsExistsSync(manifestFile)) {
  module.exports.plugins.push(
    new webpack.DllReferencePlugin({
      context: config.absolutePath.root,
      manifest: require(manifestFile),
    })
  );
}

/* 文件是否存在 */
function fsExistsSync(path) {
  try {
    fs.accessSync(path, fs.F_OK);
  } catch (e) {
    return false;
  }
  return true;
}

/* 获取入口的函数 */
function getEntries(_path) {
  let pathName = glob.sync(_path);
  let filename, entries = {};
  pathName.map(val => {
    // filename = path.basename(val, '.js');
    filename = path.relative(config.absolutePath.src, val).replace('.js', '');
    entries[filename] = val;
  });
  return entries;
}

/*
 minify: {
    removeComments: false,
    removeCommentsFromCDATA: false,
    removeCDATASectionsFromCDATA: false,
    collapseWhitespace: false,
    conservativeCollapse: false,
    removeAttributeQuotes: false,
    removeEmptyAttributes: false,
    removeScriptTypeAttributes: false,
    removeStyleLinkTypeAttributes: false,
    removeOptionalTags: false,
    removeIgnored: false,
    removeEmptyElements: false,
    minifyJS: false,
    minifyCSS: false,
    minifyURLs: false,
  }
 */
/* 配置plugins */
function getHtmlWebpackPlugins(_path) {
  let pathName = glob.sync(_path);
  let pluginOption = [], option = {}, filename = '';
  pathName.map(val => {
    filename = path.relative(config.absolutePath.src, val);
    option = {
      minify: {
        removeComments: true,
        collapseWhitespace: false
      },
      template: val,
      // filename: path.basename(val),
      filename: filename,
      inject: true,
      chunks: [
        'common',
        ...externalChunks,
        filename.replace('.html', '') /* TODO 存在多个入口时这里需要处理 */
      ]
    };
    pluginOption.push(new HtmlWebpackPlugin(option));
  })
  return pluginOption;
}
