const config = {
  getOption(params, data) {
    const seriesData = [];

    //单或多仪表盘
    for (const i in data.ds1) {
      let item = data.ds1[i]
      for(let col in params.measureCols){
        let itemValue = item[params.measureCols[col].colId]
        seriesData.push({type:'gauge',data:[itemValue]})
      }
    }

    return {
      series: seriesData
    }
  }
}
export default config;
