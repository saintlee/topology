import * as d3 from 'd3';

/**
 * 力导图配置
 * @param {*} region 区域
 */
export default function (region) {

  let foci = region.foci; // force中心点

  // distance距离，strength强度，iterations迭代次数
  let _force = d3.forceSimulation() // 创建一个新的力导图
    // .alphaMin(0.1)
    .force('link', d3.forceLink().id(d => d.id)
      .strength(d => d.source.region === d.target.region ? 1 : 0) // 强度[0,1]，0:强度最弱，1:强度最高，需要根据两个节点是否为同一组设置不同的强度
    ) // 连线
    .force('charge', d3.forceManyBody()) // 多力导图
    // 不设置中心center,由x,y控制
    .force('x', d3.forceX(d => foci[d.region].x)) // forceX创建一个x坐标
    .force('y', d3.forceY(d => foci[d.region].y)) // forceY创建一个y坐标
    .force('collide', d3.forceCollide(20).strength(0.3).iterations(5)); // 碰撞

  return _force;
}
