const config = {
  getOption(params, data) {
    const legendData = []
    const xAxisData=[]
    const seriesData = []
    const dataLegendSeries = {}
    const dataXAxisSeries = {}
    const indicator = []

    if(params.legendCol&&params.legendCol.colId){
      for(const i in data.ds1){
        let item = data.ds1[i]
        let itemXAxis = item[params.categoryCol.colId]
        let itemLegend = item[params.legendCol.colId]
        let itemVal = item[params.measureCols[0].colId]
        if(!dataLegendSeries[itemLegend]) {
          dataLegendSeries[itemLegend] = {}
        }
        if(!dataXAxisSeries[itemXAxis]) {
          dataXAxisSeries[itemXAxis] = {}
        }
        dataLegendSeries[itemLegend][itemXAxis] = itemVal
      }
      for(const x in dataXAxisSeries){
        xAxisData.push(x)
        indicator.push({name:x})
      }
      for(const legend in dataLegendSeries){
        legendData.push(legend)
      }
    }else {
      for(const l in params.measureCols){
        legendData.push(params.measureCols[l].colName);
      }
      for(const i in data.ds1){
        let item = data.ds1[i]
        let itemXAxis = item[params.categoryCol.colId]
        for(const l in params.measureCols){
          const col = params.measureCols[l]
          let itemVal = item[col.colId]
          let itemLegend = col.colName;
          if(!dataLegendSeries[itemLegend]) {
            dataLegendSeries[itemLegend] = {}
          }
          if(!dataXAxisSeries[itemXAxis]) {
            dataXAxisSeries[itemXAxis] = {}
          }
          dataLegendSeries[itemLegend][itemXAxis] = itemVal
        }
      }
      for(const x in dataXAxisSeries){
        xAxisData.push(x)
        indicator.push({name:x})
      }
    }
    const xLen = xAxisData.length
    let legendIndex = 0
    for(const l in legendData){
      const legend = legendData[l]
      seriesData.push({
        name: legend,
        value: new Array(xLen).fill(0)
      })
      for(const x in dataLegendSeries[legend]){
        const index = xAxisData.indexOf(x)
        const val = dataLegendSeries[legend][x]
        seriesData[legendIndex].value[index]=val
      }
      legendIndex++
    }


    return {
      legend: {
        data: legendData
      },
      radar: {
        indicator: indicator
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        type: 'radar',
        data:seriesData
      }]
    }
  }
}

export default config
