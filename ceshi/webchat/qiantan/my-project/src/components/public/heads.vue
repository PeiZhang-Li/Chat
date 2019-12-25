<template>
  <div class="heads">
     <div class="content">
          <span class="headtxt">WebChat</span><span class="headtxt">后台管理系统</span>
     </div>
  </div>
</template>

<script>
    export default {
        name: "heads"
    }
</script>

<style scoped>
.heads{
  width: 100%;
  height: 50px;
  background:#25313F;
}
  .content{
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    line-height: 50px;
  }
  .content>span:nth-child(1){
    color: #fff;
  }
.content>span:nth-child(2){
   color: #00965E;
}
  .headtxt{
     font-weight: 700;
  }
</style>
