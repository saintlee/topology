import { radiusArea } from './_setting_area';

/**
 * 模拟布局
 * @param {*} link 连线
 * @param {*} node 节点
 * @param {*} region 区域
 */
export default function tick(link, node, region) {

  // 边界
  let bounds = region.bounds;

  //节点显示的位置
  node.attr('transform', d => {
    if (bounds[d.region]) {
      d.x = Math.max(bounds[d.region].x0 + radiusArea, Math.min(bounds[d.region].x1 - radiusArea, d.x));
      d.y = Math.max(bounds[d.region].y0 + radiusArea, Math.min(bounds[d.region].y1 - radiusArea, d.y));
    }
    return 'translate(' + d.x + ',' + d.y + ')';
  });
  //连接线显示的位置
  link
    .attr('x1', d => d.source.x)
    .attr('y1', d => d.source.y)
    .attr('x2', d => d.target.x)
    .attr('y2', d => d.target.y);
}
