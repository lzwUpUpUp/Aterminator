/**
* 静态数据工厂
* Author: dong xing
* Date: 2019/11/20
* Time: 5:13 下午
* Email: dong.xing@outlook.com
*/
import LinesStaticDataConfig from '../config/dataConfig/staticDataConfig/LinesStaticDataConfig'
import DoubleLinesStaticDataConfig from '../config/dataConfig/staticDataConfig/DoubleLinesStaticDataConfig'
import BarStaticDataConfig from '../config/dataConfig/staticDataConfig/BarStaticDataConfig'
import TBarStaticDataConfig from '../config/dataConfig/staticDataConfig/TBarStaticDataConfig'
import PieStaticDataConfig from '../config/dataConfig/staticDataConfig/PieStaticDataConfig'
import NestedPieStaticDataConfig from '../config/dataConfig/staticDataConfig/NestedPieStaticDataConfig'
import RunStaticDataConfig from '../config/dataConfig/staticDataConfig/RunStaticDataConfig'
import RadarStaticDataConfig from '../config/dataConfig/staticDataConfig/RadarStaticDataConfig'
import FunnelStaticDataConfig from '../config/dataConfig/staticDataConfig/FunnelStaticDataConfig'
import NeedleStaticDataConfig from '../config/dataConfig/staticDataConfig/NeedleStaticDataConfig'


export default class StaticDataConfigFactory {
  static create(type, staticDataConfig = {}) {
    switch (type) {
      case 'Lines':
        return new LinesStaticDataConfig(staticDataConfig)
      case 'DoubleLines':
        return new DoubleLinesStaticDataConfig(staticDataConfig)
      case 'Bar':
        return new BarStaticDataConfig(staticDataConfig)
      case 'TBar':
        return new TBarStaticDataConfig(staticDataConfig)
      case 'Pie':
        return new PieStaticDataConfig(staticDataConfig)
      case 'NestedPie':
        return new NestedPieStaticDataConfig(staticDataConfig)
      case 'Run':
        return new RunStaticDataConfig(staticDataConfig)
      case 'Radar':
        return new RadarStaticDataConfig(staticDataConfig)
      case 'Funnel':
        return new FunnelStaticDataConfig(staticDataConfig)
      case 'Needle':
        return new NeedleStaticDataConfig(staticDataConfig)
      default:
        return null
    }
  }
}
