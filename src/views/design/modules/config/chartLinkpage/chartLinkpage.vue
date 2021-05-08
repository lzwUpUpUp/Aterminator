/**
* 图标专有配置模板
* Author: dong xing
* Date: 2019/11/25
* Time: 3:54 下午
* Email: dong.xing@outlook.com
*/
<template>
  <div>
    <!-- 系列值参数配置 -->

    <a-collapse v-model="activeKey" :bordered="false">
      <!-- 图表联动 -->
      <a-collapse-panel header="图表联动" key="12">
        <div class="comment-template__item">
          <p class="comment-template__leading">图表联动:</p>
          <div class="comment-template__inner">
            <!-- <a-button type="primary" @click="showLinkedConfig">配置</a-button> -->
            <a-switch @change="showIncreaseConfig" :checked="config.dataConfig.linkPage" />
            <a-modal
              title="图表联动配置"
              :visible="config.dataConfig.linkedConfigVisible"
              @cancel="closeLinkedConfig"
              @ok="configurationOk"
            >
              <div class="comment-template__item">
                <p class="comment-template__leading">联动图表:</p>
                <a-select
                  style="width: 220px"
                  @change="selectWidget"
                  v-model="config.dataConfig.selectChartId"
                >
                  <a-select-option
                    v-for="(item,index) in config.dataConfig.widgetsOption"
                    :key="index"
                    :value="item.id"
                    :text="item.name"
                  >{{item.name}}</a-select-option>
                </a-select>
              </div>
              <div class="comment-template__item">
                <p class="comment-template__leading">参数:</p>
                <!-- <div class="comment-template__inner">
                  <a-icon
                    type="plus-square"
                    style="cursor: pointer;font-size:20px;color:rgba(24, 144, 255, .8)"
                    title="点击添加"
                    @click="increaseColumn"
                  />
                </div>-->
              </div>

              <table style="width:100%" class="configTable">
                <tr class="configTableFirst">
                  <th>参数</th>
                  <th>值</th>
                  <th>操作</th>
                </tr>
                <tr>
                  <td>
                    <a-input style="width: 120px" v-model="config.dataConfig.configValue"></a-input>
                  </td>
                  <td>
                    <a-select
                      style="width: 180px"
                      default-value="series"
                      v-model="config.dataConfig.typeValue"
                    >
                      <a-select-option value="series" v-if="dataTypeCheck">系列名</a-select-option>
                      <a-select-option value="type" v-if="dataTypeCheck">分类</a-select-option>
                      <a-select-option value="type" v-if="!dataTypeCheck">系列名</a-select-option>
                    </a-select>
                  </td>
                  <!-- <td class="configDelete">delete</td> -->
                </tr>
                <tr v-for="(item,index) in config.dataConfig.columnList" :key="index">
                  <td>
                    <a-input style="width: 120px"></a-input>
                  </td>
                  <td></td>
                  <td class="configDelete">
                    <a-popconfirm
                      title="Sure to delete?"
                      @confirm="() => onDeleteColumn(index)"
                    >delete</a-popconfirm>
                  </td>
                </tr>
              </table>
            </a-modal>
          </div>
        </div>
        <div class="comment-template__item" v-show="config.dataConfig.linkPage">
          <p class="comment-template__leading">添加链接:</p>
          <div class="comment-template__inner">
            <a-icon
              type="plus-square"
              style="cursor: pointer;font-size:20px"
              title="点击添加"
              @click="increaseList"
            />
          </div>
        </div>
        <ul ref="linkList" class="linkList" v-show="config.dataConfig.linkPage">
          <li
            class="comment-template__item"
            v-for="(item,index) in config.dataConfig.configList"
            :key="index"
          >
            <a-input type="text" :value="item.configName" disabled />
            <div class="comment-template__inner">
              <a-icon
                type="form"
                style="cursor: pointer;font-size:18px;margin-left:10px;color: rgba(28, 106, 235, 1)"
                title="编辑"
                @click="showLinkedConfig(item,index)"
              />
              <a-icon
                type="delete"
                style="cursor: pointer;font-size:20px;margin-left:10px;color: rgb(241, 77, 77)"
                title="删除"
                @click="deleteConfigList(item.configId,index)"
              />
            </div>
          </li>
        </ul>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>
import "@/assets/less/template.less";
import _ from "lodash";
import { mapState, mapGetters, mapMutations } from "vuex";
import { ScreenMutations } from "@/store/modules/screen";
var myWidgetList = [];
export default {
  name: "chartLinkpage",
  components: {},
  data: () => ({
    configValue: "",
    dataTypeCheck: true,
    activeKey: ["12"]
  }),
  mounted() {
    const type = this.config.type;
    if (type === "Pie" || type === "Run" || type === "Funnel") {
      this.dataTypeCheck = false;
    } else {
      this.dataTypeCheck = true;
    }
  },
  computed: {
    ...mapState("screen", ["activeWidget"]),
    ...mapGetters("screen", ["widgets", "scale"]),
    config() {
      return this.activeWidget.config;
    }
  },

  methods: {
    ...mapMutations("screen", {
      activateWidget: ScreenMutations.ACTIVATE_WIDGET
    }),
    change() {
      const activeWidget = _.cloneDeep(this.activeWidget);
      const { render } = this.activeWidget;
      this.activateWidget({
        widget: Object.assign(activeWidget, { config: this.config })
      });
      render.mergeOption(this.config);
      console.log("activeWidget", this.activeWidget);
      console.log("config", this.config);
    },

    showIncreaseConfig() {
      this.config.dataConfig.linkPage = !this.config.dataConfig.linkPage;
    },
    //增加编辑行
    increaseList() {
      this.config.dataConfig.configList.unshift({
        configName: "",
        configId: ""
      });
    },
    // 点击删除按钮去除对应的编辑行
    deleteConfigList(id, index) {
      this.config.dataConfig.configList.splice(index, 1); //删除对应行
      this.config.dataConfig.selectWidgetList.splice(
        this.config.dataConfig.selectWidgetList.indexOf(id),
        1
      ); //也删除放在用来做判定不能重复选的数组对应的Id
      for (var i in this.config.dataConfig.myWidgetList) {
        //将已联动的图表集合中对应图表删除
        if (this.config.dataConfig.myWidgetList[i] == id) {
          this.config.dataConfig.myWidgetList.splice(i, 1);
        }
      }
      for (var i in myWidgetList) {
        //将已联动的图表集合中对应图表删除
        if (myWidgetList[i].widgetId == id) {
          myWidgetList.splice(i, 1);
        }
      }
    },

    //显示参数联动配置页面
    showLinkedConfig(item, index) {
      this.config.dataConfig.selectChartId = "";
      if (item.configId) {
        this.config.dataConfig.selectChartId = item.configId;
      }
      this.config.dataConfig.chooseConfigIndex = index;
      this.config.dataConfig.widgetsOption = [];

      for (var i in this.widgets) {
        var obj = {};
        obj["name"] = this.widgets[i].config.commonConfig.widgetName;
        obj["id"] = this.widgets[i].widgetId;
        this.config.dataConfig.widgetsOption.push(obj);
      }
      //   不能选择自己
      for (var i in this.config.dataConfig.widgetsOption) {
        if (
          this.config.dataConfig.widgetsOption[i].id ==
          this.activeWidget.widgetId
        ) {
          this.config.dataConfig.widgetsOption.splice(i, 1);
        }
      }
      this.config.dataConfig.linkedConfigVisible = true;
    },

    //关闭图表联动配置弹窗
    closeLinkedConfig() {
      this.config.dataConfig.linkedConfigVisible = false;
    },
    //增加参数设置列
    increaseColumn() {
      this.config.dataConfig.columnList.unshift({
        text: "text"
      });
    },

    //点击删除对应参数列
    onDeleteColumn(index) {
      this.config.dataConfig.columnList.splice(index, 1);
    },
    //选择要联动的图表
    selectWidget(value, text) {
      if (
        this.config.dataConfig.selectWidgetList.indexOf(
          this.config.dataConfig.selectChartId
        ) > -1
      ) {
        this.$message.warning("该图表已被联动！");
      } else {
        this.config.dataConfig.chooseConfigText = text.data.attrs.text;
      }
    },
    //确定配置
    configurationOk() {
      this.config.dataConfig.linkedConfigVisible = false;
      this.config.dataConfig.selectWidgetList.push(
        this.config.dataConfig.selectChartId
      ); //将已选择的配置图表id放入this.this.config.dataConfig.selectWidgetList
      //将选中要联动的的EChart图的名字与ID放到对应行
      this.config.dataConfig.configList[
        this.config.dataConfig.chooseConfigIndex
      ].configName = this.config.dataConfig.chooseConfigText;
      this.config.dataConfig.configList[
        this.config.dataConfig.chooseConfigIndex
      ].configId = this.config.dataConfig.selectChartId;
      // ---------------------------------

      for (let i in this.widgets) {
        if (this.config.dataConfig.selectChartId == this.widgets[i].widgetId) {
          this.config.dataConfig.myWidgetList.push(this.widgets[i].widgetId);
        }
      }
      var _self = this;
      let typeValue = this.config.dataConfig.typeValue;
      let configValue = this.config.dataConfig.configValue;
      if (this.activeWidget.bindOnclick == null) {
        let widgetId = this.activeWidget.widgetId;
        this.activeWidget.render.chart.on("click", params => {
          //确定选项后给选定的echart添加点击事件
          // ----------------------
          let chooseIdList = [];
          for (var i in _self.widgets) {
            if (_self.widgets[i].widgetId == widgetId) {
              chooseIdList = _self.widgets[i].config.dataConfig.myWidgetList;
            }
          }
          for (var k in chooseIdList) {
            for (var j in _self.widgets) {
              if (chooseIdList[k] == _self.widgets[j].widgetId) {
                console.log( _self.widgets[j]);
                _self.loadChart(
                  _self.widgets[j],
                  params,
                  configValue,
                  typeValue
                );
              }
            }
          }
        
        });
        this.activeWidget.bindOnclick = true;
      }
    },

    //请求数据
    loadChart(myWidget, chartData, configValue, typeValue) {
      if (
        myWidget.config.dataConfig.measureCols &&
        myWidget.config.dataConfig.measureCols.length > 0
      ) {
        var obj = {
          colId: configValue,
          colName: typeValue == "series" ? chartData.seriesName : chartData.name
        };
        var params = {
          dataSetId: myWidget.config.dataConfig.dataSetId, //选择的数据集的ID
          categoryCol: myWidget.config.dataConfig.categoryCol, //分类参数
          legendCol: myWidget.config.dataConfig.legendCol, //系列名参数
          measureCols: myWidget.config.dataConfig.measureCols, //系列值参数
          legend2Col: myWidget.config.dataConfig.legend2Col, //系列名2参数
          measureCols2: myWidget.config.dataConfig.measureCols2, //系列值2参数
          topValue: myWidget.config.dataConfig.topValue,
          params: [obj] //联动图标时要传的数据  params: [{colId: "22", colName: "2013年"}]
        };
        this.$axios({
          url: "/dashboard/chart/loadData",
          method: "post",
          data: params
        }).then(res => {
          console.log('res.data',res.data);
          
          const configFile = myWidget.config.type;
          const option = require(`../chartconfig/${configFile}Config.js`)
            .default;
          myWidget.config.dataConfig.staticDataConfig.updateStaticData(
            myWidget.config,
            JSON.stringify(option.getOption(params, res.data), null, "\t")
          );
          myWidget.render.mergeOption(myWidget.config);
        });
      }
    }
  }
};
</script>

<style scoped lang="less">
.chart-config-template {
  height: calc(100vh - 224px);
  overflow: auto;
}
.settingBox {
  position: relative;
}
.setting {
  position: absolute;
  right: 28px;
  top: 10px;
  opacity: 0;
  transition: all 0.15s ease-in;
  font-size: 13px;
  cursor: pointer;
}
.settingBox:hover .setting {
  opacity: 1;
  // color: rgb(241, 77, 77);
}
.configTable {
  text-align: center;
}
.configTable tr {
  height: 50px;
  border-bottom: 1px solid rgb(245, 239, 240);
}
.configTable tr:first-child {
  background: #f4f5f3;
  height: 36px;
}
.configDelete {
  color: red;
  cursor: pointer;
}
</style>

