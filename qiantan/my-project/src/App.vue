<template>
  <div id="app">
<!--    <router-view/>-->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  *{
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
  html,body,ul,li,ol,dl,dd,dt,p,h1,h2,h3,h4,h5,h6,form,fieldset,legend,img {
    margin:0;
    padding:0;

  }
  fieldset,img {
    border:0
  }
  img {
    display:block
  }
  address,caption,cite,code,dfn,th,var {
    font-style:normal;
    font-weight:normal
  }
  ul,ol {
    list-style:none
  }
  input {
    padding-top:0;
    padding-bottom:0;
  }
  input::-moz-focus-inner{
    border:0;
    padding:0
  }
  select,input{
    vertical-align:middle
  }
  select,input,textarea{
    font-size:12px;
    margin:0
  }
  input[type="text"],input[type="password"],textarea{
    outline-style:none;
    -webkit-appearance:none
  }
  textarea{
    resize:none
  }
  .hongyuan{
    width: 2rem;
    height: 2rem;
    display: inline-block;
    background: #F56C6C;
    color: #fff;
    line-height: 2rem;
    text-align: center;
    border-radius: 10px;
  }
</style>
