<template>
  <div>
    <heads/>
    <el-image :src="imgs" alt="" style="margin-left: 10%;"/>
    <el-button style="margin-top: 120px;margin-left: 35%">
      <router-link to="/index">回到主页</router-link>
    </el-button>
    <footers/>
  </div>
</template>

<script>
  import error from '../../../static/img/404.jpg'
  import heads from "./heads";
  import footers from "./footers";

  export default {
    name: "Error",
    components: {heads, footers},
    data() {
      return {
        imgs: error
      }
    }
  }
</script>

<style scoped>
  img {
    display: block;
    width: 1200px;
    height: 800px;
    margin: 0 auto;
  }
</style>
