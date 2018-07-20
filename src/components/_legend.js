import * as d3 from 'd3';
import { width, legendHeight } from './_layout_area';
import { legendArea, radiusArea } from './_setting_area';

/**
 * 绘制图例
 */
export default function () {

  // 在topology创建一个图例的svg视图，与拓扑图的视图相对独立，否则会导致点击事件冲突
  var svg = d3.select('.network')
    .append('svg:svg')
    .attr('id', 'svglegend')
    .style('position', 'absolute')
    .style('left', 0)
    .style('top', 0) // 计算图例展示局域
    .attr('width', width)
    .attr('height', legendHeight);

  var legend = svg.selectAll('.legendCells')
    .data(legendArea)//pass the lgend data
    .enter().append('g')
    .attr('class', 'legendCells')
    .attr('transform', (d, i) => {
      return 'translate(' + (radiusArea + i * 120) + ',20)';
    });

  legend.append('use')
    .classed('cell', true)
    .attr('xlink:href', d => '#node-' + d.id)
    .attr('x', 0 - radiusArea)
    .attr('y', 0 - radiusArea)
    .attr('width', radiusArea * 2)
    .attr('height', radiusArea * 2);

  legend.append('text')
    .classed('label', true)
    .attr('x', radiusArea)
    .attr('y', radiusArea / 2.5)
    .style('text-anchor', 'start')
    .style('cursor', 'pointer')
    .text(d => d.name);

  return legend;
}
