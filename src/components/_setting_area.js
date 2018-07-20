// 区域
let area = {
  'name': 'window',
  'children': [
    { 'id': 'net', 'name': '互联网区域', 'area': 50, 'sort': 1 },
    { 'id': 'dmz', 'name': 'DMZ域', 'area': 60, 'sort': 2 },
    {
      'name': 'internal', 'children': [
        { 'id': 'core', 'name': '核心域', 'area': 30, 'sort': 3 },
        { 'id': 'oa', 'name': 'OA域', 'area': 30, 'sort': 4 }
      ]
    }
  ]
};

// 图例，主要负责图例创建、以及提供节点样式
let legendArea = [
  { 'id': 0, 'name': '正常IP', 'color': '#6ead46' },
  { 'id': 1, 'name': '中危IP', 'color': '#ffc102' },
  { 'id': 2, 'name': '高危IP', 'color': '#ff0202' },
  { 'id': 3, 'name': '威胁IP', 'color': '#000000' }
];

// 半径
let radiusArea = 15;
export { area, legendArea, radiusArea };
