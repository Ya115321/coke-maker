<template>
  <div class="login" :style="'height:'+fullHeight+'px'">
    <h3>制码任务平台</h3>
    <div class="login-wrap">
      <el-form>
        <h3>登录</h3>
        <el-form-item>
          <el-input
            v-model="loginForm.username"
            name="employeeNo"
            placeholder="请输入工号"
            auto-complete="on"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="loginForm.userpwd"
            name="password"
            placeholder="请输入密码"
            auto-complete="on"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="Signin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'login',
        data() {
            return {
                loginForm: {
                    username: '', // 工号接收值
                    userpwd: '', // 密码接收值
                },
                xiayi: {marginTop: '0.5rem'},
                fullHeight: document.documentElement.clientHeight
            }
        },
        watch: {
            // 监测浏览器高度变化
            fullHeight(val) {
                if (!this.timer) {
                    this.fullHeight = val;
                    this.timer = true;
                    let that = this;
                    setTimeout(function () {
                        that.timer = false
                    }, 400)
                }
            }
        },
        // 模板渲染之后调用
        mounted() {
            this.get_bodyHeight()
        },
        methods: {
            //   动态获取浏览器高度
            get_bodyHeight() {
                const that = this;
                window.onresize = () => {
                    return () => {
                        window.fullHeight = document.documentElement.clientHeight;
                        that.fullHeight = window.fullHeight;
                    }
                }
            },
            // 登录
            // 业务逻辑
            Signin() {
                this.$router.replace('/index')
                if (this.loginForm.username === '' || this.loginForm.userpwd === '') {
                    this.$message({
                        message: '账号密码不能为空！',
                        type: 'warning'
                    });
                    return
                }
                let formData = JSON.stringify(this.loginForm);
                // axios的get方法，和ajax没啥区别
                this.$axios({
                    method: 'post',
                    url: 'api/qrcodeplaning/frontlogin',
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    withCredentials: true,
                    data: formData
                }).then(res => {
                    //拿到返回值 这里的res就相当于ajax中成功的返回
                    if (res.data.code === 200) {
                        const userName = res.data.data.username; // 账号
                        const employee = res.data.data.employee; // 姓名
                        const depart = res.data.data.depart; // 公司
                        const stationCode = res.data.data.stationCode;
                        const stationSrt = res.data.data.stationSrt;
                        this.setCookie("userName", userName);
                        this.setCookie("employee", employee);
                        this.setCookie("depart", depart);
                        this.setCookie("stationCode", stationCode);
                        this.setCookie("stationSrt", stationSrt);
                        this.$router.replace('/index')
                    } else if (res.data.code == 0) {
                        this.$message({
                            message: '请输入正确的账号密码！',
                            type: 'warning'
                        })
                    }
                })
                    .catch(error => console.log(error))
            }
        }
    }
</script>

<style lang="less" scoped>
  .login {
    background: white;

    h3 {
      background-color: #0a8aaf;
      height: 1rem;
      line-height: 1rem;
      font-size: 0.3rem;
      font-weight: 800;
      padding-left: 0.5rem;
      color: #fff;

      .el-form-item--small .el-form-item__content, .el-form-item--small .el-form-item__label {
        text-align: center;
      }
    }

    //   小于300
    @media screen and (max-width: 500px) {
      .login-wrap {
        width: 7.3rem;
        height: 6rem;
        float: right;
        margin-right: 0.1rem;
        transform: translateY(2.5rem);

        form {
          label {
            margin-left: 1rem;
          }

          /deep/ .el-input {
            width: 4rem;
            text-align: center;
            margin-left: 0.2rem;
          }

        }

        h3 {
          width: 4rem;
          text-align: center;
          padding: 0;
          margin: 0 auto;
          background: none;
          color: black;
        }

        .el-row {
          margin-left: 3rem;
          margin-top: 1rem;
        }
      }

    }
    //   大于400
    @media screen and (min-width: 500px) {
      .login-wrap {
        width: 7.3rem;
        height: 6rem;
        float: right;
        margin-right: 2rem;
        transform: translateY(5rem);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;


        .el-form {
          margin-top: 25px;

          h3 {
            margin: 0 auto;
          }

          label {
            margin-left: 1rem;
            text-align: center;
          }

          /deep/ .el-input {
            width: 4rem;
            text-align: center;
            margin-left: 0.2rem;
          }

          /deep/ .el-form-item__content {
            text-align: center;

            .el-button--small, .el-button--small.is-round {
              margin-left: 8px;
              padding: 9px 15px;
              width: 200px;
            }
          }
        }

        h3 {
          width: 4rem;
          text-align: center;
          padding: 0;
          margin: 0 auto;
          background: none;
          color: black;
        }

        .el-row {
          margin-left: 3rem;
          margin-top: 1rem;
        }
      }
    }
  }
</style>
