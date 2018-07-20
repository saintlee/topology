import d3tip from 'd3-tip';

/**
 * 提示
 * @param {*} vis svg视图
 */
/* eslint-disable no-extra-parens */
export default function (vis) {
  let tip = d3tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(d => {
      let html = d.id;
      if (d.desc) {
        d.desc.forEach(desc => {
          html += '<br/>' + (desc.key ? (desc.key + '： ') : '') + desc.value;
        });
      }
      return html;
    });
  vis.call(tip);
  return tip;
}
