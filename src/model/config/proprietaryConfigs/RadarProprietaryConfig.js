/**
 * 图
 * Date: 2020/4/26
 * Time: 3:02 下午
 */

import _ from 'lodash'
import { Legend, PieItemStyle } from './index'

export default class RadarProprietaryConfig {
  constructor({
                hoverAnimation = true,
                hoverOffset = 10,
                legend = {show:true},
                normal= {label: {show: true, position: 'inside',fontSize:12}},
                radarItemStyle = {},
                radar = {shape:""}
              }) {
    this.hoverAnimation = hoverAnimation
    this.hoverOffset = hoverOffset
    this.stillShowZeroSum = false
    this.legend = new Legend(legend)
    this.radarItemStyle = new PieItemStyle(radarItemStyle)
    this.normal = normal
    this.radarItemStyle.normal = this.normal
    this.radar = radar
  }

  /**
   * 获取雷达图专有配置
   */
  getOption() {
    return Object.assign(_.omit(_.cloneDeep(this), ['radarItemStyle']), {
        itemStyle: this.radarItemStyle.getOption()}
    )
  }
}
