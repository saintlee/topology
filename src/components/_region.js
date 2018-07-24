import * as d3 from 'd3';
import { width, height } from './_layout_area';
import { area } from './_setting_area';

/**
 * 区域绘制以及边界计算
 * @param {*} vis d3 svg视图
 */
export default function (vis) {
  // 层次结构
  let root = d3.hierarchy(area)
    .sum(d => d.area) // area面积大小
    .sort((a, b) => b.sort - a.sort); // 排序

  let treemap = d3.treemap()
    // 设置tile为d3.treemapSliceDice
    .tile(d3.treemapSliceDice)
    // 指定布局范围,treemapSliceDice为反向，因此布局范围宽高对调
    .size([height - 10, width - 10])
    // 关闭边界补偿
    .round(false)
    // 指定间距
    .paddingInner(25);

  // 分层计算
  treemap(root);


  // 绘制区域元素
  let areaSvg = vis.append('svg:g')
    .classed('region',true)
    .selectAll('.area')
    .data(root.leaves()) // 叶子节点
    .enter().append('g')
    .classed('area', true)
    .attr('id', d => d.data.id)
    .attr('transform', d => 'translate(' + d.y0 + ',' + d.x0 + ')');

  // 区域边框
  areaSvg.append('rect')
    .attr('width', d => d.y1 - d.y0)
    .attr('height', d => d.x1 - d.x0)
    .attr('fill', '#fff')
    .attr('fill-opacity', 0)
    .attr('stroke', '#000')
    .attr('stroke-width', 0.5)
    .attr('stroke-linecap', 'butt')
    .attr('stroke-dasharray', '8,8');

  // 区域标题
  areaSvg.append('text')
    .attr('x', 6)
    .attr('y', 20)
    .attr('text-anchor', 'start')
    .attr('fill', '#1E90FF')
    .classed('text', true)
    .text(d => d.data.name);

  let foci = {}, // force中心点
    bounds = {}; // 区域边界
  root.leaves().forEach(d => {
    // x、y相反赋值
    foci[d.data.id] = { 'x': d.y0 + (d.y1 - d.y0) / 2, 'y': d.x0 + (d.x1 - d.x0) / 2 };
    bounds[d.data.id] = { 'x0': d.y0, 'y0': d.x0, 'x1': d.y1, 'y1': d.x1 };
  });

  return {
    'root': root,
    'foci': foci,
    'bounds': bounds
  };
}
