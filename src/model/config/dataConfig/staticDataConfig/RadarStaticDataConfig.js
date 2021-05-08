/**
 * 雷达图静态数据配置
 * Date: 2020/4/27
 * Time: 5:42 下午
 */

const defaultRadarStaticData = {
  legend: {
    data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
  },
  radar:{
    indicator:[
      { name: '销售（sales）', max: 6500},
      { name: '管理（Administration）', max: 16000},
      { name: '信息技术（Information Techology）', max: 30000},
      { name: '客服（Customer Support）', max: 38000},
      { name: '研发（Development）', max: 52000},
      { name: '市场（Marketing）', max: 25000}
    ]
  },
  series: [
    {
      type: 'radar',
      data: [
        {
          value: [4300, 10000, 28000, 35000, 50000, 19000],
          name: '预算分配（Allocated Budget）'
        },
        {
          value: [5000, 14000, 28000, 31000, 42000, 21000],
          name: '实际开销（Actual Spending）'
        }
      ]
    }
  ]
}

export default class PieStaticDataConfig {
  constructor ({
                 staticData = defaultRadarStaticData
               }) {
    this.staticData = staticData
  }

  /**
   * 获取雷达图静态数据代码
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


