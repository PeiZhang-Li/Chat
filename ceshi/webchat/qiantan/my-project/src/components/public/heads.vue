<template>
  <div class="heads">
    <el-menu
      router
      class="el-menu-demo"
      mode="horizontal"
      default-active="/index"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="/index">好友列表</el-menu-item>
      <el-menu-item index="3">个人中心</el-menu-item>
      <el-menu-item index="3">搜索</el-menu-item>
      <el-submenu index="2" style="float: right">
        <template slot="title">
          <div class="el-icon-user" v-if="kg"></div>
          <el-image style="width: 30px; height: 30px;border-radius: 50%;" :src="url" v-if="!kg"></el-image>&nbsp;<span>{{username}}</span>
        </template>
        <el-menu-item index="/edit">编辑个人信息</el-menu-item>
        <el-menu-item index="/Register">注册新账号</el-menu-item>
        <el-menu-item @click="tuichu">退出登录</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
    import localStorage_Time from "../../../static/js/localStorage_Time";

    export default {
    name: "heads",
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
        this.$confirm('确定退出么?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          localStorage.removeItem('userInfo');//清空用户登录状态
          localStorage.removeItem('usermsg');//清空用户信息
            this.$router.push('/login', () => {
            })
        }).catch((e) => {
          console.log(e)
        });
      }
    },
    created() {
      let userInfo = localStorage_Time.get('userInfo');
      this.emali = userInfo;
      this.$axios.post('http://127.0.0.1:3001/username', {'email': this.emali}).then((resq) => {
        localStorage_Time.setAge(1000 * 60 * 60).set('usermsg', resq.data);
        let usermsg = localStorage_Time.get('usermsg')
        this.username = usermsg.name.name;
        if (usermsg.userimg != '-1') {
          this.kg = false;
          let url = usermsg.userimg.path;
          this.url = `http://127.0.0.1:3001/${url.replace("\\", "/")}`
        } else {
            return false;
        }
      });
    }
  }
</script>

<style scoped>
.heads{
  width: 100%;
  height: 50px;
}
</style>
