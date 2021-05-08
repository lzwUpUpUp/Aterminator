/**
* 数据配置
* Author: dong xing
* Date: 2019/11/20
* Time: 5:12 下午
* Email: dong.xing@outlook.com
*/
import Factory from '@/model/factory/factory'

const StaticDataConfigFactory = Factory.createStaticDataConfigFactory()
export default class DataConfig {
  constructor ({
    sourceType = 'null',
    widgetType,
    currentDsId,
    seriesItem={}, //选择项
    seriesName= [], //系列名数据
    seriesData= [], //系列值数据
    dataSetId,//选择实时数据的时候需保存下来的data id后传回给后台
    categoryCol, //分类参数
    legendCol, //系列名参数
    measureCols, //系列值参数
    legend2Col, //系列名2参数
    measureCols2, //系列值2参数
    topValue,
    staticDataConfig = {},
    dynamicDataConfig,
    // -------------图标联动配置参数--------
    myWidgetList=[], //联动的图表集合
    selectChartId,//已选中的图表
    selectWidgetList= [],//已选中的图表列
    linkedConfigVisible= false,
    linkPage= false,
    configList= [], //每一条编辑行的合集
    widgetsOption= [], //中间画板存在的chart
    columnList= [], //参数设置列
    chooseConfigIndex, //已选中的编辑行的index
    chooseConfigText,//确定配置后要显示的已选择的chart名称
    configValue, //联动图表配置弹窗输入的参数
    typeValue,//联动图表配置弹窗选择的是系列名还是分类，分类=name 系列名=seriesname
  }) {
    this.sourceType = sourceType
    this.currentDsId = currentDsId
    this.seriesItem = seriesItem //选择项 
    this.seriesName= seriesName //系列名数据
    this.seriesData= seriesData //系列值数据
    this.dataSetId = dataSetId
    this.categoryCol = categoryCol, //分类参数
    this.legendCol=  legendCol//系列名参数
    this.measureCols= measureCols, //系列值参数
    this.legend2Col=  legend2Col//系列名2参数
    this.measureCols2= measureCols2, //系列值2参数
    this.topValue= topValue, //系列值2参数
    this.staticDataConfig = StaticDataConfigFactory.create(widgetType, staticDataConfig)
    this.dynamicDataConfig = dynamicDataConfig
    // -----------图标联动配置参数----------
    this.myWidgetList = myWidgetList
    this.selectChartId = selectChartId,//已选中的图表
    this.selectWidgetList=selectWidgetList//已选中的图表列
    this.linkedConfigVisible = linkedConfigVisible,
    this.linkPage= linkPage,
    this.configList=configList, //每一条编辑行的合集
    this.widgetsOption = widgetsOption, //中间画板存在的chart
    this.columnList=columnList, //参数设置列
    this.chooseConfigIndex=chooseConfigIndex, //已选中的编辑行的index
    this.chooseConfigText = chooseConfigText//确定配置后要显示的已选择的chart名称
    this.configValue = configValue
    this.typeValue = typeValue
  }
}


