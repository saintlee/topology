import { } from './sass/index.scss';

import _main from './components/_main';

// 暴露全局变量network，浏览器暴露全局变量需要用window
module.exports.network = exports.network = window.network = _main;

_main.initArea({
  'nodes': [
    {
      'id': '192.168.111.1', 'status': 0, 'region': 'net', 'desc': [
        { 'key': null, 'value': '发现非法外链' },
        { 'key': '归属部门', 'value': '网络部' },
      ]
    },
    { 'id': '192.168.111.2', 'status': 1, 'region': 'dmz' },
    { 'id': '192.168.111.3', 'status': 2, 'region': 'core' },
    { 'id': '192.168.111.4', 'status': 3, 'region': 'oa' },
    { 'id': '192.168.111.5', 'status': 3, 'region': 'oa' },
  ],
  'links': [
    {
      'source': '192.168.111.1', 'target': '192.168.111.2', 'isTwoWay': true, 'desc': [
        { 'key': '攻击事件', 'value': 'web攻击' }
      ]
    },
    { 'source': '192.168.111.1', 'target': '192.168.111.3' },
    { 'source': '192.168.111.3', 'target': '192.168.111.4' },
    { 'source': '192.168.111.4', 'target': '192.168.111.5' },
  ]
});

// _main.initSys({
//   'nodes': [
//     {
//       'id': '192.168.111.1', 'name': '业务系统1', 'desc': [
//         { 'key': null, 'value': '发现非法外链' },
//         { 'key': '归属部门', 'value': '网络部' },
//       ]
//     },
//     { 'id': '192.168.111.2', 'name': '业务系统2' },
//     { 'id': '192.168.111.3', 'name': '业务系统3' },
//     { 'id': '192.168.111.4', 'name': '业务系统4' },
//     { 'id': '192.168.111.5', 'name': '业务系统5' },
//   ],
//   'links': [
//     {
//       'source': '192.168.111.1', 'target': '192.168.111.2', 'isTwoWay': true, 'desc': [
//         { 'key': '攻击事件', 'value': 'web攻击' }
//       ]
//     },
//     { 'source': '192.168.111.1', 'target': '192.168.111.3' },
//     { 'source': '192.168.111.3', 'target': '192.168.111.4' },
//     { 'source': '192.168.111.4', 'target': '192.168.111.5' },
//   ]
// }).click(function (d, e) {
//   console.log(d);
//   console.log(e);
// });


