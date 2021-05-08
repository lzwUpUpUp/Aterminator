import Chart from './index'

export default class RadarChart extends Chart {
  constructor({ widget }) {
    super({ widget })
  }

  mappingOption({ commonConfig, proprietaryConfig, dataConfig }) {
    const { grid } = commonConfig.getOption()
    const {
      legend,radar, itemStyle: { color, ...otherItemStyle }, ...otherConfig
    } = proprietaryConfig.getOption()
    const { sourceType, staticDataConfig: { staticData } } = dataConfig
    let series = []

    // 总体配置
    const option = { color, grid, legend, series,radar }

    const myRadar = {
      type: 'radar',
      itemStyle: otherItemStyle,
      ...otherConfig
    }
    if (sourceType === 'static' || sourceType === 'real') {
      series = staticData.series.map((item,index) => {
        Object.assign(item, myRadar)
        return item
      })
      const { legend: staticLegend,radar:staticRadar } = staticData
      Object.assign(option, {
        legend: Object.assign(legend, staticLegend),
        radar: Object.assign(radar, staticRadar),
        series
      })
    }

    return option
  }
}
