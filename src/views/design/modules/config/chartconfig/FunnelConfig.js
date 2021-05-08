const config = {
  getOption(params, data) {
    const legendData = [];
    const dataSeries = {}
    const seriesData = [];

    for (const i in data.ds1) {
      let item = data.ds1[i]
      let itemLegend = item[params.legendCol.colId]
      let itemValue = item[params.measureCols[0].colId]
      dataSeries[itemLegend] = {name:itemLegend,value:itemValue}
    }

    for(const l in dataSeries) {
      legendData.push(l);
      seriesData.push(dataSeries[l])
    }

    return {
      legend: {
        data: legendData
      },
      series: [
        {
          type: 'funnel',
          label:{formatter:'{b} - {c}'},
          data: seriesData
        }
      ]
    }
  }
}
export default config;
