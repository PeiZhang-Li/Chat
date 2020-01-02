<template>
  <div class="box">
    <h2>找回密码</h2>
    <div class="inps">
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="el-icon-message"></i> 邮&nbsp;&nbsp;&nbsp;&nbsp;箱：
      <el-input v-model="email" placeholder="请输入内容" class="inpt"></el-input>
      <el-button icon="el-icon-thumb" circle :disabled="kg1" @click="send"></el-button>
    </div>
    <div class="inps">
      <i class="el-icon-link"></i> 验证码：
      <el-input v-model="password" placeholder="请输入内容" class="inpt"></el-input>
    </div>
    <div class="inps">
      <i class="el-icon-lock"></i> 新密码：
      <el-input v-model="password" placeholder="请输入内容" class="inpt"></el-input>
    </div>
    <el-button type="primary" plain style="margin-top: 40px" @click="" :disabled="!kg"><span v-show="!kg"><i
      class="el-icon-loading"></i>修改中...</span><span v-show="kg">修改</span></el-button>
  </div>
</template>

<script>
  import localStorage_Time from "../../static/js/localStorage_Time";

  export default {
    name: 'Getback',
    data() {
      return {
        email: '',
        password: '',
        yzcode: '',
        kg: true,
        kg1: false
      }
    },
    methods: {
      send() {
        this.kg1 = true;
        setTimeout(() => {
          this.kg1 = false;
        }, 60000); //60s后可以继续点击
        this.$axios.post('http://127.0.0.1:3001/Getback', {
          'email': this.email
        }).then((res, error) => {
          if (res.data == '1') {
            this.$message({
              message: '发送成功,请注意查收',
              type: 'success'
            });
          }
        })
      }//发送验证码
    }

  }
</script>

<style scoped>
  .box {
    width: 600px;
    height: 400px;
    border: 1px solid #ccc;
    margin: 0 auto;
    margin-top: 150px;
    text-align: center;
    padding: 30px;
    border-radius: 20px;
  }

  .inps {
    margin-top: 40px;
  }

  .inpt {
    width: 250px;
  }
</style>
