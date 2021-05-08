/**
* 折线图静态数据
* Author: dong xing
* Date: 2019/11/22
* Time: 4:48 下午
* Email: dong.xing@outlook.com
*/
const defaultDoubleLinesStaticData = {
  legend:{
    data:['收益','利润']
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: [{
    type: 'value'
  },{
    type: 'value'
  },],
  series: [{
    name:'收益',
    data: [820, 932, 901, 934, 1290, 1330, 1320],
    type: 'line',
    yAxisIndex:0
  },{
    name:'利润',
    data: [20, 32, 91, 93, 10, 30, 120],
    type: 'line',
    yAxisIndex:1
  }]
}

export default class DoubleLinesStaticDataConfig {
  constructor ({
    staticData = defaultDoubleLinesStaticData
  }) {
    this.staticData = staticData
  }

  /**
   * 获取折线图静态数据代码
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
    Object.assign(
      config.dataConfig.staticDataConfig,
      { staticData: JSON.parse(code) }
    )
  }
}
