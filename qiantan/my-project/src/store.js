import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);
const Store = new Vuex.Store({
  state: {
    indexarr:[],//这个数组是新朋友数组
    friendarr:[],//好友数组
    kg1:true,//控制上方返回按钮以及二级路由
    msgobj:{},//消息存储
    msgarr:[],
    msgarr1:[]
  },//存放数据的仓库相当于data
  getters: {
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
      var currentdate = year + seperator1 + month + seperator1 + strDate
        + " " + hour + seperator2 + minute + seperator2 + second;
      return currentdate;
    }
  },//计算属性相当于compoued
  mutations: {
    addarr(state,item){
       state.indexarr.push(item.item)
    },
    cleararr(state){
       state.indexarr=[];
    },
    addarr1(state,item){
      state.friendarr.push(item.item)
    },
    setfriendarr(state,i){
      state.friendarr.splice(i,1)
    },
    setkg1(state){
        state.kg1=!state.kg1
    },
    searchfriend(state,emali){
        axios.post('http://127.0.0.1:3001/searchfriend',{'emali':emali.myselfemali}).then((res)=>{

          if(res.data.length===state.friendarr.length||res.data===-1){
            return false;
          }
          res.data.forEach((item,is)=>{
            axios.post('http://127.0.0.1:3001/search',{'email':item.emali}).then((resa)=>{
              state.friendarr.push(resa.data[0])
              if(res.data.length===is+1){
                for(var i=0;i<state.friendarr.length;i++){
                  if(state.friendarr.length>=2){
                    if(state.friendarr[i].email===state.friendarr[i+1].email){
                      state.friendarr.splice(i,1)
                    }
                  }
                }
              }
            })
          })
        })
    },
    setmsgarr(state,item){
      let key=item.obj.friendemali;
      function fun(obj) {
        let res=Object.prototype.toString.call(obj).slice(8,-1);
        return res;
      }
      if(fun(state.msgobj[key])=='Array'){
        state.msgobj[key].push(item.obj);
      }else{
        state.msgobj[key]=[];
        state.msgobj[key].push(item.obj);
        state.msgarr1.push(item.obj)
      }
      state.msgarr=state.msgobj[key]
    },
    setmsgarr1(state){
      state.msgarr=[];
    },
    clearmsgarr(state,key){
      state.msgobj[key.friendemali]=[];//清空数组
    },
    setmsgarr2(state){
      state.msgarr.splice(0,5)//清屏
    }
  },//方法属性相当于methods
  actions: {}//异步操作mutations
});
export default Store;


