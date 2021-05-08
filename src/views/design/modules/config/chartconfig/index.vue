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
    <a-modal title="参数配置" :visible="parameter" @cancel="closeParameterPage" @ok="handleOk">
      <div class="comment-template__item">
        <p class="comment-template__leading">列名:</p>
        <div class="comment-template__inner">
          <a-input type="text" v-model="columnName" disabled />
        </div>
      </div>
      <div class="comment-template__item">
        <p class="comment-template__leading">统计类型:</p>
        <div class="comment-template__inner">
          <a-select v-model="statisticalType">
            <a-select-option value="sum">汇总</a-select-option>
            <a-select-option value="count">计数</a-select-option>
            <a-select-option value="max">最大</a-select-option>
            <a-select-option value="min">最小</a-select-option>
            <a-select-option value="avg">平均</a-select-option>
          </a-select>
        </div>
      </div>
      <div class="comment-template__item">
        <p class="comment-template__leading">格式化:</p>
        <div class="comment-template__inner">
          <a-input type="number" v-model="formatting" />
        </div>
      </div>
    </a-modal>
    <a-collapse v-model="activeKey" :bordered="false">
      <!-- 分类，系列名，系列值 -->
      <a-collapse-panel v-if="moduleType=='module1'" header="分类" key="1">
        <div class="comment-template__item">
          <p class="comment-template__leading">分类:</p>
          <div class="comment-template__inner">
            <a-tree-select
              v-model="config.dataConfig.seriesItem.category"
              style="width: 100%"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              placeholder="请选择分类"
              treeDefaultExpandAll
              :allow-clear="true"
              :treeData="config.dataConfig.seriesName"
              @change="categoryChange"
            />
          </div>
        </div>
      </a-collapse-panel>
      <a-collapse-panel v-if="moduleType=='module1'" header="系列名" key="2">
        <div class="comment-template__item">
          <p class="comment-template__leading">系列名:</p>
          <div class="comment-template__inner">
            <a-tree-select
              v-model="config.dataConfig.seriesItem.legend"
              style="width: 100%"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              placeholder="请选择系列名"
              treeDefaultExpandAll
              :allow-clear="true"
              :treeData="config.dataConfig.seriesName"
              @change="legendChange"
            />
          </div>
        </div>
      </a-collapse-panel>
      <a-collapse-panel v-if="moduleType=='module1'" header="系列值" key="3">
        <div class="comment-template__item">
          <p class="comment-template__leading">系列值:</p>
          <div class="comment-template__inner settingBox">
            <a-tree-select
              v-model="config.dataConfig.seriesItem.measure"
              style="width: 100%;"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              placeholder="请选择系列值"
              treeDefaultExpandAll
              :allow-clear="true"
              :multiple="checkFlag"
              :treeData="config.dataConfig.seriesData"
              @change="measureChange"
            >
              <template slot-scope="text" slot="title">
                {{text.key}}
                <a-icon type="setting" @click="showParameterPage(text,'')" v-show="checkFlag" />
              </template>
            </a-tree-select>
            <a-icon
              slot="suffixIcon"
              type="setting"
              v-show="!checkFlag&&config.dataConfig.measureCols"
              class="setting"
              @click="showParameterPage(config.dataConfig.measureCols,'')"
            />
          </div>
        </div>
      </a-collapse-panel>
      <!-- 系列名，系列值 -->
      <a-collapse-panel
        v-if="moduleType=='module2'"
        header="系列名"
        key="4"
        v-show="config.dataConfig.currentDsId&&config.dataConfig.sourceType === 'real'"
      >
        <div class="comment-template__item">
          <p class="comment-template__leading">系列名:</p>
          <div class="comment-template__inner">
            <a-tree-select
              v-model="config.dataConfig.seriesItem.legend"
              style="width: 100%"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              placeholder="请选择系列名"
              treeDefaultExpandAll
              :allow-clear="true"
              :treeData="config.dataConfig.seriesName"
              @change="legendChange"
            ></a-tree-select>
          </div>
        </div>
      </a-collapse-panel>
      <a-collapse-panel
        v-if="moduleType=='module2'"
        header="系列值"
        key="5"
        v-show="config.dataConfig.currentDsId&&config.dataConfig.sourceType === 'real'"
      >
        <div class="comment-template__item">
          <p class="comment-template__leading">系列值:</p>
          <div class="comment-template__inner settingBox">
            <a-tree-select
              v-model="config.dataConfig.seriesItem.measure"
              style="width: 100%"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              placeholder="请选择系列值"
              treeDefaultExpandAll
              :allow-clear="true"
              :treeData="config.dataConfig.seriesData"
              @change="measureChange"
            >
              <template slot-scope="text" slot="title">{{text.key}}</template>
            </a-tree-select>

            <a-icon
              slot="suffixIcon"
              type="setting"
              class="setting"
              @click="showParameterPage(config.dataConfig.measureCols,'')"
              v-show="config.dataConfig.measureCols"
            />
          </div>
        </div>
      </a-collapse-panel>
      <!-- 分类，系列名1，系列值1,系列名2，系列值2 -->
      <a-collapse-panel
        v-if="moduleType=='module3'"
        header="分类"
        key="6"
        v-show="config.dataConfig.currentDsId&&config.dataConfig.sourceType === 'real'"
      >
        <div class="comment-template__item">
          <p class="comment-template__leading">分类:</p>
          <div class="comment-template__inner">
            <a-tree-select
              v-model="config.dataConfig.seriesItem.category"
              style="width: 100%"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              placeholder="请选择分类"
              treeDefaultExpandAll
              :allow-clear="true"
              :treeData="config.dataConfig.seriesName"
              @change="categoryChange"
            />
          </div>
        </div>
      </a-collapse-panel>
      <a-collapse-panel
        v-if="moduleType=='module3'"
        header="系列名1"
        key="7"
        v-show="config.dataConfig.currentDsId&&config.dataConfig.sourceType === 'real'"
      >
        <div class="comment-template__item">
          <p class="comment-template__leading">系列名1:</p>
          <div class="comment-template__inner">
            <a-tree-select
              v-model="config.dataConfig.seriesItem.legend"
              style="width: 100%"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              placeholder="请选择系列名1"
              treeDefaultExpandAll
              :allow-clear="true"
              :treeData="config.dataConfig.seriesName"
              @change="legendChange"
            />
          </div>
        </div>
      </a-collapse-panel>
      <a-collapse-panel
        v-if="moduleType=='module3'"
        header="系列值1"
        key="8"
        v-show="config.dataConfig.currentDsId&&config.dataConfig.sourceType === 'real'"
      >
        <div class="comment-template__item">
          <p class="comment-template__leading">系列值1:</p>
          <div class="comment-template__inner">
            <a-tree-select
              v-model="config.dataConfig.seriesItem.measure"
              style="width: 100%"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              placeholder="请选择系列值1"
              treeDefaultExpandAll
              :allow-clear="true"
              :treeData="config.dataConfig.seriesData"
              @change="measureChange"
            >
              <template slot-scope="text" slot="title">{{text.key}}</template>
            </a-tree-select>
            <a-icon
              slot="suffixIcon"
              type="setting"
              class="setting"
              @click="showParameterPage(config.dataConfig.measureCols,'')"
              v-show="config.dataConfig.measureCols"
            />
          </div>
        </div>
      </a-collapse-panel>
      <a-collapse-panel
        v-if="moduleType=='module3'"
        header="系列名2"
        key="9"
        v-show="config.dataConfig.currentDsId&&config.dataConfig.sourceType === 'real'"
      >
        <div class="comment-template__item">
          <p class="comment-template__leading">系列名2:</p>
          <div class="comment-template__inner">
            <a-tree-select
              v-model="config.dataConfig.seriesItem.legend2"
              style="width: 100%"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              placeholder="请选择系列名2"
              treeDefaultExpandAll
              :allow-clear="true"
              :treeData="config.dataConfig.seriesName"
              @change="legend2Change"
            />
          </div>
        </div>
      </a-collapse-panel>
      <a-collapse-panel
        v-if="moduleType=='module3'"
        header="系列值2"
        key="10"
        v-show="config.dataConfig.currentDsId&&config.dataConfig.sourceType === 'real'"
      >
        <div class="comment-template__item">
          <p class="comment-template__leading">系列值2:</p>
          <div class="comment-template__inner">
            <a-tree-select
              v-model="config.dataConfig.seriesItem.measure2"
              style="width: 100%"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              placeholder="请选择系列值2"
              treeDefaultExpandAll
              :allow-clear="true"
              :treeData="config.dataConfig.seriesData"
              @change="measure2Change"
            >
              <template slot-scope="text" slot="title">{{text.key}}</template>
            </a-tree-select>
            <a-icon
              slot="suffixIcon"
              type="setting"
              class="setting"
              @click="showParameterPage(config.dataConfig.measureCols2,2)"
              v-show="config.dataConfig.measureCols2"
            />
          </div>
        </div>
      </a-collapse-panel>
      <a-collapse-panel v-if="moduleType=='module4'" header="系列值" key="13">
        <div class="comment-template__item">
          <p class="comment-template__leading">系列值:</p>
          <div class="comment-template__inner">
            <a-tree-select
              v-model="config.dataConfig.seriesItem.measure"
              style="width: 100%"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              placeholder="请选择系列值"
              treeDefaultExpandAll
              :allow-clear="true"
              :multiple="checkFlag"
              :treeData="config.dataConfig.seriesData"
              @change="measureChange"
            >
              <template slot-scope="text" slot="title">
                {{text.key}}
                <a-icon type="setting" @click="showParameterPage(text,'')" v-show="checkFlag" />
              </template>
            </a-tree-select>
            <a-icon
              slot="suffixIcon"
              type="setting"
              v-show="!checkFlag&&config.dataConfig.measureCols"
              class="setting"
              @click="showParameterPage(config.dataConfig.measureCols,'')"
            />
          </div>
        </div>
      </a-collapse-panel>
      <!-- top -->
      <a-collapse-panel
        header="top"
        key="11"
        v-show="config.dataConfig.currentDsId&&config.dataConfig.sourceType === 'real'"
      >
        <div class="comment-template__item">
          <p class="comment-template__leading">top:</p>
          <div class="comment-template__inner">
            <a-input-number v-model="config.dataConfig.topValue" @change="topValueChange"></a-input-number>
          </div>
        </div>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>
import "@/assets/less/template.less";
import _ from "lodash";
import { mapState, mapGetters, mapMutations } from "vuex";
import { ScreenMutations } from "@/store/modules/screen";

export default {
  name: "ChartConfigTemplate",
  props: {
    moduleType: {
      type: String,
      default: "module1"
    }
  },
  components: {},
  data: () => ({
    checkFlag: true,
    parameter: false, //系列值参数配置页面
    columnName: "", //列名
    statisticalType: "sum", //统计类型
    formatting: "", //格式化
    measureData: "",
    sereiseList: [],
    // linkedConfigVisible: false,
    linkPage: false,
    activeKey: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
  }),
  mounted() {
    if (this.config.type === "NestedPie"||this.config.dataConfig.seriesItem.legend) this.checkFlag = false;
    console.log('legend',this.config.dataConfig.seriesItem.legend);
    
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
    },
    loadChart() {
      // console.log('widgets',this.widgets);
      
      if (
        this.config.dataConfig.measureCols &&
        this.config.dataConfig.measureCols.length > 0
      ) {
        var params = {
          dataSetId: this.config.dataConfig.dataSetId, //选择的数据集的ID
          categoryCol: this.config.dataConfig.categoryCol, //分类参数
          legendCol: this.config.dataConfig.legendCol, //系列名参数
          measureCols: this.config.dataConfig.measureCols, //系列值参数
          legend2Col: this.config.dataConfig.legend2Col, //系列名2参数
          measureCols2: this.config.dataConfig.measureCols2, //系列值2参数
          topValue: this.config.dataConfig.topValue,
        };
        this.$axios({
          url: "/dashboard/chart/loadData",
          method: "post",
          data: params
        }).then(res => {
          const configFile = this.config.type;
          const option = require(`../chartconfig/${configFile}Config.js`)
            .default;
          this.config.dataConfig.staticDataConfig.updateStaticData(
            this.config,
            JSON.stringify(option.getOption(params, res.data), null, "\t")
          );
          this.change();
        });
      }
    },
    categoryChange(value) {
      this.config.dataConfig.categoryCol = { colId: "col2", colName: value };
      this.loadChart();
    },
    legendChange(value) {
      if (value || this.config.type === "NestedPie") {
        this.checkFlag = false;
        if (
          this.config.dataConfig.measureCols &&
          Array.isArray(this.config.dataConfig.seriesItem.measure)
        ) {
          this.config.dataConfig.measureCols = [
            this.config.dataConfig.measureCols.shift()
          ];
          this.config.dataConfig.seriesItem.measure = [
            this.config.dataConfig.seriesItem.measure.shift()
          ];
        }
      } else {
        this.checkFlag = true;
      }
      this.config.dataConfig.legendCol = { colId: "col0", colName: value };
      this.loadChart();
    },
    measureChange(value, node, extra) {
      if (value instanceof Array) {
        this.measureData = value;
        this.config.dataConfig.measureCols = [];
        let count = 1;
        for (var v in value) {
          this.config.dataConfig.measureCols.push({
            colId: "measure1" + count++,
            colName: value[v]
          });
        }
        this.config.dataConfig.measureCols.forEach((obj, index) => {
          this.sereiseList.forEach(item => {
            if (obj.colName == item.colName) {
              obj = item;
              this.config.dataConfig.measureCols[index] = item;
            }
          });
        });
        // console.log('1111',this.config.dataConfig.measureCols)
      } else {
        this.config.dataConfig.measureCols = [
          { colId: "measure1", colName: value }
        ];
      }
      this.loadChart();
    },

    legend2Change(value) {
      this.config.dataConfig.legend2Col = { colId: "legend2", colName: value };
      this.loadChart();
    },
    measure2Change(value) {
      if (value instanceof Array) {
        this.config.dataConfig.measureCols2 = [];
        let count = 1;
        for (const v in value) {
          this.config.dataConfig.measureCols2.push({
            colId: "measure2" + count++,
            colName: value[v]
          });
        }
      } else {
        this.config.dataConfig.measureCols2 = [
          { colId: "measure2", colName: value }
        ];
      }
      this.loadChart();
    },
    topValueChange(value) {
      this.loadChart();
    },

    showIncreaseConfig() {
      // this.linkedConfigVisible = true;
      this.linkPage = !this.linkPage;
    },
    //
    increaseList() {
      this.configList.unshift({
        configName: this.configName
      });
    },
    // 点击删除按钮去除对应的编辑行
    deleteConfigList(index) {
      this.configList.splice(index, 1);
    },
    closeParameterPage() {
      //系列值参数配置页面关闭
      this.parameter = false;
    },
    showParameterPage(text, num) {
      //点击设置按钮，出现参数配置页面
      this.parameter = true;
      this.measureNum = num;
      if (Array.isArray(text)) {
        this.columnName = text[0].colName;
        this.measureIndex = 0;
      } else {
        this.columnName = text.key;
        for (var i = 0; i < this.config.dataConfig.measureCols.length; i++) {
          if (this.config.dataConfig.measureCols[i].colName == text.value) {
            this.measureIndex = i;
          }
        }
      }
    },

    handleOk() {
      this.closeParameterPage();
      this.config.dataConfig["measureCols" + this.measureNum][
        this.measureIndex
      ]["action"] = this.statisticalType;
      this.config.dataConfig["measureCols" + this.measureNum][
        this.measureIndex
      ]["rounding"] = this.formatting;
      this.sereiseList = this.config.dataConfig[
        "measureCols" + this.measureNum
      ];
      // console.log('sereiseList111111',this.sereiseList);
      this.formatting = "";
      this.statisticalType = "sum";
      this.loadChart();
    }
  },
  watch: {
    "config.dataConfig.measureCols": {
      handler(newName, oldName) {
        var middle = [];
        if (Array.isArray(oldName)) {
          if (newName.length < oldName.length) {
            middle = JSON.parse(JSON.stringify(oldName));
            for (var i in middle) {
              for (var k in newName) {
                if (middle[i].colName == newName[k].colName) {
                  middle.splice(i, 1);
                }
              }
            }
            for (var j in this.sereiseList) {
              if (this.sereiseList[j].colName == middle[0].colName) {
                this.sereiseList.splice(j, 1);
              }
            }
          }
        }
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
.ant-select-tree-title i{
  display: none;
}
</style>

