/**
* 图表工厂
* Author: dong xing
* Date: 2019/11/19
* Time: 5:36 下午
* Email: dong.xing@outlook.com
*/
import LinesChart from '../charts/LinesChart'
import DoubleLinesChart from '../charts/DoubleLinesChart'
import BarChart from '../charts/BarChart'
import TBarChart from '../charts/TBarChart'
import PieChart from '../charts/PieChart'
import NestedPieChart from '../charts/NestedPieChart'
import RunChart from '../charts/RunChart'
import RadarChart from '../charts/RadarChart'
import FunnelChart from '../charts/FunnelChart'
import NeedleChart from '../charts/NeedleChart'
import TopologyChart from '../charts/TopologyChart'
import TextsChart from '../charts/TextsChart'
import RectChart from '../charts/RectChart'
import CircleChart from '../charts/CircleChart'
import TriangleChart from '../charts/TriangleChart'
import ImageChart from '../charts/ImageChart'
import DateTimeChart from '../charts/DateTimeChart'

export default class ChartFactory {
  static create(type, widget) {
    switch (type) {
      case 'Lines':
        return new LinesChart(widget)
      case 'DoubleLines':
        return new DoubleLinesChart(widget)
      case 'Bar':
        return new BarChart(widget)
      case 'TBar':
        return new TBarChart(widget)
      case 'Pie':
        return new PieChart(widget)
      case 'NestedPie':
        return new NestedPieChart(widget)
      case 'Run':
        return new RunChart(widget)
      case 'Radar':
        return new RadarChart(widget)
      case 'Funnel':
        return new FunnelChart(widget)
      case 'Needle':
        return new NeedleChart(widget)
      case 'Topology':
        return new TopologyChart(widget)
      case 'Texts':
        return new TextsChart(widget)
      case 'Rect':
        return new RectChart(widget)
      case 'Circle':
        return new CircleChart(widget)
      case 'Triangle':
        return new TriangleChart(widget)
      case 'Image':
        return new ImageChart(widget)
      case 'DateTime':
        return new DateTimeChart(widget)
      default:
        return null
    }
  }
}
