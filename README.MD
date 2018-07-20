拓扑图开发文档
===

## 一、目录结构

```php
  -- dist/                          `编译目录，可在config.yml配置`
  -- script/                        `webpack脚本目录，自定义`
    |-- webpack.base.conf.js        `webpack通用配置，主要负责通用entry、module、plugins`
    |-- webpack.config.conf.js      `自定义webpack config配置，主要用于读取config.yml文件，动态配置路径、入口等`
    |-- webpack.dev.conf.js         `开发模式，主要提供开发模式编译打包和开发Server服务`
    |-- webpack.dll.conf.js         `打包优化，提取常用库加快打包效率`
    |-- webpack.prod.conf.js        `生产模式，主要提供生成模式编译打包`
  -- src/                           `源码目录，单页面模式`
    |-- components/                 `js组件存放目录`
    |-- css/                        `css文件存放目录`
    |-- font/                       `字体文件存放目录`
    |-- img/                        `图片文件存放目录`
    |-- sass/                       `sass文件存放目录`
    |-- index.html                  `入口页面`
    |-- index.js                    `入口脚本，名字与入口页面相同，且不用引入到index.html文件中`
  -- .babelrc                       `Babel配置文件`
  -- .editorconfig                  `文件编辑配置，主要配置编码、缩进、换行符等等`
  -- .eslintignore                  `eslint代码检查忽略目录`
  -- .eslintrc.yml                  `eslint检查JavaScript代码，约定规范`
  -- .gitignore                     `git提交忽略文件`
  -- config.yml                     `自定义config配置文件，主要用于配置webpack信息`
  -- package.json                   `nodejs本地安装的npm包，定义依赖的nodejs模块`
  -- README.MD                      `帮助手册`
```

## 二、启动方式

  > 首先确保安装本地已经安装nodejs。[Node.js 中文网](http://nodejs.cn/)

  - 进入根目录打开控制台运行以下命令：

  ```
    1. npm install
    2. npm run start
    3. 浏览器会自动打开http://localhost:8080，若没有打开请手动输入即可
  ```

  > 如果安装速度过慢，可以先执行命令`npm run cnpm`切换成淘宝源，再执行`npm install`：


  - 编译打包开发模式

  ```
    1. npm install(如果已安装请忽略)
    2. npm run dev:dll
    3. npm run dev
  ```

  - 编译打包生成模式

  ```
    1. npm install(如果已安装请忽略)
    2. npm run prod
  ```

## 三、源码分析

  > 拓扑图使用ES6标准开发，开发前请先了解ES6的新特性。[ECMAScript 6 入门](http://es6.ruanyifeng.com/)
  > 拓扑图主要使用d3.js进行绘制，需要对d3.js进行学习。[d3官网](https://d3js.org/)
  

### 1. 注意事项

打包时一般需要将第三方依赖独立出来，这时需要在`config.yml`添加外部插件，当然这不是必须的。
添加时key为引入包的名称，value为数组，为别名。

```yaml
external:
  jquery:
    - '&'
    - 'jQuery'
    - 'window.$'
    - 'window.jQuery'
  d3:
    - 'd3'
  d3-tip:
    - 'd3-tip'
  d3-svg-legend:
    - 'd3-svg-legend'
```

> 这种打包会将jquery、d3、d3-tip和d3-svg-legend打包到`assets/vendors.js`文件中。
