<template>
  <div>
    <heads/>
    <form name="userinfo" action="http://127.0.0.1:3001/adduserinfo" method="post" enctype="multipart/form-data">
      <div style="margin-top: 40px">
        <span>当前头像：</span>
        <el-image style="width: 30px; height: 30px;border-radius: 50%;" :src="url"></el-image>
      </div>

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

      <button type="submit" class="btn btn-success" style="display: block;margin: 0 auto">提交</button>


    </form>
    <footers/>
  </div>
</template>

<script>

  import heads from "./public/heads";
  import footers from "./public/footers";
  import localStorage_Time from "../localStorage_Time";

    export default {
      name: "Edit",
      components: {heads, footers},
      data() {
        return {
          emali: '',
          username: '',
          url: ''
        }
      },
      methods: {},
      created() {
        //用户名!!!!!!
        let usermsg = localStorage_Time.get('usermsg');
        this.username = usermsg.name.name;
        this.emali = usermsg.name.email;
        if (usermsg.userimg != '-1') {
            this.kg = false;
            let url = usermsg.userimg.path;
            this.url = `http://127.0.0.1:3001/${url.replace("\\", "/")}`
        } else {
            return false;
        }
    }
  }
</script>

<style scoped>
  .box {

    width: 100%;
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
