/**
* 折线图
* Author: dong xing
* Date: 2019/11/20
* Time: 8:55 上午
* Email: dong.xing@outlook.com
*/

import Chart from './index'

export default class DoubleLinesChart extends Chart {
  constructor ({ widget }) {
    super({ widget })
  }

  /**
   * 映射成 echarts 配置项
   * @param commonConfig 公共配置
   * @param proprietaryConfig 专有配置
   * @param dataConfig 数据配置
   */
  mappingOption ({ commonConfig, proprietaryConfig, dataConfig }) {
    const { grid } = commonConfig.getOption()
    const { legend, xAxis, y1Axis,y2Axis, ...options } = proprietaryConfig.getOption()
    // console.log(y1Axis);
    const { sourceType, staticDataConfig: { staticData } } = dataConfig
    const line = {
      type: 'line',
      ...options
    }
    let series = []

    // 总体配置
    const option = { grid, legend, series, xAxis: xAxis, yAxis: [y1Axis,y2Axis] }

    if (sourceType === 'static'||sourceType === 'real') {
      series = staticData.series.map((item) => {
        Object.assign(item, line)
        return item
      })
      const { legend: staticLegend, xAxis: staticXAxis, yAxis: staticYAxis } = staticData
      Object.assign(option, {
        legend: Object.assign(legend, staticLegend),
        xAxis: Object.assign(xAxis, staticXAxis),
        yAxis: [Object.assign(y1Axis, staticYAxis[0]),Object.assign(y2Axis, staticYAxis[1])],
        series
      })
    }


    return option
  }
}
