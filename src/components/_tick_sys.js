/**
 * 模拟布局
 * @param {*} link 连线
 * @param {*} node 节点
 */
export default function tick(link, node) {

  //节点显示的位置
  node.attr('transform', d => {
    return 'translate(' + d.x + ',' + d.y + ')';
  });
  //连接线显示的位置
  link
    .attr('x1', d => d.source.x)
    .attr('y1', d => d.source.y)
    .attr('x2', d => d.target.x)
    .attr('y2', d => d.target.y);
}
