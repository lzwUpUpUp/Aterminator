/**
* 数据源选择模板
* Author: dong xing
* Date: 2019/12/6
* Time: 4:09 下午
* Email: dong.xing@outlook.com
*/

<template>
  <div class="data-source comment-template" style="height: calc(100vh - 224px);overflow: auto;">
    <a-collapse v-model="activeKey" :bordered="false">
      <!-- S 数据源 -->
      <a-collapse-panel header="数据源" key="1">
        <div class="comment-template__item">
          <p class="comment-template__leading">选择:</p>
          <div class="comment-template__inner">
            <a-select v-model="config.dataConfig.sourceType" @change="change">
              <a-select-option value="null">空数据</a-select-option>
              <a-select-option value="static">静态数据</a-select-option>
              <a-select-option value="real">实时数据</a-select-option>
            </a-select>
          </div>
        </div>
        <!-- / 数据源选择 -->
      </a-collapse-panel>
      <!-- E 数据源 -->

      <!-- S 静态数据编辑 -->
      <a-collapse-panel header="静态数据编辑" key="2" v-show="config.dataConfig.sourceType === 'static'">
        <a-icon
          slot="extra"
          class="data-source__fullscreen"
          :type="isFullscreen ? 'fullscreen' : 'fullscreen-exit'"
          @click="switchMode"
        />

        <div class="data-source__wrap">
          <AceEditor
            class="data-source__editor"
            language="json"
            :code="code"
            @change="staticSourceChange"
          />
        </div>
      </a-collapse-panel>
      <!-- E 静态数据编辑 -->

      <!-- S 动态数据编辑 -->
      <a-collapse-panel header="数据集" key="3" v-show="config.dataConfig.sourceType === 'real'">
        <div class="comment-template__item">
          <p class="comment-template__leading">选择:</p>
          <div class="comment-template__inner">
            <a-tree-select
              v-model="config.dataConfig.currentDsId"
              style="width: 100%"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              placeholder="请选择数据集"
              treeDefaultExpandAll
              :treeData="dsTree"
              @change="getTypeData"
            />
          </div>
        </div>
      </a-collapse-panel>
      <!-- E 动态数据编辑 -->
    </a-collapse>

    <!-- 分类、系列名、系列值等 -->
    <ChartConfigTemplate
      :moduleType="moduleType"
      v-show="config.dataConfig.currentDsId&&config.dataConfig.sourceType === 'real'"
    ></ChartConfigTemplate>
  </div>
</template>
/* eslint-disable */
<script>
import "@/assets/less/template.less";
import _ from "lodash";
import AceEditor from "vue-ace-editor-valid";
import { mapState, mapMutations } from "vuex";
import { ScreenMutations } from "@/store/modules/screen";
import ChartConfigTemplate from "../chartconfig";

export default {
  name: "DataSourceTemplate",
  components: {
    AceEditor,
    ChartConfigTemplate
  },
  data: function() {
    return {
      activeKey: ["1", "2", "3"],
      dsTree: [], //实时数据值
      isFullscreen: false
    };
  },
  computed: {
    ...mapState("screen", ["activeWidget"]),
    config() {
      return this.activeWidget.config;
    },
    code() {
      // 根据类型调整样式
      const { barType } = this.config.proprietaryConfig;
      return this.config.dataConfig.staticDataConfig.getCode(barType);
    },
    moduleType() {
      const type = this.config.type;
      if (
        type === "Lines" ||
        type === "NestedPie" ||
        type === "Bar" ||
        type === "TBar" ||
        type === "Radar"
      )
        return "module1";
      if (type === "Pie" || type === "Run" || type === "Funnel")
        return "module2";
      if (type === "DoubleLines") return "module3";
      if (type === "Needle") return "module4";
      return null;
    }
  },
  mounted() {
      this.dsTree = JSON.parse(localStorage.getItem("dsTree"));      
  },
  methods: {
    ...mapMutations("screen", {
      activateWidget: ScreenMutations.ACTIVATE_WIDGET
    }),
    switchMode(event) {
      this.isFullscreen = !this.isFullscreen;
      event.stopPropagation();
    },
    /**
     * 静态资源修改
     * @param code 静态资源代码
     */
    staticSourceChange(code) {
      if (code !== "") {
        // console.log('code',code);
        // 在不同类型的静态数据配置类中配置自己的更新方法
        this.config.dataConfig.staticDataConfig.updateStaticData(
          this.config,
          code
        );
        this.change();
      }
    },
    change() {
      const activeWidget = _.cloneDeep(this.activeWidget);
      const { render } = this.activeWidget;
      this.activateWidget({
        widget: Object.assign(activeWidget, { config: this.config })
      });
      render.mergeOption(this.config);
    },

    getTypeData() {
      //选择实时数据时得到系列值、系列名数据
      this.$axios({
        url: "/dashboard/dataSet/dataSetTreeData",
        method: "post",
        params: { id: this.config.dataConfig.currentDsId }
      }).then(res => {
        this.config.dataConfig.seriesItem = {};
        this.config.dataConfig.seriesName = [res.data.dataSetTree[0]];
        for (var i in res.data.dataSetTree[1].children) {
          res.data.dataSetTree[1].children[i]["scopedSlots"] = {
            title: "title"
          };
           res.data.dataSetTree[1].children[i]["key"] = res.data.dataSetTree[1].children[i].title
           res.data.dataSetTree[1].children[i].value= res.data.dataSetTree[1].children[i].value
          delete res.data.dataSetTree[1].children[i].title
        }
        this.config.dataConfig.seriesData = [res.data.dataSetTree[1]];
        this.config.dataConfig.dataSetId = res.data.dataSet.id;
      });
    }
  }
};
</script>

<style scoped lang="less">
.data-source {
  &__fullscreen {
    color: #1890ff;
  }

  &__wrap {
    height: calc(100vh - 388px);
  }

  &__editor {
    border-radius: 4px;
    background: #f1f1f1;
    font-size: 14px;
  }
}
</style>
