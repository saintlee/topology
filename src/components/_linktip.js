import * as d3 from 'd3';

/**
 * 连线tip
 */
/* eslint-disable no-use-before-define*/
export default function () {

  const el = initElement();
  let svg = null,
    html = d3TipHTML;

  function linktip(vis) {
    svg = getSVGNode(vis);
    if (!svg) {
      return;
    }
    document.body.appendChild(el.node());
  }

  linktip.show = function () {
    let args = Array.prototype.slice.call(arguments),
      content = html.apply(this, args);
    let target = d3.event.target,
      domRect = target.getBoundingClientRect(),
      scrollTop = document.documentElement.scrollTop,
      scrollLeft = document.documentElement.scrollLeft;

    el.html(content)
      .style('opacity', 1)
      .style('top', domRect.top + scrollTop + domRect.height / 2 - el.node().offsetHeight - 10 + 'px')
      .style('left', domRect.left + scrollLeft + domRect.width / 2 - el.node().offsetWidth / 2 + 'px');

    return linktip;
  };

  linktip.hide = function () {
    el.style('opacity', 0);
    return linktip;
  };

  linktip.html = function (v) {
    if (!arguments.length) {
      return html;
    }
    html = v === null ? v : functor(v);
    return linktip;
  };


  function getSVGNode(element) {
    var svgNode = element.node();
    if (!svgNode) {
      return null;
    }
    if (svgNode.tagName.toLowerCase() === 'svg') {
      return svgNode;
    }
    return svgNode.ownerSVGElement;
  }


  function initElement() {
    let elDom = d3.select(document.createElement('div'));
    elDom
      .classed('d3-tip', true)
      .style('position', 'absolute')
      .style('top', 0)
      .style('opacity', 0)
      .style('pointer-events', 'none')
      .style('box-sizing', 'border-box');
    return elDom;
  }

  function functor(v) {
    return typeof v === 'function' ? v : function () {
      return v;
    };
  }

  function d3TipHTML() {
    return ' ';
  }

  return linktip;

}
