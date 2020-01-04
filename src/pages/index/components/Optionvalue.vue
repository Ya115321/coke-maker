<!-- 选项值添加 -->
<template>
  <div class="Optionvalue" :style="'height:'+fullHeight+'px'">
    <form class="span">
      <label>
        客户
        <el-input></el-input>
      </label>
    </form>
  </div>
</template>

<script>
    export default {
        name: "Optionvalue",
        data() {
            return {
                fullHeight: document.documentElement.clientHeight - 92,
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
            this.get_bodyHeight();
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
        }
    }
</script>

<style lang="less" scoped>
  .Optionvalue {
    height: 100%;
    font-size: 13px;
    .span {
      margin-top: 30px;

      label {
        .el-input {
          width: 120px;
          height: 30px;
          /deep/.el-input__inner{
            height: 30px;
          }
        }
      }
    }
  }
</style>
