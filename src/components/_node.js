import _tip from './_tip';
import { radiusArea } from './_setting_area';
import { legendSys, radiusSys } from './_setting_sys';

/**
 * 节点
 * @param {*} data 数据
 * @param {*} vis svg视图
 */
export default function (data, vis, type) {

  // 创建node集合
  let node = vis.selectAll('g.node')
    .data(data.nodes);
  node.exit().remove();

  node = node.enter()
    .append('svg:g')
    .classed('node', true)
    .attr('id', d => 'node-' + d.id)
    .merge(node);

  // 移除其他干扰元素
  node.selectAll('.node-bg').remove();
  let realNode;
  if (type) {
    realNode = node.append('use')
      .attr('class', 'node-bg')
      .attr('xlink:href', '#node-' + legendSys[0].id)
      .attr('x', 0 - radiusSys)
      .attr('y', 0 - radiusSys)
      .attr('width', radiusSys * 2)
      .attr('height', radiusSys * 2);

    // 节点文字
    node.append('svg:text')
      .attr('class', 'node-name')
      .attr('dy', radiusSys+10)
      .attr('text-anchor', 'middle')
      .attr('font-size', '14px')
      .attr('fill', '#000')
      .style('cursor', 'default')
      .text(d => d.name);
  } else {
    realNode = node.append('use')
      .attr('class', 'node-bg')
      .attr('xlink:href', d => '#node-' + d.status)
      .attr('x', 0 - radiusArea)
      .attr('y', 0 - radiusArea)
      .attr('width', radiusArea * 2)
      .attr('height', radiusArea * 2);
  }


  // 鼠标滑过事件，显示tip
  let tip = _tip(vis);
  realNode.on('mouseover', tip.show)
    .on('mouseout', tip.hide);

  return node;
}
