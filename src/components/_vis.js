import * as d3 from 'd3';
import { width, height, legendHeight } from './_layout_area';
import { widthSys, heightSys } from './_layout_sys';
import { legendArea } from './_setting_area';
import { legendSys } from './_setting_sys';

/**
 * svg视图
 */
export default function (type) {
  // 清空.topology下所有元素
  d3.select('.network').select('*').remove();

  // svg 视图，主窗体
  let vis = d3.select('.network')
    .append('svg:svg')
    .attr('id', 'svgview')
    .style('position', 'absolute')
    .style('left', 0)
    .style('top', type ? 0 : legendHeight)
    .attr('width', type ? widthSys : width)
    .attr('height', type ? heightSys : height)
    .append('svg:g')
    .classed('all', true)
    .attr('data-width', type ? widthSys : width)
    .attr('data-height', type ? heightSys : height);

  // 箭头元素
  let arrow = vis.append('svg:defs')
    .selectAll('marker');

  arrow.data(['start-arrow']).enter().append('svg:marker')
    .attr('id', d => d)
    .attr('class', 'arrow')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', -10)
    .attr('refY', 0)
    .attr('markerWidth', 10)
    .attr('markerHeight', 15)
    .attr('markerUnits', 'userSpaceOnUse')
    .attr('orient', 'auto')
    .append('svg:path')
    .attr('d', 'M0,0L10,5L10,-5')
    .attr('fill', '#8d98b3');

  arrow.data(['end-arrow']).enter().append('svg:marker')
    .attr('id', d => d)
    .attr('class', 'arrow')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 20)
    .attr('refY', 0)
    .attr('markerWidth', 10)
    .attr('markerHeight', 15)
    .attr('markerUnits', 'userSpaceOnUse')
    .attr('orient', 'auto')
    .append('svg:path')
    .attr('d', 'M0,-5L10,0L0,5')
    .attr('fill', '#8d98b3');

  // 节点样式
  let radialGradient = vis.append('svg:defs')
    .selectAll('radialGradient')
    .data(type ? legendSys : legendArea)
    .enter()
    .append('svg:radialGradient')
    .attr('id', d => 'radial-' + d.id);

  // radialGradient.append('stop')
  //   .attr('offset', '0%')
  //   .attr('stop-color', '#ddd')
  //   .attr('stop-opacity', '0.8');

  radialGradient.append('stop')
    .attr('offset', '100%')
    .attr('stop-color', d => d.color)
    .attr('stop-opacity', '1');

  let nodeSymbol = vis.append('svg:g')
    .selectAll('symbol')
    .data(type ? legendSys : legendArea)
    .enter()
    .append('svg:symbol')
    .attr('id', d => 'node-' + d.id)
    .attr('viewBox', '0 0 100 100')
    .attr('preserveAspectRatio', 'xMinYMin meet');
  nodeSymbol.append('circle')
    .attr('cx', 50)
    .attr('cy', 50)
    .attr('r', 40)
    .attr('fill', 'none')
    .attr('stroke', d => d.color)
    .attr('stroke-width', 2);
  nodeSymbol.append('circle')
    .attr('cx', 50)
    .attr('cy', 50)
    .attr('r', 34)
    .attr('fill', d => 'url(#radial-' + d.id + ')');

  return vis;
}
