<template>
  <div>
    <heads/>
    <div class="box">
      <el-input v-model="msg" placeholder="请输入用户名或者邮箱地址" style="width: 70%" @input="yanzheng"></el-input>
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
              msg: '',
              kg: true
            }
        },
        methods: {
          yanzheng() {
            const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
            if (mailReg.test(this.msg)) {
              // 邮箱格式一旦正确则去进行精确查询
              this.kg = false
            } else {
              this.kg = true
            }
          },
          search() {

            let v = null;
            if (this.kg) {
              //模糊查询
              v = {'name': this.msg}
            } else {
              //精确查询
              v = {'email': this.msg}
            }

            this.$axios.post('http://127.0.0.1:3001/search', v).then((res) => {
              console.log(res)
            })

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
