/**
 * 漏斗图静态数据配置
 * Date: 2020/4/27
 * Time: 5:42 下午
 */

const defaultFunnelStaticData = {
  legend: {
    data: ['展现','点击','访问','咨询','订单']
  },
  series: [
    {
      type: 'funnel',
      label:{formatter:'{b} - {c}'},
      data: [
        {value: 60, name: '访问'},
        {value: 40, name: '咨询'},
        {value: 20, name: '订单'},
        {value: 80, name: '点击'},
        {value: 100, name: '展现'}
      ]
    }
  ]
}

export default class PieStaticDataConfig {
  constructor ({
                 staticData = defaultFunnelStaticData
               }) {
    this.staticData = staticData
  }

  /**
   * 获取漏斗图静态数据代码
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


