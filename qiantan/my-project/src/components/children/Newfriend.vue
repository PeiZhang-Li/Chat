<template>
    <div>
      <el-card class="box-card" v-if="arrs.length==0?true:false">
          <i class="el-icon-s-comment"></i>&nbsp;&nbsp;暂时没有新的消息
      </el-card>
      <div v-if="arrs.length==0?false:true">
        <el-card class="box-card" v-for="(item,i) in arrs" :key="i" >
          <div slot="header">
            <el-image style="width: 30px; height: 30px;border-radius: 50%;display: inline-block;" :src="item.path"></el-image>
            <span style="vertical-align: 50%">用户名：{{item.name}}</span>
            <el-button type="danger" size="mini" style="float: right" @click="refuse(i,item.date)">拒绝</el-button>
            <el-button type="success" size="mini" style="float: right;margin-right: 10px;" @click="add(i,item.date,item.emali)">添加</el-button>
          </div>
          <div class="text item">
            时间:{{item.date}}
          </div>
        </el-card>
      </div>

    </div>
</template>

<script>

  import localStorage_Time from "../../localStorage_Time";
    export default {
        name: "newfriend",
      data(){
          return{
             arrs:[]
          }
      },
      methods:{
        refuse(i,d){
          this.arrs.splice(i,1)
          this.indexarr.splice(i,1)
              this.$axios.post('http://127.0.0.1:3001/refuse',{'date':d}).then((res)=>{
              })
        },
        add(i,d,email){
        let myselfemali=localStorage_Time.get('userInfo')
          this.arrs.splice(i,1)
          this.indexarr.splice(i,1)
          this.$axios.post('http://127.0.0.1:3001/refuse',{'date':d}).then((res,err)=>{
              if(!err){
                  this.$axios.post('http://127.0.0.1:3001/adds',{'emali':email,'myemali':myselfemali,'info':2}).then((resq,err)=>{
                    if(!err){
                       let obj={'emali':email,'myemali':myselfemali,'info':2};
                      this.$socket.emit('sayTo',obj);
                       this.$store.commit({type:'searchfriend',myselfemali});
                      localStorage.removeItem('userInfo');//清空用户登录状态
                      localStorage.removeItem('usermsg');//清空用户信息
                      this.$message({
                        message: '向服务器更新中...',
                      });
                      this.$router.push('/login', () => {

                        window.location.reload(true);
                      })
                    }
                  })
              }
          })
        }
      },
      created() {
        this.$store.state.indexarr.forEach((item,i)=>{
          this.$axios.post('http://127.0.0.1:3001/search', {'email': item.emali}).then((res) => {
              let path=res.data[0].path;
              let name=res.data[0].name;
              let emali=res.data[0].email;
              let date=item.date;
              let obj={
                 name,
                path,
                date,
                emali
              }
              this.arrs.push(obj)
          })
        });
      },
      computed:{
        indexarr(){
          return this.$store.state.indexarr;
        }
      }
    }
</script>

<style scoped>
  .box-card {
    width: 100%;
    margin-top: 2rem;
  }
</style>
