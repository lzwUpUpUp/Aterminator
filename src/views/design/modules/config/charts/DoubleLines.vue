/**
* 折线图配置
* Author: dong xing
* Date: 2019/11/13
* Time: 1:47 下午
* Email: dong.xing@outlook.com
*/
<template>
  <div class="double-lines-config">
    <a-tabs
      defaultActiveKey="1"
      tabPosition="top"
      :style="{ height: '100%'}"
    >
      <a-tab-pane tab="公共属性" key="1">

        <!-- S 公共配置模板 -->
        <CommonTemplate />
        <!-- E 公共配置模板 -->

      </a-tab-pane>

      <a-tab-pane tab="专有属性" key="2">

        <!-- S 专有配置模板 -->
        <ChartProprietaryTemplate show-x-axis >
          <template v-slot:header>

            <!-- S 折线图专有配置 -->
            <a-collapse defaultActiveKey="1" :bordered="false">

              <a-collapse-panel header="折线" key="1" class="visible-collapse-panel">

                <div class="comment-template__item">
                  <p class="comment-template__leading">类型:</p>
                  <div class="comment-template__inner">
                    <a-select
                      v-model="config.proprietaryConfig.lineStyle.type"
                      @change="change">
                      <a-select-option value="solid">直线</a-select-option>
                      <a-select-option value="dashed">虚线</a-select-option>
                      <a-select-option value="dotted">点线</a-select-option>
                    </a-select>
                  </div>
                </div>
                <!-- / 类型 -->

                <div class="comment-template__item">
                  <p class="comment-template__leading">平滑:</p>
                  <div class="comment-template__inner comment-template__end">
                    <a-switch
                      checkedChildren="平滑"
                      unCheckedChildren="正常"
                      v-model="config.proprietaryConfig.smooth"
                      @change="change" />
                  </div>
                </div>
                <!-- / 平滑 -->

                <div class="comment-template__item">
                  <p class="comment-template__leading">粗细:</p>
                  <div class="comment-template__inner">
                    <a-slider
                      v-model="config.proprietaryConfig.lineStyle.width"
                      @change="change"
                      :min="1"
                      :max="10" />
                  </div>
                </div>
                <!-- / 粗细 -->

                <div class="comment-template__item">
                  <p class="comment-template__leading">颜色:</p>
                  <div class="comment-template__inner">
                    <ColorPicker
                      v-model="config.proprietaryConfig.lineStyle.color"
                      @change="change"/>
                  </div>
                </div>
                <!-- / 颜色 -->

              </a-collapse-panel>
              <!-- / 折线 -->

              <a-collapse-panel header="拐点" key="2" class="visible-collapse-panel">

                <div class="comment-template__item">
                  <p class="comment-template__leading">显示:</p>
                  <div class="comment-template__inner comment-template__end">
                    <a-switch
                      checkedChildren="显示"
                      unCheckedChildren="不显示"
                      v-model="config.proprietaryConfig.showSymbol"
                      @change="change" />
                  </div>
                </div>
                <!-- / 显示 -->

                <div v-if="config.proprietaryConfig.showSymbol">

                  <div class="comment-template__item">
                    <p class="comment-template__leading">形状:</p>
                    <div class="comment-template__inner">
                      <a-select
                        v-model="config.proprietaryConfig.symbol"
                        @change="change">
                        <a-select-option value="none">无</a-select-option>
                        <a-select-option value="emptyCircle">空心圆形</a-select-option>
                        <a-select-option value="circle">圆形</a-select-option>
                        <a-select-option value="rect">矩形</a-select-option>
                        <a-select-option value="roundRect">圆角矩形</a-select-option>
                        <a-select-option value="triangle">三角形</a-select-option>
                        <a-select-option value="diamond">菱形</a-select-option>
                        <a-select-option value="pin">气泡</a-select-option>
                        <a-select-option value="arrow">箭头</a-select-option>
                      </a-select>
                    </div>
                  </div>
                  <!-- / 形状 -->

                  <div class="comment-template__item">
                    <p class="comment-template__leading">大小:</p>
                    <div class="comment-template__inner">
                      <a-slider
                        v-model="config.proprietaryConfig.symbolSize"
                        @change="change"
                        :min="0"
                        :max="16" />
                    </div>
                  </div>
                  <!-- / 大小 -->

                  <div class="comment-template__item">
                    <p class="comment-template__leading">旋转角度:</p>
                    <div class="comment-template__inner">
                      <a-slider
                        v-model="config.proprietaryConfig.symbolRotate"
                        @change="change"
                        :min="-90"
                        :max="90" />
                    </div>
                  </div>
                  <!-- / 旋转角度 -->

                  <div class="comment-template__item">
                    <p class="comment-template__leading">拐点颜色:</p>
                    <div class="comment-template__inner">
                      <ColorPicker
                        v-model="config.proprietaryConfig.itemStyle.color"
                        @change="change"/>
                    </div>
                  </div>
                  <!-- / 拐点颜色 -->

                  <div class="comment-template__item">
                    <p class="comment-template__leading">描边颜色:</p>
                    <div class="comment-template__inner">
                      <ColorPicker
                        v-model="config.proprietaryConfig.itemStyle.borderColor"
                        @change="change"/>
                    </div>
                  </div>
                  <!-- / 描边颜色 -->

                  <div class="comment-template__item">
                    <p class="comment-template__leading">描边宽度:</p>
                    <div class="comment-template__inner">
                      <a-slider
                        v-model="config.proprietaryConfig.itemStyle.borderWidth"
                        @change="change"
                        :min="0"
                        :max="10" />
                    </div>
                  </div>
                  <!-- / 描边宽度 -->

                  <div class="comment-template__item">
                    <p class="comment-template__leading">描边类型:</p>
                    <div class="comment-template__inner comment-template__end">
                      <a-radio-group
                        buttonStyle="solid"
                        v-model="config.proprietaryConfig.itemStyle.borderType"
                        @change="change">
                        <a-radio-button value="solid">直线</a-radio-button>
                        <a-radio-button value="dashed">虚线</a-radio-button>
                        <a-radio-button value="dotted">点线</a-radio-button>
                      </a-radio-group>
                    </div>
                  </div>
                  <!-- / 描边类型 -->
                </div>

              </a-collapse-panel>
              <!-- / 拐点标志 -->

              <a-collapse-panel header="填充样式" key="3" class="visible-collapse-panel">

                <div class="comment-template__item">
                  <p class="comment-template__leading">显示:</p>
                  <div class="comment-template__inner comment-template__end">
                    <a-switch
                      checkedChildren="显示"
                      unCheckedChildren="不显示"
                      v-model="config.proprietaryConfig.areaStyle.show"
                      @change="areaStyleChange(config)" />
                  </div>
                </div>
                <!-- / 显示 -->

                <div v-if="config.proprietaryConfig.areaStyle.show">

                  <div class="comment-template__item">
                    <p class="comment-template__leading">颜色类型:</p>
                    <div class="comment-template__inner comment-template__end">
                      <a-radio-group
                        buttonStyle="solid"
                        v-model="config.proprietaryConfig.areaStyle.colorType"
                        @change="areaStyleChange(config)">
                        <a-radio-button value="single">单一</a-radio-button>
                        <a-radio-button value="linear">线性</a-radio-button>
                      </a-radio-group>
                    </div>
                  </div>
                  <!-- / 颜色类型 -->

                  <div class="comment-template__item" v-if="config.proprietaryConfig.areaStyle.colorType === 'single'">
                    <div class="comment-template__inner">
                      <ColorPicker
                        v-model="config.proprietaryConfig.areaStyle.color"
                        @change="singleColorChange(config)"/>
                    </div>
                  </div>
                  <!-- / 单一区域颜色 -->

                  <div class="comment-template__item" v-if="config.proprietaryConfig.areaStyle.colorType === 'linear'">
                    <div class="comment-template__inner">
                      <LinearColorPicker
                        v-model="config.proprietaryConfig.areaStyle.color"
                        @change="linearColorChange(config)" />
                    </div>
                  </div>
                  <!-- / 渐变区域颜色 -->

                </div>

              </a-collapse-panel>
              <!-- / 填充样式 -->

              <a-collapse-panel header="Y1坐标轴" key="4" class="visible-collapse-panel">

                <div class="comment-template__item">
                  <p class="comment-template__leading">显示:</p>
                  <div class="comment-template__inner comment-template__end">
                    <a-switch
                      checkedChildren="显示"
                      unCheckedChildren="不显示"
                      v-model="config.proprietaryConfig.y1Axis.show"
                      @change="change" />
                  </div>
                </div>
                <!-- / 显示 -->

                <div v-if="config.proprietaryConfig.y1Axis.show">
                  <div class="comment-template__item">
                    <p class="comment-template__leading">位置:</p>
                    <div class="comment-template__inner comment-template__end">
                      <a-radio-group
                        buttonStyle="solid"
                        v-model="config.proprietaryConfig.y1Axis.position"
                        @change="change">
                        <a-radio-button value="left">居左</a-radio-button>
                        <a-radio-button value="right">居右</a-radio-button>
                      </a-radio-group>
                    </div>
                  </div>
                  <!-- / 位置 -->

                  <div class="comment-template__item">
                    <p class="comment-template__leading">数据类型:</p>
                    <div class="comment-template__inner comment-template__end">
                      <a-radio-group
                        buttonStyle="solid"
                        v-model="config.proprietaryConfig.y1Axis.type"
                        @change="change">
                        <a-radio-button value="category">类别</a-radio-button>
                        <a-radio-button value="value">数值</a-radio-button>
                        <a-radio-button value="time">时间</a-radio-button>
                      </a-radio-group>
                    </div>
                  </div>
                  <!-- / 数据类型 -->

                  <div class="comment-template__item">
                    <p class="comment-template__leading">名称:</p>
                    <div class="comment-template__inner">
                      <a-input
                        type="text"
                        @change="change"
                        v-model="config.proprietaryConfig.y1Axis.name" />
                    </div>
                  </div>
                  <!-- / 名称 -->

                  <div class="comment-template__item">
                    <p class="comment-template__leading">名称位置:</p>
                    <div class="comment-template__inner comment-template__end">
                      <a-select
                        v-model="config.proprietaryConfig.y1Axis.nameLocation"
                        @change="change">
                        <a-select-option value="end">上</a-select-option>
                        <a-select-option value="center">中</a-select-option>
                        <a-select-option value="start">下</a-select-option>
                      </a-select>
                    </div>
                  </div>
                  <!-- / 名称位置 -->

                  <div class="comment-template__item">
                    <p class="comment-template__leading">名称颜色:</p>
                    <div class="comment-template__inner comment-template__end">
                      <ColorPicker
                        v-model="config.proprietaryConfig.y1Axis.nameTextStyle.color"
                        @change="change()"/>
                    </div>
                  </div>
                  <!-- / 名称颜色 -->

                  <div class="comment-template__item">
                    <p class="comment-template__leading">名称大小:</p>
                    <div class="comment-template__inner">
                      <a-input
                        type="number"
                        @change="change"
                        v-model.number="config.proprietaryConfig.y1Axis.nameTextStyle.fontSize" />
                    </div>
                  </div>
                  <!-- / 名称大小 -->

                  <div class="comment-template__item">
                    <p class="comment-template__leading">名称粗细:</p>
                    <div class="comment-template__inner comment-template__end">
                      <a-select
                        v-model="config.proprietaryConfig.y1Axis.nameTextStyle.fontWeight"
                        @change="change">
                        <a-select-option value="normal">正常</a-select-option>
                        <a-select-option value="lighter">细</a-select-option>
                        <a-select-option value="bold">粗</a-select-option>
                        <a-select-option value="bolder">更粗</a-select-option>
                      </a-select>
                    </div>
                  </div>
                  <!-- / 名称粗细 -->

                  <div class="comment-template__item">
                    <p class="comment-template__leading">名称风格:</p>
                    <div class="comment-template__inner comment-template__end">
                      <a-select
                        v-model="config.proprietaryConfig.y1Axis.nameTextStyle.fontStyle"
                        @change="change">
                        <a-select-option value="normal">正常</a-select-option>
                        <a-select-option value="italic">斜体</a-select-option>
                      </a-select>
                    </div>
                  </div>
                  <!-- / 名称风格 -->

                  <div class="comment-template__item">
                    <p class="comment-template__leading">间距:</p>
                    <div class="comment-template__inner">
                      <a-input
                        type="number"
                        @change="change"
                        v-model.number="config.proprietaryConfig.y1Axis.nameGap" />
                    </div>
                  </div>
                  <!-- / 间距 -->

                  <div class="comment-template__item">
                    <p class="comment-template__leading">坐标轴线:</p>
                    <div class="comment-template__inner comment-template__end">
                      <a-switch
                        checkedChildren="显示"
                        unCheckedChildren="不显示"
                        v-model="config.proprietaryConfig.y1Axis.axisLine.show"
                        @change="change" />
                    </div>
                  </div>
                  <!-- / 坐标轴线 -->

                  <div v-if="config.proprietaryConfig.y1Axis.axisLine.show">
                    <div class="comment-template__item">
                      <p class="comment-template__leading">轴线颜色:</p>
                      <div class="comment-template__inner comment-template__end">
                        <ColorPicker
                          v-model="config.proprietaryConfig.y1Axis.axisLine.lineStyle.color"
                          @change="change()"/>
                      </div>
                    </div>
                    <!-- / 轴线颜色 -->

                    <div class="comment-template__item">
                      <p class="comment-template__leading">轴线宽度:</p>
                      <div class="comment-template__inner">
                        <a-slider
                          :min="0"
                          :max="16"
                          @change="change"
                          v-model.number="config.proprietaryConfig.y1Axis.axisLine.lineStyle.width" />
                      </div>
                    </div>
                    <!-- / 轴线宽度 -->

                    <div class="comment-template__item">
                      <p class="comment-template__leading">轴线类型:</p>
                      <div class="comment-template__inner comment-template__end">
                        <a-select
                          v-model="config.proprietaryConfig.y1Axis.axisLine.lineStyle.type"
                          @change="change">
                          <a-select-option value="solid">直线</a-select-option>
                          <a-select-option value="dashed">虚线</a-select-option>
                          <a-select-option value="dotted">点线</a-select-option>
                        </a-select>
                      </div>
                    </div>
                    <!-- / 轴线类型 -->

                  </div>
                  <!-- / 坐标轴线设置 -->

                  <div class="comment-template__item">
                    <p class="comment-template__leading">坐标刻度:</p>
                    <div class="comment-template__inner comment-template__end">
                      <a-switch
                        checkedChildren="显示"
                        unCheckedChildren="不显示"
                        v-model="config.proprietaryConfig.y1Axis.axisTick.show"
                        @change="change" />
                    </div>
                  </div>
                  <!-- / 坐标刻度 -->

                  <div v-if="config.proprietaryConfig.y1Axis.axisTick.show">
                    <div class="comment-template__item">
                      <p class="comment-template__leading">刻度颜色:</p>
                      <div class="comment-template__inner comment-template__end">
                        <ColorPicker
                          v-model="config.proprietaryConfig.y1Axis.axisTick.lineStyle.color"
                          @change="change()"/>
                      </div>
                    </div>
                    <!-- / 刻度颜色 -->

                    <div class="comment-template__item">
                      <p class="comment-template__leading">刻度长度:</p>
                      <div class="comment-template__inner">
                        <a-slider
                          :min="0"
                          :max="16"
                          @change="change"
                          v-model.number="config.proprietaryConfig.y1Axis.axisTick.length" />
                      </div>
                    </div>
                    <!-- / 刻度长度 -->

                    <div class="comment-template__item">
                      <p class="comment-template__leading">刻度宽度:</p>
                      <div class="comment-template__inner">
                        <a-slider
                          :min="0"
                          :max="16"
                          @change="change"
                          v-model.number="config.proprietaryConfig.y1Axis.axisTick.lineStyle.width" />
                      </div>
                    </div>
                    <!-- / 刻度长度 -->

                    <div class="comment-template__item">
                      <p class="comment-template__leading">刻度类型:</p>
                      <div class="comment-template__inner comment-template__end">
                        <a-select
                          v-model="config.proprietaryConfig.y1Axis.axisTick.lineStyle.type"
                          @change="change">
                          <a-select-option value="solid">直线</a-select-option>
                          <a-select-option value="dashed">虚线</a-select-option>
                          <a-select-option value="dotted">点线</a-select-option>
                        </a-select>
                      </div>
                    </div>
                    <!-- / 轴线类型 -->

                  </div>
                  <!-- / 坐标刻度设置 -->

                  <div class="comment-template__item">
                    <p class="comment-template__leading">坐标标签:</p>
                    <div class="comment-template__inner comment-template__end">
                      <a-switch
                        checkedChildren="显示"
                        unCheckedChildren="不显示"
                        v-model="config.proprietaryConfig.y1Axis.axisLabel.show"
                        @change="change" />
                    </div>
                  </div>
                  <!-- / 坐标标签 -->

                  <div v-if="config.proprietaryConfig.y1Axis.axisLabel.show">
                    <div class="comment-template__item">
                      <p class="comment-template__leading">标签角度:</p>
                      <div class="comment-template__inner">
                        <a-slider
                          :min="-90"
                          :max="90"
                          @change="change"
                          v-model="config.proprietaryConfig.y1Axis.axisLabel.rotate" />
                      </div>
                    </div>
                    <!-- / 标签角度 -->

                    <div class="comment-template__item">
                      <p class="comment-template__leading">标签间距:</p>
                      <div class="comment-template__inner">
                        <a-input
                          type="number"
                          @change="change"
                          v-model.number="config.proprietaryConfig.y1Axis.axisLabel.margin" />
                      </div>
                    </div>
                    <!-- / 标签间距 -->

                    <div class="comment-template__item">
                      <p class="comment-template__leading">标签颜色:</p>
                      <div class="comment-template__inner comment-template__end">
                        <ColorPicker
                          v-model="config.proprietaryConfig.y1Axis.axisLabel.color"
                          @change="change()"/>
                      </div>
                    </div>
                    <!-- / 标签颜色 -->

                    <div class="comment-template__item">
                      <p class="comment-template__leading">标签大小:</p>
                      <div class="comment-template__inner">
                        <a-slider
                          :min="6"
                          :max="32"
                          @change="change"
                          v-model="config.proprietaryConfig.y1Axis.axisLabel.fontSize" />
                      </div>
                    </div>
                    <!-- / 标签大小 -->

                    <div class="comment-template__item">
                      <p class="comment-template__leading">标签粗细:</p>
                      <div class="comment-template__inner comment-template__end">
                        <a-select
                          v-model="config.proprietaryConfig.y1Axis.axisLabel.fontWeight"
                          @change="change">
                          <a-select-option value="normal">正常</a-select-option>
                          <a-select-option value="lighter">细</a-select-option>
                          <a-select-option value="bold">粗</a-select-option>
                          <a-select-option value="bolder">更粗</a-select-option>
                        </a-select>
                      </div>
                    </div>
                    <!-- / 标签粗细 -->

                    <div class="comment-template__item">
                      <p class="comment-template__leading">标签风格:</p>
                      <div class="comment-template__inner comment-template__end">
                        <a-select
                          v-model="config.proprietaryConfig.y1Axis.axisLabel.fontStyle"
                          @change="change">
                          <a-select-option value="normal">正常</a-select-option>
                          <a-select-option value="italic">斜体</a-select-option>
                        </a-select>
                      </div>
                    </div>
                    <!-- / 标签风格 -->

                  </div>
                  <!-- / 坐标刻度设置 -->

                  <div class="comment-template__item">
                    <p class="comment-template__leading">分隔线:</p>
                    <div class="comment-template__inner comment-template__end">
                      <a-switch
                        checkedChildren="显示"
                        unCheckedChildren="不显示"
                        v-model="config.proprietaryConfig.y1Axis.splitLine.show"
                        @change="change" />
                    </div>
                  </div>
                  <!-- / 分隔线 -->

                  <div v-if="config.proprietaryConfig.y1Axis.splitLine.show">
                    <div class="comment-template__item">
                      <p class="comment-template__leading">隔线颜色:</p>
                      <div class="comment-template__inner comment-template__end">
                        <ColorPicker
                          v-model="config.proprietaryConfig.y1Axis.splitLine.lineStyle.color"
                          @change="change()"/>
                      </div>
                    </div>
                    <!-- / 隔线颜色 -->

                    <div class="comment-template__item">
                      <p class="comment-template__leading">隔线宽度:</p>
                      <div class="comment-template__inner">
                        <a-input
                          type="number"
                          @change="change"
                          v-model.number="config.proprietaryConfig.y1Axis.splitLine.lineStyle.width" />
                      </div>
                    </div>
                    <!-- / 隔线宽度 -->

                    <div class="comment-template__item">
                      <p class="comment-template__leading">隔线类型:</p>
                      <div class="comment-template__inner comment-template__end">
                        <a-select
                          v-model="config.proprietaryConfig.y1Axis.splitLine.lineStyle.type"
                          @change="change">
                          <a-select-option value="solid">直线</a-select-option>
                          <a-select-option value="dashed">虚线</a-select-option>
                          <a-select-option value="dotted">点线</a-select-option>
                        </a-select>
                      </div>
                    </div>
                    <!-- / 轴线类型 -->

                  </div>
                  <!-- / 分隔线设置 -->

                </div>

              </a-collapse-panel>

              <a-collapse-panel header="Y2坐标轴" key="5" class="visible-collapse-panel">

                <div class="comment-template__item">
                  <p class="comment-template__leading">显示:</p>
                  <div class="comment-template__inner comment-template__end">
                    <a-switch
                      checkedChildren="显示"
                      unCheckedChildren="不显示"
                      v-model="config.proprietaryConfig.y2Axis.show"
                      @change="change" />
                  </div>
                </div>
                <!-- / 显示 -->

                <div v-if="config.proprietaryConfig.y2Axis.show">
                  <div class="comment-template__item">
                    <p class="comment-template__leading">位置:</p>
                    <div class="comment-template__inner comment-template__end">
                      <a-radio-group
                        buttonStyle="solid"
                        v-model="config.proprietaryConfig.y2Axis.position"
                        @change="change">
                        <a-radio-button value="left">居左</a-radio-button>
                        <a-radio-button value="right">居右</a-radio-button>
                      </a-radio-group>
                    </div>
                  </div>
                  <!-- / 位置 -->

                  <div class="comment-template__item">
                    <p class="comment-template__leading">数据类型:</p>
                    <div class="comment-template__inner comment-template__end">
                      <a-radio-group
                        buttonStyle="solid"
                        v-model="config.proprietaryConfig.y2Axis.type"
                        @change="change">
                        <a-radio-button value="category">类别</a-radio-button>
                        <a-radio-button value="value">数值</a-radio-button>
                        <a-radio-button value="time">时间</a-radio-button>
                      </a-radio-group>
                    </div>
                  </div>
                  <!-- / 数据类型 -->

                  <div class="comment-template__item">
                    <p class="comment-template__leading">名称:</p>
                    <div class="comment-template__inner">
                      <a-input
                        type="text"
                        @change="change"
                        v-model="config.proprietaryConfig.y2Axis.name" />
                    </div>
                  </div>
                  <!-- / 名称 -->

                  <div class="comment-template__item">
                    <p class="comment-template__leading">名称位置:</p>
                    <div class="comment-template__inner comment-template__end">
                      <a-select
                        v-model="config.proprietaryConfig.y2Axis.nameLocation"
                        @change="change">
                        <a-select-option value="end">上</a-select-option>
                        <a-select-option value="center">中</a-select-option>
                        <a-select-option value="start">下</a-select-option>
                      </a-select>
                    </div>
                  </div>
                  <!-- / 名称位置 -->

                  <div class="comment-template__item">
                    <p class="comment-template__leading">名称颜色:</p>
                    <div class="comment-template__inner comment-template__end">
                      <ColorPicker
                        v-model="config.proprietaryConfig.y2Axis.nameTextStyle.color"
                        @change="change()"/>
                    </div>
                  </div>
                  <!-- / 名称颜色 -->

                  <div class="comment-template__item">
                    <p class="comment-template__leading">名称大小:</p>
                    <div class="comment-template__inner">
                      <a-input
                        type="number"
                        @change="change"
                        v-model.number="config.proprietaryConfig.y2Axis.nameTextStyle.fontSize" />
                    </div>
                  </div>
                  <!-- / 名称大小 -->

                  <div class="comment-template__item">
                    <p class="comment-template__leading">名称粗细:</p>
                    <div class="comment-template__inner comment-template__end">
                      <a-select
                        v-model="config.proprietaryConfig.y2Axis.nameTextStyle.fontWeight"
                        @change="change">
                        <a-select-option value="normal">正常</a-select-option>
                        <a-select-option value="lighter">细</a-select-option>
                        <a-select-option value="bold">粗</a-select-option>
                        <a-select-option value="bolder">更粗</a-select-option>
                      </a-select>
                    </div>
                  </div>
                  <!-- / 名称粗细 -->

                  <div class="comment-template__item">
                    <p class="comment-template__leading">名称风格:</p>
                    <div class="comment-template__inner comment-template__end">
                      <a-select
                        v-model="config.proprietaryConfig.y2Axis.nameTextStyle.fontStyle"
                        @change="change">
                        <a-select-option value="normal">正常</a-select-option>
                        <a-select-option value="italic">斜体</a-select-option>
                      </a-select>
                    </div>
                  </div>
                  <!-- / 名称风格 -->

                  <div class="comment-template__item">
                    <p class="comment-template__leading">间距:</p>
                    <div class="comment-template__inner">
                      <a-input
                        type="number"
                        @change="change"
                        v-model.number="config.proprietaryConfig.y2Axis.nameGap" />
                    </div>
                  </div>
                  <!-- / 间距 -->

                  <div class="comment-template__item">
                    <p class="comment-template__leading">坐标轴线:</p>
                    <div class="comment-template__inner comment-template__end">
                      <a-switch
                        checkedChildren="显示"
                        unCheckedChildren="不显示"
                        v-model="config.proprietaryConfig.y2Axis.axisLine.show"
                        @change="change" />
                    </div>
                  </div>
                  <!-- / 坐标轴线 -->

                  <div v-if="config.proprietaryConfig.y2Axis.axisLine.show">
                    <div class="comment-template__item">
                      <p class="comment-template__leading">轴线颜色:</p>
                      <div class="comment-template__inner comment-template__end">
                        <ColorPicker
                          v-model="config.proprietaryConfig.y2Axis.axisLine.lineStyle.color"
                          @change="change()"/>
                      </div>
                    </div>
                    <!-- / 轴线颜色 -->

                    <div class="comment-template__item">
                      <p class="comment-template__leading">轴线宽度:</p>
                      <div class="comment-template__inner">
                        <a-slider
                          :min="0"
                          :max="16"
                          @change="change"
                          v-model.number="config.proprietaryConfig.y2Axis.axisLine.lineStyle.width" />
                      </div>
                    </div>
                    <!-- / 轴线宽度 -->

                    <div class="comment-template__item">
                      <p class="comment-template__leading">轴线类型:</p>
                      <div class="comment-template__inner comment-template__end">
                        <a-select
                          v-model="config.proprietaryConfig.y2Axis.axisLine.lineStyle.type"
                          @change="change">
                          <a-select-option value="solid">直线</a-select-option>
                          <a-select-option value="dashed">虚线</a-select-option>
                          <a-select-option value="dotted">点线</a-select-option>
                        </a-select>
                      </div>
                    </div>
                    <!-- / 轴线类型 -->

                  </div>
                  <!-- / 坐标轴线设置 -->

                  <div class="comment-template__item">
                    <p class="comment-template__leading">坐标刻度:</p>
                    <div class="comment-template__inner comment-template__end">
                      <a-switch
                        checkedChildren="显示"
                        unCheckedChildren="不显示"
                        v-model="config.proprietaryConfig.y2Axis.axisTick.show"
                        @change="change" />
                    </div>
                  </div>
                  <!-- / 坐标刻度 -->

                  <div v-if="config.proprietaryConfig.y2Axis.axisTick.show">
                    <div class="comment-template__item">
                      <p class="comment-template__leading">刻度颜色:</p>
                      <div class="comment-template__inner comment-template__end">
                        <ColorPicker
                          v-model="config.proprietaryConfig.y2Axis.axisTick.lineStyle.color"
                          @change="change()"/>
                      </div>
                    </div>
                    <!-- / 刻度颜色 -->

                    <div class="comment-template__item">
                      <p class="comment-template__leading">刻度长度:</p>
                      <div class="comment-template__inner">
                        <a-slider
                          :min="0"
                          :max="16"
                          @change="change"
                          v-model.number="config.proprietaryConfig.y2Axis.axisTick.length" />
                      </div>
                    </div>
                    <!-- / 刻度长度 -->

                    <div class="comment-template__item">
                      <p class="comment-template__leading">刻度宽度:</p>
                      <div class="comment-template__inner">
                        <a-slider
                          :min="0"
                          :max="16"
                          @change="change"
                          v-model.number="config.proprietaryConfig.y2Axis.axisTick.lineStyle.width" />
                      </div>
                    </div>
                    <!-- / 刻度长度 -->

                    <div class="comment-template__item">
                      <p class="comment-template__leading">刻度类型:</p>
                      <div class="comment-template__inner comment-template__end">
                        <a-select
                          v-model="config.proprietaryConfig.y2Axis.axisTick.lineStyle.type"
                          @change="change">
                          <a-select-option value="solid">直线</a-select-option>
                          <a-select-option value="dashed">虚线</a-select-option>
                          <a-select-option value="dotted">点线</a-select-option>
                        </a-select>
                      </div>
                    </div>
                    <!-- / 轴线类型 -->

                  </div>
                  <!-- / 坐标刻度设置 -->

                  <div class="comment-template__item">
                    <p class="comment-template__leading">坐标标签:</p>
                    <div class="comment-template__inner comment-template__end">
                      <a-switch
                        checkedChildren="显示"
                        unCheckedChildren="不显示"
                        v-model="config.proprietaryConfig.y2Axis.axisLabel.show"
                        @change="change" />
                    </div>
                  </div>
                  <!-- / 坐标标签 -->

                  <div v-if="config.proprietaryConfig.y2Axis.axisLabel.show">
                    <div class="comment-template__item">
                      <p class="comment-template__leading">标签角度:</p>
                      <div class="comment-template__inner">
                        <a-slider
                          :min="-90"
                          :max="90"
                          @change="change"
                          v-model="config.proprietaryConfig.y2Axis.axisLabel.rotate" />
                      </div>
                    </div>
                    <!-- / 标签角度 -->

                    <div class="comment-template__item">
                      <p class="comment-template__leading">标签间距:</p>
                      <div class="comment-template__inner">
                        <a-input
                          type="number"
                          @change="change"
                          v-model.number="config.proprietaryConfig.y2Axis.axisLabel.margin" />
                      </div>
                    </div>
                    <!-- / 标签间距 -->

                    <div class="comment-template__item">
                      <p class="comment-template__leading">标签颜色:</p>
                      <div class="comment-template__inner comment-template__end">
                        <ColorPicker
                          v-model="config.proprietaryConfig.y2Axis.axisLabel.color"
                          @change="change()"/>
                      </div>
                    </div>
                    <!-- / 标签颜色 -->

                    <div class="comment-template__item">
                      <p class="comment-template__leading">标签大小:</p>
                      <div class="comment-template__inner">
                        <a-slider
                          :min="6"
                          :max="32"
                          @change="change"
                          v-model="config.proprietaryConfig.y2Axis.axisLabel.fontSize" />
                      </div>
                    </div>
                    <!-- / 标签大小 -->

                    <div class="comment-template__item">
                      <p class="comment-template__leading">标签粗细:</p>
                      <div class="comment-template__inner comment-template__end">
                        <a-select
                          v-model="config.proprietaryConfig.y2Axis.axisLabel.fontWeight"
                          @change="change">
                          <a-select-option value="normal">正常</a-select-option>
                          <a-select-option value="lighter">细</a-select-option>
                          <a-select-option value="bold">粗</a-select-option>
                          <a-select-option value="bolder">更粗</a-select-option>
                        </a-select>
                      </div>
                    </div>
                    <!-- / 标签粗细 -->

                    <div class="comment-template__item">
                      <p class="comment-template__leading">标签风格:</p>
                      <div class="comment-template__inner comment-template__end">
                        <a-select
                          v-model="config.proprietaryConfig.y2Axis.axisLabel.fontStyle"
                          @change="change">
                          <a-select-option value="normal">正常</a-select-option>
                          <a-select-option value="italic">斜体</a-select-option>
                        </a-select>
                      </div>
                    </div>
                    <!-- / 标签风格 -->

                  </div>
                  <!-- / 坐标刻度设置 -->

                  <div class="comment-template__item">
                    <p class="comment-template__leading">分隔线:</p>
                    <div class="comment-template__inner comment-template__end">
                      <a-switch
                        checkedChildren="显示"
                        unCheckedChildren="不显示"
                        v-model="config.proprietaryConfig.y2Axis.splitLine.show"
                        @change="change" />
                    </div>
                  </div>
                  <!-- / 分隔线 -->

                  <div v-if="config.proprietaryConfig.y2Axis.splitLine.show">
                    <div class="comment-template__item">
                      <p class="comment-template__leading">隔线颜色:</p>
                      <div class="comment-template__inner comment-template__end">
                        <ColorPicker
                          v-model="config.proprietaryConfig.y2Axis.splitLine.lineStyle.color"
                          @change="change()"/>
                      </div>
                    </div>
                    <!-- / 隔线颜色 -->

                    <div class="comment-template__item">
                      <p class="comment-template__leading">隔线宽度:</p>
                      <div class="comment-template__inner">
                        <a-input
                          type="number"
                          @change="change"
                          v-model.number="config.proprietaryConfig.y2Axis.splitLine.lineStyle.width" />
                      </div>
                    </div>
                    <!-- / 隔线宽度 -->

                    <div class="comment-template__item">
                      <p class="comment-template__leading">隔线类型:</p>
                      <div class="comment-template__inner comment-template__end">
                        <a-select
                          v-model="config.proprietaryConfig.y2Axis.splitLine.lineStyle.type"
                          @change="change">
                          <a-select-option value="solid">直线</a-select-option>
                          <a-select-option value="dashed">虚线</a-select-option>
                          <a-select-option value="dotted">点线</a-select-option>
                        </a-select>
                      </div>
                    </div>
                    <!-- / 轴线类型 -->

                  </div>
                  <!-- / 分隔线设置 -->

                </div>

              </a-collapse-panel>

            </a-collapse>
            <!-- E 折线图专有配置 -->

          </template>
        </ChartProprietaryTemplate>
        <!-- E 专有配置模板 -->

      </a-tab-pane>

      <a-tab-pane tab="数据配置" key="3">

        <!-- S 数据配置模板 -->
        <DataSourceTemplate />
        <!-- E 数据配置模板 -->

      </a-tab-pane>

       <a-tab-pane tab="图表配置" key="4">
        <!-- S 图表配置模板 -->
        <chartLinkpage />
        <!-- E 图表配置模板 -->
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import '@/assets/less/template.less'
import CommonTemplate from '../common/index.vue'
import ChartProprietaryTemplate from '../chartProprietary'
import chartLinkpage from '../chartLinkpage/chartLinkpage'
import ColorPicker from '@/components/ColorPicker'
import LinearColorPicker from '@/components/LinearColorPicker'
import DataSourceTemplate from '../dataSource'
import ProprietaryMixins from '../proprietaryMixins'

export default {
  name: 'Lines',
  mixins: [ProprietaryMixins],
  components: {
    CommonTemplate,
    ChartProprietaryTemplate,
    ColorPicker,
    DataSourceTemplate,
    LinearColorPicker,
    chartLinkpage
  },
  data: () => ({
    singleColor: 'rgba(7,171,253,1)',
    linearColor: {
      start: 'rgba(255,255,255,1)',
      end: 'rgba(0,0,0,1)'
    }
  }),
  methods: {
    /**
     * 单一颜色选择
     * @param config
     */
    singleColorChange (config) {
      this.singleColor = config.proprietaryConfig.areaStyle.color
      this.areaStyleChange(config)
    },
    /**
     * 渐变颜色选择
     * @param config
     */
    linearColorChange (config) {
      this.linearColor = config.proprietaryConfig.areaStyle.color
      this.areaStyleChange(config)
    },
    /**
     * 区域样式更改
     * @param config
     */
    areaStyleChange (config) {
      const color = config.proprietaryConfig.areaStyle.colorType === 'single'
        ? this.singleColor
        : this.linearColor
      Object.assign(config.proprietaryConfig.areaStyle, {
        color
      })
      this.change()
    }
  }
}
</script>

<style scoped>
</style>
