<!--聊天主页面-->
<template>
    <div>
      <heads  :addname="this.friend.name"/>

       <div class="box">
             <ul class="content">
               <li v-for="(item,index) of msgarr" :key="index" class="list">
                    <div :class="{left:!item.flag,right:item.flag}">
                      <div class="msgcontent">{{item.inps}}</div>
                      <div :class="{lsanjiao:!item.flag,sanjiao:item.flag}"></div>
                    </div>
                 <el-image style="width: 30px; height: 30px;border-radius: 50%;" :src="item.path" :class="{limg:!item.flag,rimg:item.flag}"></el-image>
               <div class="shijian" v-if="index===msgarr.length-1?true:false">{{item.date}}</div>
               </li>
             </ul>
            <div class="footers">
                <input type="text" class="inps" v-model="inps">
              <el-button type="success" icon="el-icon-s-promotion" circle  size="mini" style="margin-left: 2rem" @click="sendmsg"></el-button>
            </div>
       </div>
      <footers :addname="this.friend.name"/>
    </div>
</template>

<script>
  import heads from "./public/heads";
  import footers from "./public/footers";
  import localStorage_Time from "../localStorage_Time";
    export default {
        name: "msga",
      components:{heads,footers},
      data(){
          return{
             friend:this.$route.params.friend,
             inps:'',//信息主体
            imgpath:'',//朋友头像地址
            imgpath1:'',//个人头像地址
            friendname:'',//朋友昵称
            myname:'',//个人名称
            friendemali:'',//朋友邮箱
            myemali:'',//个人邮箱
            oldarr:null,
            newarr:null
          }
      },
      methods:{
        getTimes() {
          var date = new Date();
          var seperator1 = "-";
          var seperator2 = ":";
          //以下代码依次是获取当前时间的年月日时分秒
          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          var strDate = date.getDate();
          var minute = date.getMinutes();
          var hour = date.getHours();
          var second = date.getSeconds();
          //固定时间格式
          if (month >= 1 && month <= 9) {
            month = "0" + month;
          }
          if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
          }
          if (hour >= 0 && hour <= 9) {
            hour = "0" + hour;
          }
          if (minute >= 0 && minute <= 9) {
            minute = "0" + minute;
          }
          if (second >= 0 && second <= 9) {
            second = "0" + second;
          }
          var currentdate = month + seperator1 + strDate
            + " " + hour + seperator2 + minute + seperator2 + second;
          return currentdate;
        },
        sendmsg(){
           if(this.inps.length!=0){
             let obj={
                'path':this.imgpath1,
                'name':this.myname,
                 'inps':this.inps,
               'friendemali':this.friendemali,
               'flag':true
             }
              this.$store.commit({type:"setmsgarr",obj});
               //向服务器发送消息
              let obj1={
                'path':this.imgpath1,
                'name':this.myname,
                'inps':this.inps,
                'friendemali':this.friendemali,
                'emali':this.myemali,
                'info':3,
                'flag':false
              };
             this.$socket.emit('sendMsg', obj1);

             this.inps=''
           }else{
             this.$message({
               message: '内容不能为空',
               type: 'warning'
             });
           }
        },
        DelRecord(){
            let obj={
              friendemali:this.friendemali,
              myemali: this.myemali
            }
            this.$axios.post('http://127.0.0.1:3001/DelRecord',obj).then(()=>{

            })
        }
      },
      computed:{
         msgarr(){
           return this.$store.state.msgarr;
         }
      },
      created() {
        if(!localStorage_Time.get('usermsg').userimg.path){
          this.$message({
            message: '请完善您的个人信息后再发送消息',
            type: 'error'
          });
          this.$router.go(-1);
            return false;
        }
        //首先检查
        this.$store.state.kg1=false;
        this.imgpath=this.friend.path||''//朋友的头像地址
        this.imgpath1=`http://127.0.0.1:3001/${localStorage_Time.get('usermsg').userimg.path.replace("\\", "/")}`||'';//个人头像地址
        this.friendname=this.friend.name;//朋友昵称
        this.myname=localStorage_Time.get('usermsg').name.name;//本人名字
        this.friendemali=this.friend.email;//朋友邮箱
        this.myemali=localStorage_Time.get('usermsg').name.email;//个人邮箱
        let myemali=localStorage_Time.get('usermsg').name.email;
        let friendemali=this.friendemali;
        this.oldarr=this.msgarr.length;
        //向服务器查询聊天记录
        let objs={
          friendemali:this.friend.email,
          myemali
        }
        this.$axios.post('http://127.0.0.1:3001/SearchChatRecord',objs).then(res=>{
          if(res.data.length!=0){
            res.data.forEach((obj,i)=>{
              if(i==0){
                this.$store.commit({type:"setmsgarr1"});
                this.$store.commit({type:'clearmsgarr',friendemali})
              }
               this.$store.commit({type:"setmsgarr",obj})
            })
          }
        });

      },
      beforeDestroy() {
        let friendemali=this.friendemali;
        let myemali=localStorage_Time.get('usermsg').name.email;
       if(this.msgarr.length===0){
         return false;
       }
       else{
         this.msgarr.forEach(item=>{
           item.myemali=this.myemali;
           item.date=this.getTimes();
           let objs={
             friendemali:this.friend.email,
             myemali
           }
           this.$axios.post('http://127.0.0.1:3001/SearchChatRecord',objs).then(res=>{
             if(res.data.length===this.msgarr.length){
               this.$store.commit({type:"setmsgarr1"});
               this.$store.commit({type:'clearmsgarr',friendemali})
               return false;//先去判断是否有新信息更新，如果没有就不去更新聊天记录
             }else{
               this.$axios.post('http://127.0.0.1:3001/sendmsg',item).then((res1,err)=>{
                 if(!err){
                   //每次离开时都会向数据库更新聊天记录,首先回去删除旧的聊天记录更像
                   if(res.data.length!=0){
                      res.data.forEach((item,index)=>{
                         let id=item._id
                          this.$axios.post('http://127.0.0.1:3001/DelChatRecord',{'id':id})
                      })
                   }
                   this.$store.commit({type:"setmsgarr1"});
                   this.$store.commit({type:'clearmsgarr',friendemali})
                 }
               })
             }
           });

         })
       }

      },
      watch:{
        msgarr:{
          handler(e){
           if(e.length===6){
             //由于性能原因在达到6以后开始删除聊天记录,也就是清屏
               this.$store.commit({type:"setmsgarr2"});
               this.$store.commit({type:"clearmsgarr"},e[0]);
               this.DelRecord();
           }
          }
        }
      }
    }
</script>

<style scoped>
.box{
  margin-top: 2rem;
  overflow: hidden;
}

  .footers{
    position: fixed;bottom: 0;width: 100%;background: #545C64;height: 5rem;
    padding: 1rem 2rem;box-sizing: border-box;
  }
  .inps{
     width: 80%;
    height: 100%;
    border-radius: 2rem;
    background: #fff;
    outline: none;
    border: 0;
    padding: 0 1rem;
    box-sizing: border-box;
  }
  .list{
    min-height: 3rem;
    width: 100%;
    height: auto;
    overflow: hidden;
    padding-top: 4rem;
    box-sizing: border-box;
    position: relative;
  }
 .right{
   max-width: 20rem;
   min-height: 3rem;
   min-width: 6rem;
   background: greenyellow;
   float: right;
   margin-right: 5rem;
   line-height: 3rem;
   position: relative;
 }
.left{
  max-width: 20rem;
  min-height: 3rem;
  min-width: 6rem;
  background: #dcdcdc;
   float: left;
  margin-left: 5rem;
  line-height: 3rem;
  position: relative;
}
.sanjiao{
  width: 0;
  height: 0;
  border-style: solid;
  border-width:10px;
  border-color: transparent transparent transparent greenyellow;
  position: absolute;
  bottom: -10px;
  right: -20px;
}
.lsanjiao{
  width: 0;
  height: 0;
  border-style: solid;
  border-width:10px;
  border-color: transparent #dcdcdc transparent transparent;
  position: absolute;
  bottom: -10px;
  left: -20px;
}
.limg{
  position: absolute;
  left: .5rem;
  bottom: 0;
}
.rimg{
  position: absolute;
  right: .5rem;
  bottom: 0;
}
  .msgcontent{
     font-size: 16px;
    word-wrap:break-word;
    padding:0 1rem;
    box-sizing: border-box;
  }
  .shijian{
    position: absolute;
    background: #545C64;
    color: #fff;
    text-align: center;
    padding: 0 1rem;
    box-sizing: border-box;
    left: 50%;
    transform: translateX(-50%);
    top: 1rem;
  }
</style>
