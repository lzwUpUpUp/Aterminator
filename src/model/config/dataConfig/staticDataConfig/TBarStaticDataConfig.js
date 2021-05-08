/**
* 条形图静态数据
* Author: dong xing
* Date: 2019/11/26
* Time: 2:24 下午
* Email: dong.xing@outlook.com
*/

import _ from 'lodash'
const defaultTBarStaticData = {
  legend: {
    data: ['Forest', 'Steppe', 'Desert', 'Wetland']
  },
  xAxis: {
    type: 'value'
  },
  yAxis: {
    type: 'category',
    data: ['2012', '2013', '2014', '2015']
  },
  singleSeries: [
    {
      name: 'Forest',
      type: 'bar',
      stack: 'stack',
      data: [320, 200, 300, 400]
    },
    {
      name: 'Steppe',
      type: 'bar',
      stack: 'stack',
      data: [200, 182, 200, 300]
    },
    {
      name: 'Desert',
      type: 'bar',
      stack: 'stack',
      data: [400, 300, 201,350]
    },
    {
      name: 'Wetland',
      type: 'bar',
      stack: 'stack',
      data: [300, 350, 360, 340]
    }
  ],
  multipleSeries: [
    {
      name: 'Forest',
      type: 'bar',
      stack: null,
      data: [320, 332, 301, 334, 390]
    },
    {
      name: 'Steppe',
      type: 'bar',
      stack: null,
      data: [220, 182, 191, 234, 290]
    },
    {
      name: 'Desert',
      type: 'bar',
      stack: null,
      data: [150, 232, 201, 154, 190]
    },
    {
      name: 'Wetland',
      type: 'bar',
      stack: null,
      data: [98, 77, 101, 99, 40]
    }
  ]
}

export default class BarStaticDataConfig {
  constructor ({
    staticData = defaultTBarStaticData
  }) {
    this.staticData = staticData
  }

  /**
   * 获取条形图静态数据代码
   * @returns {string}
   */
  getCode (barType) {
    const originalSource = _.omit(_.cloneDeep(this.staticData), ['singleSeries', 'multipleSeries'])
    const series = barType === 'single' ? _.cloneDeep(this.staticData.singleSeries) : _.cloneDeep(this.staticData.multipleSeries)
    Object.assign(originalSource, { series })
    return JSON.stringify(originalSource, null, '\t')
  }

  /**
   * 更新静态数据
   * @param config
   * @param code
   */
  updateStaticData (config, code) {
    const { barType } = config.proprietaryConfig
    const typeMapping = new Map([
      ['single', 'singleSeries'],
      ['multiple', 'multipleSeries']
    ])
    let a = {
      [typeMapping.get(barType)]: JSON.parse(code).series
    }
    if(!JSON.parse(code).series) a=null
    Object.assign(
      config.dataConfig.staticDataConfig.staticData,
      Object.assign(_.omit(JSON.parse(code), ['series'])),
      a
    )
  }

}
