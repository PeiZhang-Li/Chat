<template>
  <div>
    <heads/>

    <el-input v-model="msg" placeholder="请输入用户名或者邮箱地址" style="width: 87%" @input="yanzheng"></el-input>
    <el-button icon="el-icon-search" circle @click="search"></el-button>
    <div v-if="kg2">
      <div class="content" v-if="kg1">
        <el-card class="box-card" v-for="(item,i) in arr" :key="i">
          <div slot="header">
            <el-image style="width: 30px; height: 30px;border-radius: 50%;" :src="item.path"></el-image>
            <span style="vertical-align: text-top">用户名：{{item.name}}</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="tianjia(item.email)">添加好友</el-button>
          </div>
          <div class="text item">
            个人邮箱:{{item.email}}
          </div>
        </el-card>
      </div>
      <div class="content" v-if="!kg1">
        <el-card class="box-card">
          <div class="text item">
            未找到该用户
          </div>
        </el-card>
      </div>
    </div>

    <footers/>
  </div>

</template>

<script>
  import localStorage_Time from "../localStorage_Time";
  import heads from "./public/heads";
  import footers from "./public/footers";
    export default {
      name: "Search",
      components: {heads, footers},
      data() {
        return {
          msg: '',
          kg: null,
          kg1: false,
          kg2: false,
          arr: null
        }
      },
      methods: {
        yanzheng() {
          const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
          if (mailReg.test(this.msg)) {
              // 邮箱格式一旦正确则去进行精确查询
              this.kg = false
            } else {
              this.kg = true
            }
          },
          search() {

            let v = null;

            if (this.kg) {
              //模糊查询
              v = {'name': this.msg}
            } else {
              //精确查询
              v = {'email': this.msg}
            }
            if (this.kg == null) {
              this.$message({
                message: '请输入内容',
                type: 'warning'
              });
            } else {
              this.$axios.post('http://127.0.0.1:3001/search', v).then((res) => {
                this.kg2 = true;
                if (res.data !== 0) {
                  //找到
                  this.kg1 = true;
                  this.arr = res.data
                } else {
                  //找不到
                  this.kg1 = false;
                }
              })
            }


          },
        tianjia(e) {
          let date = this.getdata;
          //e 为要添加人的信息
          let usermsg = localStorage_Time.get('usermsg');
          let email = usermsg.name.email;
          let obj = {'friend': e, 'date': date, 'emali': email};
          this.$axios.post('http://127.0.0.1:3001/addfriend', obj).then((res) => {

          })
        }

      },
      computed: {
        getdata() {
          return this.$store.getters.getTimes
        }
      }
    }
</script>

<style scoped>
  .box {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    margin-top: 40px;
  }

  .content {
    width: 100%;
    height: auto;
    margin-top: 2rem;
  }

  .box-card {
    width: 100%;
    margin-top: 2rem;
  }
</style>
