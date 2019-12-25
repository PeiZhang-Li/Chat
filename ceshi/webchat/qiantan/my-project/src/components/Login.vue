<template>
  <div class="box">
      <h2>用户登录</h2>
    <div class="inps">
       <i class="el-icon-user-solid"></i> 用户名：
      <el-input v-model="username" placeholder="请输入内容" class="inpt"></el-input>
    </div>
    <div class="inps">
      <i class="el-icon-lock"></i> 密&nbsp;&nbsp;&nbsp;&nbsp;码：
      <el-input v-model="password" placeholder="请输入内容" class="inpt"></el-input>
    </div>
    <el-button type="primary" plain style="margin-top: 40px" @click="logins" :disabled="!kg"><span v-show="!kg"><i class="el-icon-loading"></i>登录中...</span><span v-show="kg">登录</span></el-button>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
       username:'',
        password:'',
      kg:true,
    }
  },
    methods:{
      logins(){
        this.kg=false;
          this.$axios.post('http://127.0.0.1:3001/login',{'name':this.username,'pwd':this.password}).then((res,error)=>{
              if(res.data=='1'){
                this.kg=true;
                  this.$message({
                      message: '登陆成功',
                      type: 'success'
                  });
               this.$router.push({ name:'index'})
              }else if(res.data=='-1'){
                this.kg=true;
                this.$message({
                  message: '请检查您的密码和用户名',
                  type: 'error'
                });
              }
          })
      }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .box{
    width: 600px;
    height: 400px;
    border: 1px solid #ccc;
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
