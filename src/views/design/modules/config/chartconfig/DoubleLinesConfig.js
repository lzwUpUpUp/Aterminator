const config = {
  getOption(params, data) {
    const legend1Data = []
    const legend2Data = []
    const xAxisData=[]
    const series1Data = []
    const series2Data = []
    const dataLegend1Series = {}
    const dataLegend2Series = {}
    const dataXAxisSeries = {}

    if(params.legendCol&&params.measureCols){
      for(const i in data.ds1){
        let item = data.ds1[i]
        let itemXAxis = item[params.categoryCol.colId]
        let itemLegend = item[params.legendCol.colId]
        let itemVal = item[params.measureCols[0].colId]
        if(!dataLegend1Series[itemLegend]) {
          dataLegend1Series[itemLegend] = {}
        }
        if(!dataXAxisSeries[itemXAxis]) {
          dataXAxisSeries[itemXAxis] = {}
        }
        dataLegend1Series[itemLegend][itemXAxis] = itemVal
      }
    }
    if(params.legend2Col&&params.measure2Cols) {
      for(const i in data.ds2){
        let item = data.ds1[i]
        let itemXAxis = item[params.categoryCol.colId]
        let itemLegend = item[params.legend2Col.colId]
        let itemVal = item[params.measure2Cols[0].colId]
        if(!dataLegend2Series[itemLegend]) {
          dataLegend2Series[itemLegend] = {}
        }
        if(!dataXAxisSeries[itemXAxis]) {
          dataXAxisSeries[itemXAxis] = {}
        }
        dataLegend2Series[itemLegend][itemXAxis] = itemVal
      }
    }

    for(const x in dataXAxisSeries){
      xAxisData.push(x)
    }
    for(const legend in dataLegend1Series){
      legend1Data.push(legend)
    }
    for(const legend in dataLegend2Series){
      legend2Data.push(legend)
    }

    const xLen = xAxisData.length
    let legendIndex = 0
    for(const l in legend1Data){
      const legend = legend1Data[l]
      series1Data.push({
        name: legend,
        type: 'line',
        yAxisIndex:0,
        data: new Array(xLen).fill(0)
      })
      for(const x in dataLegend1Series[legend]){
        const index = xAxisData.indexOf(x)
        const val = dataLegend1Series[legend][x]
        series1Data[legendIndex].data[index]=val
      }
      legendIndex++
    }

    legendIndex = 0;
    for(const l in legend2Data){
      const legend = legend2Data[l]
      series2Data.push({
        name: legend,
        type: 'line',
        yAxisIndex:1,
        data: new Array(xLen).fill(0)
      })
      for(const x in dataLegend2Series[legend]){
        const index = xAxisData.indexOf(x)
        const val = dataLegend2Series[legend][x]
        series1Data[legendIndex].data[index]=val
      }
      legendIndex++
    }


    return {
      legend: [{
        data: legend1Data.concat(legend2Data)
      }],
      xAxis: {
        type: 'category',
        data: xAxisData
      },
      yAxis: [{
        type: 'value'
      },{
      type: 'value'
      }],
      series: series1Data.concat(series2Data)
    }
  }
}

export default config
