<template>
<div>
  <heads/>



  <ul v-show="kg1">
    <router-link to="/index/Newfriend"><li @click="setkg1">新朋友 <span v-if="indexarr.length?true:false" class="hongyuan">{{indexarr.length}}</span> <p class="el-icon-arrow-right" style="float: right;height: 100%;line-height:4rem;"></p></li></router-link>
    <router-link to="/index/search"><li @click="setkg1">搜索 <p class="el-icon-arrow-right" style="float: right;height: 100%;line-height:4rem;"></p></li></router-link>
  </ul>
  <router-view/>
  <div v-show="kg1">
    <div v-if="this.friendarr.length==0?false:true" >
      <div v-for="(item,index) of friendarr" :key="index">

        <el-card class="box-card">
          <el-image style="width: 30px; height: 30px;border-radius: 50%;" :src="item.path"><div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div></el-image>    <span style="margin-left:20px;vertical-align: 50%">{{item.name}}</span>
          <el-popconfirm
            title="确定要删除好友么？"
            @onConfirm="shanchu(item.email,index)"
          >
            <el-button type="danger" size="mini" style="float: right" slot="reference">删除</el-button>
          </el-popconfirm>
          <el-button type="success" size="mini" style="float: right;margin-right: 10px;"  @click="sendmsg(item,index)">发送消息</el-button>
        </el-card>

      </div>

    </div>
    <el-card class="box-card" v-if="this.friendarr.length==0?true:false">
      <i class="el-icon-user"></i>&nbsp;&nbsp;您还没有朋友,赶快寻找你的新朋友吧
    </el-card>
  </div>

  <footers/>
</div>
</template>

<script>
  import heads from './public/heads'
  import footers from "./public/footers";
  import localStorage_Time from "../localStorage_Time";
    export default {
      components: {heads, footers},
      name: "Index",
      data() {
        return {
          msg: '',
          num:null
        }
      },
      methods: {
        setkg1(){
          this.$store.commit({type:'setkg1'});
        },
        shanchu(emali,i){
          let myemali=localStorage_Time.get('userInfo');
          let obj={
            myemali,
            emali
          };
          this.$axios.post('http://127.0.0.1:3001/delfriend',obj).then(res=>{
            this.$store.commit({type:'setfriendarr',i});
          })
        },
        sendmsg(item,i){

          setTimeout(()=>{
            this.$router.push({ name: 'msga', params: { 'friend': item }})

          },750)

        }
      },
      created() {


        this.$store.state.kg1=true;
        let myselfemali=localStorage_Time.get('userInfo');
        this.$store.commit({type:'searchfriend',myselfemali})
        //

      },
      computed:{
        indexarr(){
          return this.$store.state.indexarr;
        },
        kg1(){
          return this.$store.state.kg1;
        },
        friendarr(){
          return this.$store.state.friendarr;
        }
      }
    }
</script>

<style scoped>
ul{
  width: 100%;
  margin-top: 2rem;
}
  li{
    width: 100%;
    height: 4rem;
    line-height: 4rem;
    padding: 0 2rem;
    box-sizing: border-box;
    color:#000;
  }

  li:nth-child(1){
    border-bottom: 1px solid #333;
  }
.box-card {
  width: 100%;
}

</style>
