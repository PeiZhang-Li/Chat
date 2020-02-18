<template>
  <div class="heads">
    <el-menu
      router
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <div class="back el-icon-arrow-left" v-show="!kg1" @click="goback"></div>
      <div class="addname">{{addname}}</div>
      <el-submenu index="2" style="float: right"  v-if="!addname">
        <template slot="title">
          <div class="el-icon-user" v-if="kg" ></div>
          <el-image style="width: 30px; height: 30px;border-radius: 50%;" :src="url" v-if="!kg"></el-image>&nbsp;<span
          style="font-size: 12px">{{username}}</span>
        </template>
        <el-menu-item index="/edit">编辑个人信息</el-menu-item>
        <el-menu-item index="/Getback">修改密码</el-menu-item>
        <el-menu-item index="/Register">注册新账号</el-menu-item>
        <el-menu-item @click="tuichu">退出登录</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  import localStorage_Time from "../../localStorage_Time";

    export default {
    name: "heads",
      props:['addname'],
    data() {
      return {
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        kg: true,
        emali: '',
        username: ''
      }
    },
    methods: {
      tuichu() {
        localStorage.removeItem('userInfo');//清空用户登录状态
        localStorage.removeItem('usermsg');//清空用户信息
        this.$router.push('/login', () => {
        })
      },
      goback(){
        this.$router.go(-1);
        this.$store.commit({type:'setkg1'})

      }
    },
    created() {
      let userInfo = localStorage_Time.get('userInfo');
      this.emali = userInfo;
      this.$axios.post('http://127.0.0.1:3001/username', {'email': this.emali}).then((resq) => {
        localStorage_Time.setAge(1000 * 60 * 60).set('usermsg', resq.data);
        let usermsg = localStorage_Time.get('usermsg');
        this.username = usermsg.name.name;
        let email = usermsg.name.email;
        this.$socket.emit('setRoom', email);//向服务器发送我已经上线的消息
        if(localStorage_Time.get('usermsg').userimg==='-1'){
          this.$message({
            message: '请完善您的个人信息后再发送消息',
            type: 'error'
          });
          this.$router.push({name:'edit'});
          return false;
        }
        if (usermsg.userimg != '-1') {
          this.kg = false;
          let url = usermsg.userimg.path;
          this.url = `http://127.0.0.1:3001/${url.replace("\\", "/")}`
        } else {

          return false;
        }
      });
    },
      computed:{
        kg1(){
          return this.$store.state.kg1;
        }
      }
  }
</script>

<style scoped>
.heads{
  width: 100%;
  height: 50px;
}
  .back{
    float: left;
    color: #fff;
    font-size: 20px;
    line-height: 60px;
   margin-left: .5rem;
  }
  .addname{
    color: #fff;
    line-height: 60px;
    text-align: center;
  }
</style>
