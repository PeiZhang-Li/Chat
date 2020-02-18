<template>
  <div class="box">
    <h2>用户登录</h2>
    <div class="inps">
      <i class="el-icon-message"></i> 邮&nbsp;&nbsp;&nbsp;&nbsp;箱：
      <el-input v-model="email" placeholder="请输入内容" class="inpt"></el-input>
    </div>
    <div class="inps">
      <i class="el-icon-lock"></i> 密&nbsp;&nbsp;&nbsp;&nbsp;码：
      <el-input v-model="password" placeholder="请输入内容" class="inpt" type="password"></el-input>
    </div>
    <el-button type="primary" plain style="margin-top: 40px" @click="logins" :disabled="!kg"><span v-show="!kg"><i
      class="el-icon-loading"></i>登录中...</span><span v-show="kg">登录</span></el-button>
    <br/>
    <br/>
    <router-link to="/Register">注册</router-link>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <router-link to="/Getback">找回密码</router-link>
  </div>
</template>

<script>
    import localStorage_Time from "../localStorage_Time";

    export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      kg: true,
    }
  },
    methods:{
      logins() {
        if (this.email.length === 0 || this.password.length === 0) {
          this.$message({
            message: '请检查您的密码和用户名',
            type: 'error'
          });
        } else {
          this.kg = false;

            this.$axios.post('http://127.0.0.1:3001/login', {
            'email': this.email,
            'pwd': this.password
          }).then((res, error) => {
            if (res.data == '1') {
              this.kg = true;
              this.$message({
                message: '登陆成功',
                type: 'success'
              });
              localStorage_Time.setAge(1000 * 60 * 60).set("userInfo", this.email)//设置登录时长一个小时过期
              this.$router.push({name: 'index'});
            } else if (res.data == '-1') {
              this.kg = true;
              this.$message({
                message: '请检查您的密码和用户名',
                type: 'error'
              });
            }
          })
        }

      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .box{
    width: 350px;
    height: 400px;
    margin: 0 auto;
    margin-top: 150px;
    text-align: center;
    padding: 30px;
    border-radius: 20px;
  }
  .inps{
    margin-top: 40px;
  }
  .inpt{
    width: 250px;
  }
</style>
