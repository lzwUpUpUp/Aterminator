/**
* 配置
* Author: dong xing
* Date: 2020/3/26
* Time: 13:58
* Email: dong.xing@outlook.com
*/
import uuid from 'uuid/v4'
import Factory from '../factory/factory'
import CommonConfig from './commonConfig'
import DataConfig from './dataConfig'

// 图表专有属性工厂
const chartProprietaryConfigFactory = Factory.createChartProprietaryConfigFactory()

// 元素专有属性工厂
const elementProprietaryConfigFactory = Factory.createElementProprietaryConfigFactory()

export default class Config {
  constructor ({
    category, type, commonConfig, proprietaryConfig, dataConfig,widgetName
  }) {
    this.category = category
    this.type = type
    this.commonConfig = new CommonConfig(commonConfig || {})
    this.proprietaryConfig = this.getProprietaryConfigFactory(category).create({
      type,
      proprietaryConfig
    })
    this.dataConfig = new DataConfig({
      widgetType: type,
      ...dataConfig
    })
    this.widgetName = type+"-"+uuid()
  }

  /**
   * 根据分类获取其特配置工厂函数
   * @param category
   * @returns {*}
   */
  getProprietaryConfigFactory (category) {
    return category === 'ELEMENT' ? elementProprietaryConfigFactory : chartProprietaryConfigFactory
  }
}
