import Chart from './index'

export default class FunnelChart extends Chart {
  constructor({ widget }) {
    super({ widget })
  }

  mappingOption({ commonConfig, proprietaryConfig, dataConfig }) {
    const { grid } = commonConfig.getOption()
    const {
      legend, itemStyle: { color, ...otherItemStyle }, ...otherConfig
    } = proprietaryConfig.getOption()
    const { sourceType, staticDataConfig: { staticData } } = dataConfig
    let series = []

    // 总体配置
    const option = { color, grid, legend, series }

    const pie = {
      type: 'funnel',
      itemStyle: otherItemStyle,
      ...otherConfig
    }

    if (sourceType === 'static' || sourceType === 'real') {
      series = staticData.series.map((item) => {
        Object.assign(item, pie)
        return item
      })
      const { legend: staticLegend } = staticData
      Object.assign(option, {
        legend: Object.assign(legend, staticLegend),
        series
      })
    }
    return option
  }
}
