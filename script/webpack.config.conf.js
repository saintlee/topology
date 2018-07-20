const path = require('path');
const glob = require('glob');
const yamljs = require('yamljs');

/* 根目录 */
const rootDirPath = path.resolve(__dirname, '../');
const scriptDirPath = path.resolve(__dirname, './');

/* 配置文件 */
let _config_ = {}, _path_ = {}, _external_ = {}, _entry_ = {}, _server_ = {}, _plugin_ = {};
try {
  configPath = glob.sync(rootDirPath + '/config.{yml,yaml}');
  _config_ = yamljs.load(configPath[0]);
  _path_ = _config_.path || {};
  _external_ = _config_.external || {};
  _entry_ = _config_.entry || {};
  _server_ = _config_.server || {};
  _plugin_ = _config_.plugin || {};
} catch (error) { }

/* 路径 */
let srcDirPath = path.resolve(rootDirPath, _path_.src || 'src');
let buildDirPath = path.resolve(rootDirPath, _path_.build || 'dist');
module.exports = {
  /* 绝对路径 */
  absolutePath: {
    root: rootDirPath,
    script: scriptDirPath,
    src: srcDirPath,
    build: buildDirPath
  },
  /* 相对脚本路径 */
  relativePath: {
    src: path.relative(scriptDirPath, srcDirPath),
    build: path.relative(scriptDirPath, buildDirPath)
  },
  entry: getEntry(_entry_),
  external: getExternal(_external_),
  providePlugin: getProvidePlugin(_external_),
  server: getServer(_server_),
  plugin: _plugin_,
  env: {
    prod: 'production',
    dev: 'development',
  }
}

function getEntry(_entry) {
  let _js = '/index.js', _html = '/index.html';
  if (Object.is(_entry.model, 'mpa')) {
    _js = '/**/**.js';
    _html = '/**/**.html';
  }
  _js = _entry.js || _js;
  _html = _entry.html || _html;
  return { js: _js, html: _html };
}

/* 获取外部插件 */
function getExternal(_external) {

  let external = {};
  if (JSON.stringify(_external) !== "{}") {
    // Object.keys(_external).forEach(key => { external[key] = key });
    external['vendors'] = Object.keys(_external);
  }
  return external;
}

function getProvidePlugin(_external) {
  let providePlugin = {};
  Object.keys(_external).forEach(key => {
    let value = _external[key] || key;
    if (Array.isArray(value)) {
      value.forEach(v => { providePlugin[v] = key })
    } else {
      providePlugin[value] = key;
    }
  });
  return providePlugin;
}

function getServer(_server_) {
  _server_.host = _server_.host || 'localhost';
  _server_.port = _server_.port || '9090';
  return _server_;
}
