<template>
  <div class="box">
    <h2>用户注册</h2>
    <div class="inps">
      <i class="el-icon-user-solid"></i> 用户名：
      <el-input v-model="username" placeholder="请输入内容" class="inpt"></el-input>
    </div>
    <div class="inps">
      <i class="el-icon-lock"></i> 密&nbsp;&nbsp;&nbsp;&nbsp;码：
      <el-input v-model="password" placeholder="请输入内容" class="inpt" type="password"></el-input>
    </div>
    <div class="inps">
      <i class="el-icon-message"></i> 邮&nbsp;&nbsp;&nbsp;&nbsp;箱:&nbsp;&nbsp;&nbsp;
      <el-input v-model="email" placeholder="请输入内容" class="inpt" @input="yanzheng"></el-input>
      <br>
      <span style="color: deeppink" v-show="kg1">邮箱格式不正确！</span>
    </div>
    <el-button type="primary" plain style="margin-top: 40px" @click="logins" :disabled="!kg"><span v-show="!kg"><i
      class="el-icon-loading"></i>注册中...</span><span v-show="kg">注册</span></el-button>
  </div>
</template>

<script>
  export default {
    name: 'Register',
    data() {
      return {
        username: '',
        password: '',
        email: '',
        kg: true,
        kg1: false
      }
    },
    methods: {
      logins() {
        if (this.username.length === 0 || this.password.length === 0 || this.kg1 === true) {
          this.$message({
            message: '错误,请检查',
            type: 'error'
          });
        } else {
          this.kg = false;
          this.$axios.post('http://127.0.0.1:3001/register', {
            'name': this.username,
            'pwd': this.password,
            'email': this.email
          }).then((res, error) => {
            if (res.data == '1') {
              this.kg = true;
              this.$message({
                message: '注册成功',
                type: 'success'
              });
                this.$router.push({name: 'Login'})
            } else if (res.data == '-1') {
              this.kg = true;
              this.$message({
                message: '该用户已经被注册或您的网络出现问题',
                type: 'error'
              });
            }
          })
        }

      },
      yanzheng() {
        const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        if (mailReg.test(this.email)) {
          // alert("邮箱格式正确");
          this.kg1 = false
        } else {
          this.kg1 = true
        }
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .box {
    width: 350px;
    height: 400px;
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
