<template>
  <div>
    <heads/>
    <form name="userinfo" action="http://127.0.0.1:3001/adduserinfo" method="post" enctype="multipart/form-data">
      <div class="box">
        <div class="input-group ">
          <span class="input-group-addon">头像</span>
          <input type="file" class="form-control" placeholder="Username" aria-describedby="basic-addon1"
                 name="userimg"/>
        </div>
        <div class="input-group ">
          <span class="input-group-addon">用户名</span>
          <input type="text" name="emali" :value="emali" hidden>
          <input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1" name="username"
                 v-model="username"/>
        </div>

        <button type="submit" class="btn btn-success">提交</button>
      </div>


    </form>

  </div>
</template>

<script>

  import heads from "./public/heads";

  export default {
    name: "Edit",
    components: {heads},
    data() {
      return {
        emali: '',
        username: ''
      }
    },
    methods: {},
    created() {
      //用户名!!!!!!

    }
  }
</script>

<style scoped>
  .box {

    width: 1200px;
    height: auto;
    margin: 0 auto;
    margin-top: 100px;
    padding: 0 300px;
    box-sizing: border-box;
    text-align: center;
  }

  .input-group {
    margin-top: 40px;
    padding-bottom: 40px;
    box-sizing: border-box;
  }
</style>
