/* eslint-disable */
const config={
  getOption(params,data){
    const legendData = []
    const dataSeries = {}
    const series1=[],series2=[]

    for (const i in data.ds1) {
      let item = data.ds1[i]
      let itemLegend = item[params.categoryCol.colId]
      if(!dataSeries[itemLegend]){
        legendData.push(itemLegend)
        dataSeries[itemLegend] = {}
      }
      let itemName = item[params.legendCol.colId]
      let itemValue = item[params.measureCols[0].colId]
      dataSeries[itemLegend][itemName] = {name:itemName,value:itemValue}
    }

    for (let i in legendData) {
      let name = legendData[i];
      let totalVal = 0;
      for(const a in dataSeries[name]){
        series2.push(dataSeries[name][a])
        totalVal += dataSeries[name][a].value
      }
      series1.push({name:name,value:totalVal})
    }

    return {
      legend: {
        data: legendData
      },
      series: [
        {
          name: 'Pie1',
          type: 'pie',
          data:series1
        },{
          name: 'Pie2',
          type: 'pie',
          data:series2
        }
      ]
    }
  }
}
export default config;
