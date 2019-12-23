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
    <el-button type="primary" plain style="margin-top: 40px" @click="logins">登录</el-button>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
       username:'',
        password:''
    }
  },
    methods:{
      logins(){
          let _this=this;
          this.$axios.post('http://127.0.0.1:3001/login',{'name':this.username,'pwd':this.password}).then((res,error)=>{
              console.log(res.data)
              if(res.data=='1'){
                  this.$message({
                      message: '恭喜你，这是一条成功消息',
                      type: 'success'
                  });
              }else if(res.data=='-1'){
                  _this.$message('检查您的账号密码');
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
