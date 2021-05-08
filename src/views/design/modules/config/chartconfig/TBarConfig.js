const config = {
  getOption(params, data) {
    const legendData = []
    const yAxisData=[]
    const singleSeries = []
    const multipleSeries = []
    const dataLegendSeries = {}
    const dataYAxisSeries = {}

    if(params.legendCol&&params.legendCol.colId){
      for(const i in data.ds1){
        let item = data.ds1[i]
        let itemYAxis = item[params.categoryCol.colId]
        let itemLegend = item[params.legendCol.colId]
        let itemVal = item[params.measureCols[0].colId]
        if(!dataLegendSeries[itemLegend]) {
          dataLegendSeries[itemLegend] = {}
        }
        if(!dataYAxisSeries[itemYAxis]) {
          dataYAxisSeries[itemYAxis] = {}
        }
        dataLegendSeries[itemLegend][itemYAxis] = itemVal
      }
      for(const x in dataYAxisSeries){
        yAxisData.push(x)
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
          if(!dataYAxisSeries[itemXAxis]) {
            dataYAxisSeries[itemXAxis] = {}
          }
          dataLegendSeries[itemLegend][itemXAxis] = itemVal
        }
      }
      for(const x in dataYAxisSeries){
        yAxisData.push(x)
      }
    }
    const xLen = yAxisData.length
    let legendIndex = 0
    for(const l in legendData){
      const legend = legendData[l]
      singleSeries.push({
        name: legend,
        type: 'bar',
        stack: 'stack',
        data: new Array(xLen).fill(0)
      })
      multipleSeries.push({
        name: legend,
        type: 'bar',
        stack: null,
        data: new Array(xLen).fill(0)
      })
      for(const x in dataLegendSeries[legend]){
        const index = yAxisData.indexOf(x)
        const val = dataLegendSeries[legend][x]
        singleSeries[legendIndex].data[index]=val
        multipleSeries[legendIndex].data[index]=val
      }
      legendIndex++
    }

    return {
      legend: {
        data:legendData
      },
      xAxis: {
        type: 'value'
      },
      yAxis: {
        type: 'category',
        data: yAxisData
      },
      singleSeries: singleSeries,
      multipleSeries: multipleSeries
    }
  }
}

export default config
