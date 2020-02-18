<template>
  <div style="position: fixed;bottom: 0;width: 100%;background: #545C64;" v-if="!addname">
    <el-menu
      router
      class="el-menu-demo"
      mode="horizontal"
      :default-active="herf"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      style="width:90%;margin: 0 auto"
    >
      <el-menu-item index="/msg" style="margin-left:8rem;">消息</el-menu-item>
      <el-badge :is-dot="indexarr.length==0?false:true" class="item">
        <el-menu-item index="/index">好友列表</el-menu-item>
      </el-badge>
    </el-menu>
  </div>

</template>

<script>


  import localStorage_Time from "../../localStorage_Time";

  export default {
    name: "footers",
    props:['addname'],
    data() {
      return {
        herf:'',
        leng:''
      }
    },
    created() {

      this.herf = location.href.substr(location.href.lastIndexOf('/'))//用来替换头像
      //这个用来向服务器请求是否有未读消息
      let email=localStorage_Time.get('userInfo')
       this.$axios.post('http://127.0.0.1:3001/searchmsg',{'email':email}).then(res=>{
        if(res.data==-1){
          return  false;
        }
         if(this.indexarr.length===res.data.length){
           return false;
         }else{
           res.data.forEach((item,i)=>{
             this.$store.commit({type:'addarr',item:item});
           })
         }
       });
       this.$axios.post('http://127.0.0.1:3001/SearchWeidu',{'email':email}).then(res=>{
          if(res.data.length!=0){
              res.data.forEach((item)=>{
                let obj={
                  'path':item.path,
                  'name':item.myname,
                  'inps':item.inps,
                  'friendemali':item.emali,
                  'flag':false
                }
                this.$store.commit({type:"setmsgarr",obj})
                //添加完成后立即删除

              })
          }
         this.$axios.post('http://127.0.0.1:3001/DelWeidu',{'email':email})
       })
    },

    sockets: {
      message(data) {
       if(data.info===1){
         this.$store.commit({type:'addarr',item:data});
         }else if(data.info===2){
           //这里也要自动触发添加好友数据
         let myselfemali=localStorage_Time.get('userInfo');
         this.$store.commit({type:'searchfriend',myselfemali})
         localStorage.removeItem('userInfo');//清空用户登录状态
         localStorage.removeItem('usermsg');//清空用户信息
         this.$message({
           message: '向服务器更新中...',
         });
         this.$router.push('/login', () => {
           window.location.reload(true);
         })
        }
      },
      msg(data){
        let obj={
          'path':data.path,
          'name':data.myname,
          'inps':data.inps,
          'friendemali':data.emali,
          'flag':false
        };

          this.$store.commit({type:"setmsgarr",obj});
          this.$emit('sendmsg',obj)//将消息同步一份到msg组件中
      }
    },
    computed:{
          indexarr(){
            return this.$store.state.indexarr;
          }
    }
  }
</script>

<style scoped>

</style>
