import * as d3 from 'd3';

/**
 * 闪烁
 * @param {*} id 节点id,主要是获取node-id的元素
 * @param {*} rate 频率
 * @param {*} duration 持续时间
 */
export default function (id, rate, duration) {
  let r = rate || 150,
    d = duration || 15 * 1000;
  // 获取元素
  let el = d3.select(document.getElementById('node-' + id));
  if (el.node()) {
    let t = d3.timer(function (elapsed) {
      el.attr('opacity', Math.floor(elapsed / r) % 2 === 0 ? 0.7 : false);
      if (elapsed > d) {
        el.attr('opacity', false);
        t.stop();
      }
    }, 100);
  }
}
