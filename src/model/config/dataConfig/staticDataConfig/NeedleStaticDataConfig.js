/**
* 仪表盘图静态数据配置
* Date: 2020/4/27
* Time: 5:42 下午
*/

const defaultNeedleStaticData = {
  series: [
    {
      name: 'demo',
      type: 'gauge',
      data: [
        { name: 'SCORE', value: 50 }
      ]
    }
  ]
}
//多个仪表盘，遍历样式调整或新建多仪表盘模块
const defaultMultiNeedleStaticData = {
  series: [
    {
      name: 'middle',
      type: 'gauge',

      radius: '80%',
      min: 0,
      max: 60,
      startAngle: 200,
      endAngle: -20,

      data: [
        { name: 'SCORE', value: 50 }
      ]
    },
    {
      name: 'left',
      type: 'gauge',

      center: ['18%', '58%'],
      radius: '55%',
      min: 0,
      max: 30,
      startAngle: 200,
      endAngle: 50,

      data: [
        { name: 'SCORE', value: 20 }
      ]
    },
    {
      name: 'right',
      type: 'gauge',

      center: ['82%', '58%'], // 默认全局居中
      radius: '55%',
      min: 0,
      max: 110,
      startAngle: 130,
      endAngle: -20,

      data: [
        { name: 'SCORE', value: 70 }
      ]
    }
  ]
}
export default class PieStaticDataConfig {
  constructor ({
    staticData = defaultNeedleStaticData
  }) {
    this.staticData = staticData
  }

  /**
   * 获取仪表盘图静态数据代码
   * @returns {string}
   */
  getCode () {
    return JSON.stringify(this.staticData, null, '\t')
  }

  /**
   * 更新静态数据
   * @param config
   * @param code
   */
  updateStaticData (config, code) {
    // config.dataConfig.staticDataConfig={ staticData: JSON.parse(code) }
    Object.assign(
      config.dataConfig.staticDataConfig,
      { staticData: JSON.parse(code) }
    )
  }
}


