/**
* 主页面-初始页面
* Author: wang
* Date: 2021/4/22
* Time: 10:00
*/
<template>
  <div class="homePage">
    <directory />
    <formPage />
  </div>
</template>

<script>
import directory from "./directory"; //目录面板
import formPage from "./formPage"; //表格面板
export default {
  name: "homePage",
  components: { directory, formPage },
  data: () => ({}),
  mounted() {},
  methods: {}
};
</script>
<style >
#app {
  background: #f5f7f9 !important;
}
* {
  margin: 0;
  padding: 0;
}
.homePage{
    width: 100%;
    height: 100%;
    display: flex;
    padding: 1% 0;
}

</style>

