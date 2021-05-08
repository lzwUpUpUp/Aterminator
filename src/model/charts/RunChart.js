import Chart from './index'

export default class RunChart extends Chart {
  constructor({ widget }) {
    super({ widget })
  }

  mappingOption({ commonConfig, proprietaryConfig, dataConfig }) {
    const { grid } = commonConfig.getOption()
    const {
      legend,
      itemStyle: { color, ...otherItemStyle }, ...otherConfig
    } = proprietaryConfig.getOption()
    const { sourceType, staticDataConfig: { staticData } } = dataConfig
    let series = []

    // 总体配置
    const option = { color, grid, legend, series }

    var space = staticData.series[0].value/6
     
    var firstR = 15
    const pie = {
      type: 'pie',
      itemStyle: otherItemStyle,
      radius: [firstR+'%', firstR+8+'%'],
      data:[],
      ...otherConfig
    }   

  
    function getRadius(item) {
      firstR+=15 
      pie.radius = [firstR+'%', firstR+8+'%'];
      var obj = {value:item.value,name:item.name};
      pie.data=[]
      var obj2 = { value: space, name: '' ,itemStyle:{normal: {color: 'rgba(0,0,0,0)'}}}
      pie.data.push(obj,obj2)
    }


    if (sourceType === 'static' || sourceType === 'real') {
      series = staticData.series.map((item) => {
        getRadius(item)
        Object.assign(item, pie)
        return item
      })
      const { legend: staticLegend } = staticData
      Object.assign(option, {
        legend: Object.assign(legend, staticLegend),
        series
      })
      
    }
    // console.log('option', JSON.stringify(option));

    return option
  }
}
