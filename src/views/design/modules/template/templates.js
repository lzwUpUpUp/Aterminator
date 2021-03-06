/**
* 图表配置
* Author: dong xing
* Date: 2020/1/13
* Time: 2:55 下午
* Email: dong.xing@outlook.com
*/

import Template from '@/model/template'

// 图表模板
const charts = [
  {
    category: 'CHART', type: 'Lines', name: '折线图', icon: 'line-chart', width: 300, height: 300
  },
  {
    category: 'CHART', type: 'DoubleLines', name: '双Y折线图', icon: 'swap', width: 300, height: 300
  },
  {
    category: 'CHART', type: 'Bar', name: '柱形图', icon: 'bar-chart', width: 300, height: 300
  },
  {
    category: 'CHART', type: 'TBar', name: '条形图', icon: 'menu-unfold', width: 300, height: 300
  },
  {
    category: 'CHART', type: 'Pie', name: '饼图', icon: 'pie-chart', width: 300, height: 300
  },
  {
    category: 'CHART', type: 'NestedPie', name: '嵌套饼图', icon: 'issues-close', width: 300, height: 300
  },
  {
    category: 'CHART', type: 'Run', name: '跑道图', icon: 'chrome', width: 300, height: 300
  },
  {
    category: 'CHART', type: 'Radar', name: '雷达图', icon: 'radar-chart', width: 300, height: 300
  },
  {
    category: 'CHART', type: 'Funnel', name: '漏斗图', icon: 'funnel-plot', width: 300, height: 300
  },
  {
    category: 'CHART', type: 'Needle', name: '仪表盘图', icon: 'table', width: 300, height: 300
  },
  // {
  //   category: 'CHART', type: 'Topology', name: '拓扑图', icon: 'deployment-unit', width: 800, height: 600
  // },
  {
    category: 'CHART', type: 'Texts', name: '文本', icon: 'font-colors', width: 350, height: 100
  },
  // {
  //   category: 'CHART', type: 'Rect', name: '矩形', icon: 'border', width: 200, height: 200
  // },
  {
    category: 'CHART', type: 'Circle', name: '圆形', icon: 'loading-3-quarters', width: 200, height: 200
  },
  {
    category: 'CHART', type: 'Triangle', name: '三角形', icon: 'heat-map', width: 200, height: 200
  },
  {
    category: 'CHART', type: 'Image', name: '图片', icon: 'picture', width: 300, height: 300
  },
  {
    category: 'CHART', type: 'DateTime', name: '时间日期', icon: 'clock-circle', width: 350, height: 100
  }
]

// 元素模板
const elements = [
  {
    category: 'ELEMENT', type: 'Icon', name: '图标', icon: 'ant-design', width: 100, height: 100
  }
]

// 可拓展模板
const TEMPLATES = [
  ...charts.map(chart => new Template(chart)),
  ...elements.map(element => new Template(element))
]

export default TEMPLATES
