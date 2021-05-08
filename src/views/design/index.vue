/**
* 设计视图
* Author: dong xing
* Date: 2020/3/1
* Time: 18:44
* Email: dong.xing@outlook.com
*/

<template>
  <div class="design">
    <!-- <a-alert type="error" message="Error text" banner /> -->
    <div class="header">
      <p>Terminator - 数据可视化设计器</p>
    </div>
    <div class="content">
      <transition name="panel">
        <div class="left" v-show="leftPanelExpand">
          <Template />
        </div>
      </transition>
      <div class="center">
        <Screen @left="leftPanelControl" @right="rightPanelControl" :message="screenMessage" />
      </div>
      <transition name="panel">
        <div class="right" v-show="rightPanelExpand">
          <Config />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Screen from "./modules/screen/index";
import Template from "./modules/template/index";
import Config from "./modules/config/index";
import Qs from "qs";

export default {
  name: "Design",
  components: {
    Screen, //中间画板
    Template, //组件选择，左侧模板
    Config //配置属性，右侧模板
  },
  data: () => ({
    // 左区域展开
    leftPanelExpand: true,
    // 左区域展开
    rightPanelExpand: true,

    //传给screen页面的数据
    screenMessage:'',
  }),
  mounted() {
    if (this.$route.query.id) {
      let configIid = this.$route.query.id;
      let id = { id: configIid };
      this.getAllInfo(id);
    }
  },
  methods: {
    leftPanelControl(control) {
      this.leftPanelExpand = control;
    },
    rightPanelControl(control) {
      this.rightPanelExpand = control;
    },
    //如果是从主页携带id过来，则请求对应的数据
    getAllInfo(id) {
      this.$axios({
        url: "/dashboard/report/design/loadData",
        method: "post",
        data: Qs.stringify(id)
      }).then(res => {
        this.screenMessage = JSON.parse(res.data.page.pageContent)
        this.$set(this.screenMessage,'resourseId',res.data.resource.id)
      });
    }
  }
};
</script>

<style scoped lang="less">
.design {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.header {
  position: relative;
  flex: none;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 54px;
  box-sizing: border-box;
  padding: 0 16px;
  background: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.23);
  z-index: 5;

  p {
    color: #757575;
    font-weight: bold;
    font-size: 18px;
    margin: 0;
  }
}

.content {
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  height: 100%;
  width: 100vw;
}

.left {
  flex: none;
  width: 240px;
  background: white;
  overflow: hidden;
}

.center {
  width: 100%;
  overflow: auto;
  background: white;
}

.right {
  flex: none;
  width: 320px;
  background: white;
}

/* panel 过度动画 */
.panel-enter-active,
.panel-leave-active {
  transition: all 400ms cubic-bezier(0.25, 0.8, 0.25, 1);
}

.panel-enter,
.panel-leave-to {
  width: 0;
}
</style>
