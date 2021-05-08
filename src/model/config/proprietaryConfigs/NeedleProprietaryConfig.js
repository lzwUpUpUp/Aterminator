/**
 * 仪表盘图
 * Date: 2020/4/26
 * Time: 3:02 下午
 */

import _ from 'lodash'
import { Legend, PieItemStyle, PieLabel } from './index'

export default class PieProprietaryConfig {
  constructor ({
                 needleItemStyle = {}
               }) {
    this.needleItemStyle = new PieItemStyle(needleItemStyle)
  }

  /**
   * 获取漏斗图专有配置
   */
  getOption () {
    return Object.assign(_.omit(_.cloneDeep(this), ['needleItemStyle']), {
      itemStyle: this.needleItemStyle.getOption(),
    })
  }
}
