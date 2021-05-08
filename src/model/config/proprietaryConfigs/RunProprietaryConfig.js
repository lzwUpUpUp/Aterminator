/**
* 饼图
* Date: 2020/4/26
* Time: 3:02 下午
*/

import _ from 'lodash'
import { Legend, PieItemStyle, PieLabel } from './index'

export default class NestedPieProprietaryConfig {
  constructor({
    hoverAnimation = true,
    hoverOffset = 10,
    pieLabel = {},
    legend = {show:true},
    normal= {label: {show: true, position: 'inside',fontSize:12}},
    pieItemStyle = {},
  }) {
    this.hoverAnimation = hoverAnimation
    this.hoverOffset = hoverOffset
    this.pieLabel = new PieLabel(pieLabel)
    this.stillShowZeroSum = false
    this.legend = new Legend(legend)
    this.pieItemStyle = new PieItemStyle(pieItemStyle)
    this.normal = normal
    this.pieItemStyle.normal= this.normal

  }
  
  /**
   * 获取跑道图专有配置
   */
  getOption() {
    return Object.assign(_.omit(_.cloneDeep(this), ['pieItemStyle', 'pieLabel']), {
      itemStyle: this.pieItemStyle.getOption(),
      labelLine: { show: this.pieLabel.show },
    }
    )
  }
}
