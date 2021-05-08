/**
* 饼图
* Date: 2020/4/26
* Time: 3:02 下午
*/

import _ from 'lodash'
import { Legend, PieItemStyle, PieLabel } from './index'

export default class NestedPieProprietaryConfig {
  constructor ({
    hoverAnimation = true,
    hoverOffset = 10,
    startAngle = 90,
    roseType = 'none',
    radius = {
      outside: 0,
      inside: '30%'
    },
    pieLabel = {},
    legend = {},
    pieItemStyle = {},

     roseType2 = 'none',
     radius2 = {
       outside: '45%',
       inside: '60%'
     },
     pieLabel2 = {},
     pieItemStyle2 = {}

  }) {
    this.hoverAnimation = hoverAnimation
    this.hoverOffset = hoverOffset
    this.startAngle = startAngle
    this.roseType = roseType
    this.radius = radius
    this.pieLabel = new PieLabel(pieLabel)
    this.stillShowZeroSum = false
    this.legend = new Legend(legend)
    this.pieItemStyle = new PieItemStyle(pieItemStyle)

    this.roseType2 = roseType2
    this.radius2 = radius2
    this.pieLabel2 = new PieLabel(pieLabel2)
  }

  /**
   * 获取嵌套饼图专有配置
   */
  getOption () {
    return Object.assign(_.omit(_.cloneDeep(this), ['pieItemStyle', 'pieLabel']), {
      roseType: this.roseType === 'none' ? undefined : this.roseType,
      radius: [this.radius.outside, this.radius.inside],
      itemStyle: this.pieItemStyle.getOption(),
      label: this.pieLabel.getOption(),
      labelLine: { show: this.pieLabel.show },

        roseType2: this.roseType2 === 'none' ? undefined : this.roseType2,
        radius2: [this.radius2.outside, this.radius2.inside],
        label2: this.pieLabel2.getOption(),
        labelLine2: { show: this.pieLabel2.show }
    }
    )
  }
}
