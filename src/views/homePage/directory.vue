/**
* 主页面左侧目录面板
* Author: wang
* Date: 2021/4/22
* Time: 10:00
*/
<template>
  <div class="directory">
    <!-- 新增资源分类弹窗 -->
    <a-modal title="图表联动配置" :visible="resourcePage" @cancel="closeResourcePage" @ok="resourseOk">
      <div class="comment-template__item">
        <span class="required">*</span>
        <p class="comment-template__leading">上级目录:</p>
        <div class="comment-template__end">
          <a-tree-select
            style="width: 200px"
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
            placeholder="请选择上级分类"
            treeDefaultExpandAll
            :treeData="configList"
            v-model="configParentId"
          />
        </div>
      </div>
      <!-- <div class="comment-template__item">
        <span class="required">*</span>
        <p class="comment-template__leading">资源目录:</p>
        <div class="comment-template__end">
          <a-input placeholder="请输入资源目录" style="width: 200px" v-model="configDirectory" />
        </div>
      </div>-->
      <div class="comment-template__item">
        <span class="required">*</span>
        <p class="comment-template__leading">目录名称:</p>
        <div class="comment-template__end">
          <a-input placeholder="请输入目录名称" style="width: 200px" v-model="directoryName" />
        </div>
      </div>
      <div class="comment-template__item">
        <span class="required">*</span>
        <p class="comment-template__leading">排序:</p>
        <div class="comment-template__end">
          <a-input placeholder="请输入排序" style="width: 200px" v-model="directorySort" />
        </div>
      </div>
      <div class="comment-template__item">
        <p class="comment-template__leading">备注信息:</p>
        <div class="comment-template__end">
          <textarea cols="30" rows="10" style="width:280px;height:50px" v-model="directoryRemark"></textarea>
        </div>
      </div>
    </a-modal>

    <div class="topHead">
      <span>
        <i class="lan" />资源分类
      </span>
      <a-icon type="plus-square" class="headIcon" @click="resourcePageShow" />
    </div>

    <a-tree
      multiple
      show-line
      :tree-data="resourseData"
      default-expand-all
      @select="onSelect"
      @expand="onExpand"
      style="padding-left:10%"
    >
      <span slot="title_001" slot-scope="scope">
        {{scope.value}}
        <a-tooltip placement="top">
          <template slot="title">
            <span>点击编辑</span>
          </template>
          <a-icon
            type="form"
            style="margin-left:12px;color:rgb(0, 153, 255)"
            @click="editConfig(scope)"
          />
        </a-tooltip>

        <a-popconfirm title="Sure to delete?" @confirm="(e) => deleteConfig(scope)">
          <a-tooltip placement="top">
            <template slot="title">
              <span>点击删除</span>
            </template>
            <a-icon type="delete" style="margin-left:4px;color: rgb(201, 66, 66)" />
          </a-tooltip>
        </a-popconfirm>
      </span>
    </a-tree>
  </div>
</template>

<script>
import eventBus from "./eventBus";
import Qs from "qs";

export default {
  name: "directory",
  components: {},
  data() {
    return {
      resourcePage: false, //资源配置弹窗页面控显
      resourseData: [], //资源配置目录信息
      configList: [], //选择上级目录
      configParentId: "", //父级ID
      configDirectory: "", //资源目录
      directoryName: "", //目录名称
      directorySort: "", //排序
      directoryRemark: "" //备注信息
    };
  },
  mounted() {
    this.getLoadData();
  },
  methods: {
    test(scope) {
      console.log("1111", scope);
      return "123";
    },
    //获取资源目录信息
    getLoadData() {
      this.$axios({
        url: "/dashboard/daResourceCategory/loadData",
        methods: "Get"
      }).then(res => {
        var jsonData = JSON.stringify(res.data);
        this.resourseData = eval(jsonData.replace(/"label"/g, "value"));
        this.configList = eval(jsonData.replace(/"id"/g, "value"));
        localStorage.setItem("configList", JSON.stringify(this.configList));
        eventBus.$emit("listData", this.configList);
        // console.log("this.resourseData", this.resourseData);
      });
    },
    //点击资源目录，显示对应的目录列表
    onSelect(keys, events) {
      eventBus.$emit("pass", events.node.$vnode.data.props.id);
    },
    onExpand() {
      //   console.log("Trigger Expand");
    },
    //添加目录资源
    resourcePageShow() {
      this.resourcePage = true;
    },
    //取消资源配置页面
    closeResourcePage() {
      this.resourcePage = false;
    },
    //确定资源配置
    resourseOk() {
      var configData = {
        parentId: this.configParentId,
        name: this.directoryName,
        remarks: this.directoryRemark,
        sort: this.directorySort,
        // code: this.configDirectory,
        type: 1
      };
      if (
        this.configParentId &&
        this.directoryName &&
        this.directorySort
        // this.configDirectory
      ) {
        this.$axios({
          url: "/dashboard/daResourceCategory/save",
          methods: "PSOT",
          params: configData
        }).then(res => {
          console.log("res", res);
          if (res.message == "成功") {
            this.getLoadData(); //刷新数据
            this.$message.success("保存成功");
            this.resourcePage = false;
            this.configParentId = "";
            this.directoryName = "";
            this.directoryRemark = "";
            this.directorySort = "";
            // this.configDirectory = "";
          }
        });
      } else {
        this.$message.warning("请填写完整信息");
      }
    },

    //编辑资源目录
    editConfig(scope) {
      this.configParentId = scope.data.parentId;
      this.directoryName = scope.data.name;
      this.directorySort = scope.data.sort;
      this.directoryRemark = scope.data.remarks;
           this.resourcePage = true;
      // this.configDirectory
    },

    //删除资源目录
    deleteConfig(scope) {
      let id = scope.id 
      this.$axios({
        url: "/dashboard/daResourceCategory/delete",
        methods: "PSOT",
        params: {id:id}
      }).then(res => {
        if (res.message == "成功") {
          this.$message.success("删除成功");
          this.getLoadData(); //刷新数据
        }
      });
    }
  }
};
</script>
<style >
.directory {
  width: 22%;
  height: 100%;
  background: #fff;
  margin-right: 2%;
  margin-left: 2%;
  padding: 0 1%;
}
.topHead {
  width: 100%;
  height: 38px;
  border-bottom: 1px solid #ccc;
  line-height: 38px;
  /* display: flex;
  justify-content: space-between; */
}
.topHead .lan {
  display: inline-block;
  width: 6px;
  height: 16px;
  background: rgb(0, 153, 255);
  vertical-align: middle;
  margin-left: 10px;
  margin-right: 2px;
  margin-bottom: 2px;
}
.topHead .headIcon {
  margin-bottom: 2px;
  font-size: 18px;
  cursor: pointer;
  vertical-align: middle;
  color: rgb(0, 153, 255);
}
textarea {
  border-radius: 4px;
  border-color: #ccc;
  outline: none;
}
.required {
  color: rgb(201, 66, 66);
}
</style>
