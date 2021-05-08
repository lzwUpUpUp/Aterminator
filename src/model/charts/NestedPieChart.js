import Chart from './index'

export default class NestedPieChart extends Chart {
  constructor ({ widget }) {
    super({ widget })
  }

  mappingOption ({ commonConfig, proprietaryConfig, dataConfig }) {
    const { grid } = commonConfig.getOption()
    const {
      legend,
      roseType,radius,itemStyle,label,labelLine,
      roseType2,radius2,itemStyle2,label2,labelLine2,
      itemStyle: { color, ...otherItemStyle }, ...otherConfig
    } = proprietaryConfig.getOption()
    const { sourceType, staticDataConfig: { staticData } } = dataConfig
    let series = []

    // 总体配置
    const option = { color, grid, legend, series }

    const pie = {
      type: 'pie',
      itemStyle: otherItemStyle,
      ...otherConfig
    }

    const pie1 = {
      type: 'pie',
      roseType:roseType,
      radius:radius,
      itemStyle:otherItemStyle,
      label:label,
      labelLine:labelLine,
      ...otherConfig
    }
    const pie2 = {
      type: 'pie',
      roseType:roseType2,
      radius:radius2,
      itemStyle:otherItemStyle,
      label:label2,
      labelLine:labelLine2,
      ...otherConfig
    }

    if (sourceType === 'static'||sourceType === 'real') {
      series = [];
      series.push(Object.assign(staticData.series[0],pie1));
      series.push(Object.assign(staticData.series[1],pie2));
      // series = staticData.series.map((item) => {
      //   console.log('staticData',staticData);
      //   Object.assign(item, pie)
      //   return item
      // })
      const { legend: staticLegend } = staticData
      Object.assign(option, {
        legend: Object.assign(legend, staticLegend),
        series
      })
    }
    return option
  }
}
