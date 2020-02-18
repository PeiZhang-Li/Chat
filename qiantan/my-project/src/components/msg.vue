<template>
  <div>
    <heads/>
    <el-card class="box-card" v-if="arr.length==0?true:false">
      <i class="el-icon-s-comment"></i>&nbsp;&nbsp;暂时没有新的消息
    </el-card>
    <ul>
      <li v-for="(item,index) of arr" @click="sendmsg(item)">
        <el-image class="el-img" :src="item.path"></el-image>
        <span class="span1">{{item.name}}</span>
        <span class="span2">{{item.inps}}</span>
      </li>
    </ul>
    <footers @sendmsg="ars"/>
  </div>

</template>

<script>
  import heads from "./public/heads";
  import footers from "./public/footers";
    export default {
        name: "msg.vue",
      components: {heads, footers},
      data(){
          return {
              arr:[],
            obj:{}
          }
      },
      methods:{
           ars(e){
             this.arr.forEach((item,index)=>{
                if(item.email===e.friendemali){
                   this.arr[index].inps=e.inps;
                }
             })
           },
        sendmsg(item){

          setTimeout(()=>{
            this.$router.push({ name: 'msga', params: { 'friend': item }})

          },750)

        }
      },
      created() {
        if(this.msgarr1.length!=0){
          this.arr=[];
          this.msgarr1.forEach((item,index)=>{
              if(item.friendemali===this.friendarr[index].email){
                  this.arr.push(this.friendarr[index])
              }
          })
        }
      },
      computed: {
        msgarr1() {
          return this.$store.state.msgarr1
        },
        friendarr(){
          return this.$store.state.friendarr
        }
      }
    }
</script>

<style scoped>
  ul{
    margin-top: 1rem;
  }
li{
  width: 100%;
  height: 6rem;
  border-bottom: 1px solid #dcdcdc;
  position: relative;
}
.box-card {
  width: 100%;
  margin-top: 2rem;
}
  .el-img{
    width: 30px; height: 30px;border-radius: 50%;position: absolute;
    top: 50%;transform: translateY(-50%);
    left: 2rem;
  }
  .span1{
     position: absolute;
    top: 30%;transform: translateY(-50%);
    left: 6rem;
  }
  .span2{
    font-size: 12px;
    color: #969696;
    position: absolute;
    left: 6rem;
    transform: translateY(-50%);
    top: 70%;
  }
</style>
