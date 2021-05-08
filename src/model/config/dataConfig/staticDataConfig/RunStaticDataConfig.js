/**
* 饼图静态数据配置
* Date: 2020/4/27
* Time: 5:42 下午
*/

const defaultRunStaticData = {
  legend: {
    data: ['机械电子制造业', "轻纺工业", "资源加工工业", "其他"]
  },
  series: [
    { value: 300, name: '机械电子制造业' },
    { value: 250, name: '轻纺工业' },
    { value: 160, name: '资源加工工业' },
    { value: 120, name: '其他' }
  ]
}

export default class NestedPieStaticDataConfig {
  constructor({
    staticData = defaultRunStaticData
  }) {
    this.staticData = staticData
  }

  /**
   * 获取折线图静态数据代码
   * @returns {string}
   */
  getCode() {
    return JSON.stringify(this.staticData, null, '\t')
  }

  /**
   * 更新静态数据
   * @param config
   * @param code
   */
  updateStaticData(config, code) {
    Object.assign(
      config.dataConfig.staticDataConfig,
      { staticData: JSON.parse(code) }
    )
  }
}


