import $ from 'jquery';

let legendHeight = 50;
/* 宽高 */
let [width, height] = [$('.network').width(), $('.network').height() - legendHeight];

export { width, height, legendHeight };
