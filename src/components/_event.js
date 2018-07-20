import * as d3 from 'd3';
/**
 * 双击事件
 * @param {*} link 连接
 * @param {*} node 节点
 * @param {*} data 数据
 */
function dbclick(link, node, data) {
  /* 高亮显示 */
  function highlight(nodeObj) {
    let dependNode = [], // 关联节点集合
      dependLinkAndText = []; // 关联连线(文字)集合
    if (nodeObj) {
      let ind = nodeObj.index;
      dependNode = dependNode.concat([ind]);
      dependLinkAndText = dependLinkAndText.concat([ind]);
      // 获取节点/连线(文字)集合
      data.links.forEach(item => {
        if (ind === item['source']['index']) {
          dependNode = dependNode.concat([item['target']['index']]);
        } else if (ind === item['target']['index']) {
          dependNode = dependNode.concat([item['source']['index']]);
        }
      });

      // 将除dependNode中以外的节点设置为不活跃，即class="inactive"
      node.classed('inactive', d => dependNode.indexOf(d.index) === -1);
      // 将除dependLinkAndText中以外的连线(文字)设置为不活跃，即class="inactive"
      link.classed('inactive', d => dependLinkAndText.indexOf(d.source.index) === -1 && dependLinkAndText.indexOf(d.target.index) === -1);
      // link.classed('active', d => dependLinkAndText.indexOf(d.source.index) !== -1 || dependLinkAndText.indexOf(d.target.index) !== -1);
    } else {
      // 取消class="inactive"和class="active"
      node.classed('inactive', false);
      link.classed('inactive', false);
      // link.classed('active', false);
      // 清空关联节点/连线(文字)集合
      dependNode = [];
      dependLinkAndText = [];
    }
  }

  // 双击节点
  node.on('dblclick', function (d) {
    highlight(d);
    // 阻止事件冒泡
    d3.event.stopPropagation();
  });

  // 双击svg视图其他区域
  d3.select('#svgview').on('dblclick', function () {
    highlight(null);
  });
  d3.select('#svglegend').on('dblclick', function () {
    highlight(null);
  });
}

/* eslint-disable no-unused-expressions */
function drag(force) {

  // d3.event.subject为d3主题，这里即为node节点
  let dragstart = () => {
    d3.event.active || force.alphaTarget(0.3).restart(), d3.event.subject.fx = d3.event.subject.x, d3.event.subject.fy = d3.event.subject.y;
  };

  // x和y节点的当前位置，fx和fy节点的固定位置，vx和vy节点的速度
  let dragmove = () => {
    d3.event.subject.fx = d3.event.x;
    d3.event.subject.fy = d3.event.y;
  };

  let dragend = () => {
    // 解除dragged中固定的坐标
    d3.event.active || force.alphaTarget(0), d3.event.subject.fx = null, d3.event.subject.fy = null;
  };

  // 拖拽事件，start拖拽开始，darg拖拽过程，end拖拽结束
  return d3.drag().on('start', dragstart).on('drag', dragmove).on('end', dragend);
}

/* 节点单击事件 */
function click(fn) {
  if (typeof fn === 'function') {
    d3.selectAll('.node-bg').on('click', function (d) {
      fn(d, d3.event);
      // 阻止事件冒泡
      d3.event.stopPropagation();
    });
  }
}

/* 事件 */
export default {
  /* 双击事件 */
  'dbclick': dbclick,
  /* 单击事件 */
  'click': click,
  /* 拖拽事件 */
  'drag': drag
};
