import _linktip from './_linktip';

/**
 * 连线
 * @param {*} data 数据
 * @param {*} vis svg视图
 */
export default function (data, vis) {

  let link = vis.selectAll('line.link')
    .data(data.links);

  link.exit().remove();

  /* eslint-disable no-extra-parens */
  link = link.enter()
    .append('svg:line')
    .lower()
    .classed('link', true)
    .merge(link)
    .attr('id', d => `link-${d['source']['index']}_${d['target']['index']}`)
    .attr('marker-start', d => d.source.index === d.target.index ? false : (d['isTwoWay'] ? 'url(#start-arrow)' : ''))
    .attr('marker-end', d => d.source.index === d.target.index ? false : 'url(#end-arrow)')
    .attr('stroke', '#8d98b3')
    .attr('stroke-width', 2.5)
    .attr('fill', 'none');

  // 区域图层降至最低层，否则无法获取link的事件
  vis.select('.region').lower();

  // 鼠标滑过事件，显示linkText
  let tip = _linktip().html(d => {
    let html = d.source.id + (d.isTwoWay ? ' ⇆ ' : ' → ') + d.target.id;
    if (d.desc) {
      d.desc.forEach(desc => {
        html += '<br/>' + (desc.key ? (desc.key + '： ') : '') + desc.value;
      });
    }
    return html;
  });
  link.call(tip);

  link.on('mouseover', tip.show)
    .on('mouseout', tip.hide);

  return link;
}
