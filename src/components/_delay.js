import * as d3 from 'd3';

/**
 * 延时加载
 * @param {*} force 力导图
 */
export default function (force) {
  d3.timeout(function () {
    for (var i = 0, n = Math.ceil(Math.log(force.alphaMin()) / Math.log(1 - force.alphaDecay())); i < n; ++i) {
      force.tick();
    }
    force.restart();
  });

  force.on('end', function () {
  });
}
