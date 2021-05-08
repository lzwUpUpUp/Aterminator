import Chart from './index'

export default class NeedleChart extends Chart {
  constructor({ widget }) {
    super({ widget })
  }

  mappingOption({ commonConfig, proprietaryConfig, dataConfig }) {
    const { grid } = commonConfig.getOption()
    const {
      itemStyle: { color, ...otherItemStyle }, ...otherConfig
    } = proprietaryConfig.getOption()
    const { sourceType, staticDataConfig: { staticData } } = dataConfig
    let series = []

    // 总体配置
    const option = { color, grid, series }

    const gauge = {
      type: 'gauge',
      itemStyle: otherItemStyle,
      ...otherConfig
    }

    if (sourceType === 'static' || sourceType === 'real') {
      series = staticData.series.map((item) => {
        Object.assign(item, gauge)
        return item
      })
      const { legend: staticLegend } = staticData
      Object.assign(option, {
        series
      })
    }
    return option
  }
}
