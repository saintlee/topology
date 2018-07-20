import * as d3 from 'd3';
import { widthSys, heightSys } from './_layout_sys';
import { linkSys } from './_setting_sys';

/**
 * 力导图配置
 */
export default function () {

  let _force = d3.forceSimulation() // 创建一个新的力导图
    .force('link', d3.forceLink().id(d => d.id).distance(linkSys).strength(0.4).iterations(5)) // 连线，distance距离，strength强度，iterations迭代次数
    .force('center', d3.forceCenter(widthSys / 2, heightSys / 2)) // 不能设置中心
    .force('charge', d3.forceManyBody().strength(-400)) // 多力导图
    .force('x', d3.forceX()) // forceX创建一个x坐标
    .force('y', d3.forceY()) // forceY创建一个y坐标
    .force('collide', d3.forceCollide(100).strength(0.1).iterations(1)); // 碰撞

  return _force;
}
