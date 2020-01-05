<template>
  <div>
    <heads/>
    <div class="box">
      <el-input v-model="msg" placeholder="请输入内容" style="width: 70%"></el-input>
      <el-button icon="el-icon-search" circle @click="search"></el-button>
    </div>
  </div>

</template>

<script>
    import heads from "./public/heads";

    export default {
        name: "Search",
        components: {heads},
        data() {
            return {
                msg: ''
            }
        },
        methods: {
            search() {
                this.$axios.post('http://127.0.0.1:3001/serach')
            }
        }
    }
</script>

<style scoped>
  .box {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    margin-top: 40px;
  }
</style>
