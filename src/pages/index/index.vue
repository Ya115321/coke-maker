<template>
  <div class="index">
    <h3 class="header">
      <span class="login">制码任务平台</span>
      <span class="Exitwindow" @click="exitwindow">退出</span>
      <span class="Signin">{{Loginname}}</span>
      <i class="iconfont">&#xe611;</i>
    </h3>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="任务" name="first">
        <homepage-tasks></homepage-tasks>
      </el-tab-pane>
      <el-tab-pane label="新增任务" name="second">
        <new-tasks></new-tasks>
      </el-tab-pane>
      <el-tab-pane label="历史数据" name="fourth">
        <homehistori-caldata></homehistori-caldata>
      </el-tab-pane>
      <el-tab-pane label="选项值添加" name="customer">
        <optionvalue></optionvalue>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
      <div class="del-dialog-cnt">是否退出登录</div>
      <span slot="footer" class="dialog-footer">
              <el-button @click="delVisible = false">取 消</el-button>
              <el-button type="primary" @click.stop="deleteRow">确定</el-button>
            </span>
    </el-dialog>
  </div>
</template>

<script>
    import HomepageTasks from './components/Homepagetasks' // 任务列表
    import NewTasks from './components/Newtasks' // 新增任务
    import HomehistoriCaldata from './components/Homehistoricaldata'
    import Optionvalue from './components/Optionvalue'

    export default {
        name: 'index',
        components: {
            HomepageTasks, // 任务列表
            NewTasks, // 新增任务
            HomehistoriCaldata, // 历史数据
            Optionvalue, // 属性数据新增
        },
        data() {
            return {
                activeName: 'first',
                Loginname: '', // 账户
                delVisible: false, // 提示删除
            }
        },
        created() {
            this.CookieList();
        },
        methods: {
            handleClick(tab, event) {
                // console.log(tab, event);
            },
            // 获取cookie数据
            CookieList() {
                const userName = this.getCookie('userName', userName);// 当前用户
                // console.log(userName);
                this.Loginname = userName;
            },
            exitwindow() {
                this.delVisible = true;
            },
            // 退出登录
            deleteRow() {
                this.delVisible = false;
                this.delCookie('stationCode'); //
                this.delCookie('depart'); //
                this.delCookie('employee');
                this.delCookie('userName');
                this.delCookie('stationSrt');
                this.$router.replace('/');
            },
        },
    }
</script>

<style lang="less" scoped>
  .index {
    .header {
      height: 50px;
      background-color: #0098cc;
      line-height: 50px;

      .login {
        margin-left: 20px;
        font-weight: 600;
        color: white;
        line-height: 50px;
      }

      .iconfont {
        float: right;
        margin-right: 10px;
        font-size: 30px;
        color: white;
        cursor: pointer;
      }

      .Signin {
        margin-right: 20px;
        float: right;
        color: white;
        cursor: pointer;
      }

      .el-dropdown-link {
        float: right;
        color: white;
      }

      .Exitwindow {
        float: right;
        margin-right: 60px;
        font-size: 14px;
        color: white;
        cursor: pointer;
      }
    }

    .el-tabs {
      /deep/ .el-tabs__header {
        margin: 0;
      }
    }
  }
</style>
