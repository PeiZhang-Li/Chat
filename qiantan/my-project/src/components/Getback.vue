<template>
  <div class="box">
    <h2>重置密码</h2>
    <div class="inps">
      <i class="el-icon-message"></i> 邮&nbsp;&nbsp;&nbsp;&nbsp;箱：
      <el-input v-model="email" placeholder="请输入内容" class="inpt"></el-input>
      <div class="cir">
        <el-button icon="el-icon-thumb" circle :disabled="kg1" @click="send"></el-button>
      </div>

    </div>
    <div class="inps">
      <i class="el-icon-link"></i> 验证码：
      <el-input v-model="yzcode" placeholder="请输入内容" class="inpt"></el-input>
    </div>
    <div class="inps">
      <i class="el-icon-lock"></i> 新密码：
      <el-input v-model="password" placeholder="请输入内容" class="inpt" type="password"></el-input>
    </div>
    <el-button type="primary" plain style="margin-top: 40px" @click="logins" :disabled="!kg"><span v-show="!kg"><i
      class="el-icon-loading"></i>请稍后...</span><span v-show="kg">修改</span></el-button>
  </div>
</template>

<script>


  export default {
    name: 'Getback',
    data() {
      return {
        email: '',
        password: '',
        yzcode: '',
        kg: true,
        kg1: false
      }
    },
    methods: {
      send() {
        this.kg1 = true;
        setTimeout(() => {
          this.kg1 = false;
        }, 60000); //60s后可以继续点击
        this.$axios.post('http://127.0.0.1:3001/Getback', {
          'email': this.email
        }).then((res, error) => {

          if (res.data == '1') {
            this.$message({
              message: '发送成功,请注意查收',
              type: 'success'
            });
          } else {
            this.$message({
              message: '发送失败，请检查',
              type: 'error'
            });
          }
        })
      },//发送验证码
        logins() {

            if (this.email.length === 0 || this.password.length === 0 || this.yzcode.length === 0) {
                this.$message({
                    message: '验证失败，请检查',
                    type: 'error'
                });
            } else {
                this.kg = false;
                this.$axios.post('http://127.0.0.1:3001/modify', {
                    'password': this.password,
                    'email': this.email,
                    'yzcode': this.yzcode
                }).then((res) => {
                    if (res.data === 1) {
                        this.kg = true;
                      this.$message({
                        message: '修改成功',
                        type: 'success'
                      });
                      history.back()
                    } else {
                        this.kg = true;
                        this.$message({
                            message: '验证失败，请检查',
                            type: 'error'
                        });
                    }
                })
            }

        }
    }

  }
</script>

<style scoped>
  .box {
    width: 350px;
    height: 400px;

    margin: 0 auto;
    margin-top: 150px;
    text-align: center;
    padding: 30px;
    border-radius: 20px;
  }

  .inps {
    margin-top: 40px;
    position: relative;
  }

  .cir {
    width: 40px;
    height: 40px;
    position: absolute;
    top: 20px;
    right: 24px;
  }

  .inpt {
    width: 250px;
  }
</style>
