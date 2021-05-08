/* eslint-disable */
const config={
  getOption(params,data){
    const legend = []
    const series=[]
    var res = data.ds1

    for(var index in res) {
      var item = res[index]
      var nameVal=item[params.legendCol.colId]
      if(legend.indexOf(nameVal)<0){
          legend.push(nameVal)
      }
      if(params.measureCols.length>0){
          var val=item[params.measureCols[params.measureCols.length-1].colId]
          series.push({ value: val, name: nameVal})
      }
  }
  console.log('legend',legend,'series',series);
  

    return {
      legend: {
        data: legend
      },
      series: series
    }
  }
}
export default config;
