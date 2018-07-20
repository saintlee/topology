import _vis from './_vis';
import _region from './_region';
import _forceArea from './_force_area';
import _forceSys from './_force_sys';
import _link from './_link';
import _node from './_node';
import _event from './_event';
import _tickArea from './_tick_area';
import _tickSys from './_tick_sys';
import _legend from './_legend';
import _flicker from './_flicker';

/* 区域初始化 */
function initArea(input) {
  let vis = _vis(), //创建svg视图
    region = _region(vis), // 创建布局区域
    force = _forceArea(region); //力导向图布局

  _legend(); // 创建图例

  /* 更新数据，如果需要动态添加节点、连线等可以调用此方法  */
  function update(data) {

    //添加节点和连线的坐标以及move信息
    force.nodes(data.nodes);
    force.force('link').links(data.links);

    //生成节点连接线
    let node = _node(data, vis),
      link = _link(data, vis);

    //布局
    force.on('tick', () => _tickArea(link, node, region));

    //节点双击高亮
    _event.dbclick(link, node, data);

    //节点拖拽
    node.call(_event.drag(force));

  }

  // 数据更新
  update(input);

  // 重新恢复模拟
  force.restart();

  // _delay(force);

  return initArea;
}

/* 系统初始化 */
function initSys(input) {
  let vis = _vis('sys'), //创建svg视图
    force = _forceSys(); //力导向图布局

  /* 更新数据，如果需要动态添加节点、连线等可以调用此方法  */
  function update(data) {

    //添加节点和连线的坐标以及move信息
    force.nodes(data.nodes);
    force.force('link').links(data.links);

    //生成节点连接线
    let node = _node(data, vis, 'sys'),
      link = _link(data, vis);

    //布局
    force.on('tick', () => _tickSys(link, node));

    //节点拖拽
    node.call(_event.drag(force));

  }

  // 数据更新
  update(input);

  // 重新恢复模拟
  force.restart();

  return initSys;
}

// 点击事件
initSys.click = function (v) {
  if (!arguments.length) {
    return;
  }
  if (typeof v === 'function') {
    //节点点击
    _event.click(v);
  }
  return initSys;
};

/* 暴露init方法 */
export default {
  'initArea': initArea,
  'initSys': initSys,
  'flicker': _flicker
};

