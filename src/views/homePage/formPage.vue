  /**
* 主页面左侧目录面板
* Author: wang
* Date: 2021/4/22
* Time: 11:00
*/
<template >
  <div class="formPage">
    <div class="topHead">
      <span>
        <i class="lan" />资源中心
      </span>
    </div>
    <div class="comment-template__item">
      <p class="comment-template__leading">资源名称:</p>
      <div class="comment-template__end">
        <a-input
          placeholder="请输入资源名称"
          style="width: 200px;margin-right:20px"
          v-model="searchConfigName"
        />
        <a-button type="primary" icon="search" @click="getFromData">Search</a-button>
        <a-button type="primary" icon="plus" @click="goToDesign"  style="margin-left:20px">新建图表</a-button>
      </div>
    </div>

    <!-- 编辑弹窗 -->
    <a-modal title="图表联动配置" :visible="svaePage" @cancel="closeSvaePage" @ok="resourseSvaeOk">
      <div class="comment-template__item">
        <p class="comment-template__leading">上级目录:</p>
        <div class="comment-template__end">
          <a-tree-select
            style="width: 200px"
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
            placeholder="请选择上级分类"
            treeDefaultExpandAll
            :treeData="listData"
            v-model="parentId"
          />
        </div>
      </div>
      <div class="comment-template__item">
        <p class="comment-template__leading">资源名称:</p>
        <div class="comment-template__end">
          <a-input placeholder="请输入资源名称" style="width: 200px" v-model="resourseName" />
        </div>
      </div>
      <div class="comment-template__item">
        <p class="comment-template__leading">状态:</p>
        <div class="comment-template__end">
          <a-select style="width: 200px" v-model="resourseStatus">
            <a-select-option value="1">有效</a-select-option>
            <a-select-option value="0">无效</a-select-option>
          </a-select>
        </div>
      </div>
      <div class="comment-template__item">
        <p class="comment-template__leading">排序:</p>
        <div class="comment-template__end">
          <a-input placeholder="请输入排序" style="width: 200px" v-model="resourseSorts" />
        </div>
      </div>
      <div class="comment-template__item">
        <p class="comment-template__leading">备注信息:</p>
        <div class="comment-template__end">
          <textarea cols="30" rows="10" style="width:280px;height:50px" v-model="reousrseText"></textarea>
        </div>
      </div>
    </a-modal>

    <!-- 表格 -->
    <a-table :columns="columns" :data-source="FormData" row-key="id" :pagination="false">
      <a slot="name" slot-scope="text,record" @click="checkConfig(record)">{{ text }}</a>
      <span slot="customTitle">资源名称</span>
      <span slot="status" slot-scope="status">
        <a-tag
          v-for="tag in status"
          :key="tag"
          :color="tag == '1' ? 'green' : 'volcano' "
        >{{ tag == '1' ? '正常' : '失效'}}</a-tag>
      </span>
      <span slot="action" slot-scope="record">
        <a style="margin-right:10px" @click="editResourse(record)">Edit</a>&nbsp;&nbsp;
        <a-popconfirm title="Sure to delete?" @confirm="(e) => onDelete(record.id)">
          <a href="javascript:;" style="color:red">Delete</a>
        </a-popconfirm>
      </span>
    </a-table>

    <a-pagination
      style="margin-top: 20px;margin-bottom:40px"
      v-model="current"
      :page-size-options="pageSizeOptions"
      :total="total"
      show-quick-jumper
      show-size-changer
      :page-size="pageSize"
      @showSizeChange="onShowSizeChange"
      @change="onTableChange"
    >
      <template slot="buildOptionText" slot-scope="props">
        <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
        <span v-if="props.value === '50'">全部</span>
      </template>
    </a-pagination>
  </div>
</template>

<script>
import eventBus from "./eventBus";
const columns = [
  {
    dataIndex: "name",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "name" }
  },
  {
    title: "类型",
    dataIndex: "categoryName"
  },
  {
    title: "排序",
    dataIndex: "sort"
  },
  {
    title: "状态",
    dataIndex: "status",
    scopedSlots: { customRender: "status" }
  },
  {
    title: "更新时间",
    dataIndex: "updateDate",
    scopedSlots: { customRender: "updateDate" }
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" }
  }
];

export default {
  name: "formPage",
  data: () => ({
    FormData: [],
    searchConfigName: "", //搜索
    columns,
    categoryId: "", //资源分类Id
    listData: [], //资源目录
    svaePage: false, //资源表格编辑保存弹窗显示
    resourseName: "", //资源名称
    resourseStatus: "", //资源状态
    resourseSorts: "", //资源排序
    reousrseText: "", //
    parentId: "", //上级资源目录ID
    categoryName: "", //分类名称
    targetId: "", //所编辑的ID

    // ------表格-----
    pageSizeOptions: ["10", "20", "30", "40", "50"],
    current: 1, //当前页
    pageSize: 10, //一页数量
    total: 0
  }),
  created() {
    eventBus.$on("pass", data => {
      this.categoryId = data;
      this.getFromData();
    });
    eventBus.$on("listData", data => {
      this.listData = data;
      //   console.log("listData", this.listData);
    });
  },
  mounted() {
    this.getFromData(); //初始化获得表格列表数据
  },
  methods: {
    //初始化获得表格列表数据
    getFromData() {
      this.$axios({
        url: "/dashboard/daResource/loadData",
        type: "post",
        params: {
          pageSize: this.pageSize,
          current: this.current,
          categroyId: this.categoryId,
          name: this.searchConfigName
        }
      }).then(res => {
        this.total = res.data.total;
        this.FormData = res.data.records;
      });
    },

    // 删除数据
    onDelete(id) {
      this.$axios({
        url: "/dashboard/daResource/delete",
        methods: "post",
        params: { id: id }
      }).then(res => {
        this.getFromData(); //刷新数据
      });
    },
    // 关闭资源表格编辑保存弹窗
    closeSvaePage() {
      this.svaePage = false;
    },
    //保存
    resourseSvaeOk() {
      var paramsData = {
        id: this.targetId,
        categoryId: this.parentId,
        categoryName: this.categoryName,
        sort:this.resourseSorts,
        name: this.resourseName,
        status: this.resourseStatus,
        remarks: this.reousrseText,
        type: 2
      };
      this.$axios({
        url: "/dashboard/daResource/save",
        type: "POST",
        params: paramsData
      }).then(res => {
        console.log("res", res);
        if (res.message == "成功") {
          this.svaePage = false;
          this.$message.success("保存成功");
          this.getFromData()  //刷新数据
          //   this.parentId = '';
          //   this.resourseName = '';
          //   this.reousrseText = '';
          //   this.resourseSorts = '';
          //   this.resourseStatus = '';
          //   this.categoryName = '';
          //   this.targetId = '';
        }
      });
    },
    // 点击名称查看
    checkConfig(data) {
      // let url = this.$router.push({
      //   name: "design",
      //   params: { id: data.id }
      // });
      // window.open(url,'_blank')

      const { href } = this.$router.resolve({
        path: "/design", //这里是跳转页面的name
        query: { id: data.id }
      });
      window.open(href, "_blank"); //打开新的窗口
    },

     
    goToDesign() {
      const { href } = this.$router.resolve({
        path: "/design" //这里是跳转页面的name
      });
      window.open(href, "_blank"); //打开新的窗口
    },

    //   点击编辑，显示弹窗
    editResourse(record) {
      this.parentId = record.categoryId;
      this.resourseName = record.name;
      this.reousrseText = record.remarks;
      this.resourseSorts = record.sort;
      this.resourseStatus = record.status;
      this.categoryName = record.categoryName;
      this.targetId = record.id;
      this.svaePage = true;
    },
    //跳转至几页
    onTableChange(pageNumber) {
      this.current = pageNumber;
      this.getFromData();
    },
    // 分页
    onShowSizeChange(current, pageSize) {
      this.pageSize = pageSize;
      this.getFromData();
    }
  }
};
</script>
<style >
.formPage {
  width: 78%;
  height: 100%;
  background: #fff;
  margin-right: 2%;
  padding: 0 1%;
}
.comment-template__item {
  height: 50px;
  padding-left: 10px;
}
td,
th {
  text-align: center !important;
}
.required {
  color: red;
}
</style>