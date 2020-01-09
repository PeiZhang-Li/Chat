<template>
  <div style="position: absolute;bottom: 0;width: 100%;background: #545C64;">
    <el-menu
      router
      class="el-menu-demo"
      mode="horizontal"
      :default-active="herf"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      style="width:90%;margin: 0 auto"
    >
      <el-menu-item index="/">消息</el-menu-item>
      <el-menu-item index="/index">好友列表</el-menu-item>
      <el-menu-item index="3">个人中心</el-menu-item>
      <el-menu-item index="/search">搜索</el-menu-item>
    </el-menu>
  </div>

</template>

<script>


  export default {
    name: "footers",
    data() {
      return {
        herf: ''
      }
    },
    created() {
      this.herf = location.href.substr(location.href.lastIndexOf('/'))
    }
  }
</script>

<style scoped>

</style>
