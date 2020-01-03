<template>
  <div class="Newtasks" :style="'height:'+fullHeight+'px'">
    <div class="span">
      <form class="form">
        <div style="margin-bottom: 20px;margin-left: 485px;">
          <label>
            序号
            <el-input style="margin-left: 25px" v-model="formMess.seqNum" :disabled="true"> placeholder="序号"></el-input>
          </label>
        </div>
        <label :style="left" class="BranchOffice">
          分公司
          <el-select style="width: 125px" v-model="formMess.companyCode" filterable placeholder="请选择">
            <el-option
              v-for="(item,index ) in Branchdata"
              :key="index"
              :label="item.companyName"
              :value="item.companyCode"
            >
            </el-option>
          </el-select>
        </label>
        <label :style="left" style="margin-left: 162px">
          工位编号
          <el-select style="width: 125px" @focus.stop.prevent="Workstation" v-model="formMess.stationCode" filterable
                     placeholder="请选择">
            <el-option
              v-for="(item,index ) in Workstationdata"
              :key="index"
              :label="item.stationName"
              :value="item.stationCode"
            >
            </el-option>
          </el-select>
        </label>
        <label :style="left">
          执行时间
          <el-date-picker
            v-model="formMess.executeTime"
            type="datetime"
            placeholder="选择日期时间"
            :picker-options="pickerOptions">
          </el-date-picker>
        </label>
        <div class="Two" :style="Top">
          <label :style="left">
            编码
            <el-input style="margin-left: 25px" v-model="formMess.areaCode" placeholder="请输入编码"></el-input>
            <el-button style="height: 30px;line-height: 9px" @click.stop.prevent="Copyvalue" type="primary" class="iconfont">&#xe61c;</el-button>
          </label>
          <label style="margin-left: 92px">
            喷码
            <el-input style="margin-left: 25px" v-model="formMess.markingCode" placeholder="请输入喷码"></el-input>
          </label>
          <label :style="left" style="margin-left: 155px">
            产品
            <el-select style="margin-left: 26px;width: 200px;" v-model="formMess.productName" placeholder="请选择">
              <el-option
                v-for="(item,index) in Productlistdata"
                :key="index"
                :label="item.productName"
                :value="item.productCode">
              </el-option>
            </el-select>
          </label>
        </div>
        <div class="Three" :style="Top">
          <label :style="left">
            需求数量
            <el-input v-model.number="formMess.totalPackages" style="width: 60px" placeholder="数量"></el-input>
            <label style="margin: 0">
              规格
              <el-select style="width: 195px" v-model="Calculationspecification" placeholder="请选择">
                <el-option
                  v-for="(item,index) in Specificationsdata "
                  :key="index"
                  :label="item.standardName"
                  :value="item.num">
                </el-option>
              </el-select>
            </label>
            <el-input @focus.stop.prevent="total" v-model="formMess.total" style="width: 90px"
                      placeholder="最终"></el-input>
          </label>
          <label style="margin-left: 226px">
            客户
            <el-select style="margin-left: 26px;width: 200px;" v-model="formMess.customer" placeholder="请选择">
              <el-option
                v-for="(item,index ) in Customerdata"
                :key="index"
                :value="item.customer">
              </el-option>
            </el-select>
          </label>
        </div>
        <div class="textarea" :style="Top">
          <label>
            备注
            <textarea v-model="formMess.remark" cols="30" rows="10"></textarea>
          </label>
        </div>
        <div class="bottom">
          <el-button type="primary" @click.stop.prevent="Sure">确定</el-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Newtasks",
        data() {
            return {
                fullHeight: document.documentElement.clientHeight - 92,
                formMess: {
                    stationCode: '', // 工位编号
                    executeTime: '', // 执行时间
                    productName: '', // 产品
                    seqNum: 0, // 序号
                    customer: '', // 客户
                    areaCode: '', // 编码
                    markingCode: '', // 喷码
                    total: 0, // 需求数量
                    remark: '', // 备注
                    companyCode: '', // 分公司
                    totalPackages: '', // 数量
                    userName: '' // 用户名
                },
                left: {marginLeft: '150px'}, // 向左边移动
                Top: {marginTop: '20px'}, // 距离上方距离
                Toptop: {marginTop: '20px'}, // 距离上方距离
                pickerOptions: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                Calculationspecification: '', // 需求当中的数量存储值
                Quantitativevalue: 0, // 需求数量值的存储
                Specificationsdata: [], // 下拉选项规格存储
                stationCode: '', // 工位cookie存储
                stationSrt: '', // 工位cookie存储
                userName: '', // 当前登录用户
                Companyselection: '', // 分公司的双向数据绑定
                Branchdata: [], // 分公司数据存储
                Workstationdata: [], // 工位数据
                Productlistdata: [], // 产品列表数据
                Customerdata: [], // 存储客户数据
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
        // 进入页面就请求数据
        created() {
            this.Specifications(); // 调取规格
            this.BranchOffice(); // 分公司调取数据
            this.Productlist(); //  产品列表数据调用
            this.Customer(); // 客户列表调用
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
            // 计算数量和规格 Calculationspecification
            total() {
                // 截取第一个值数量
                const one = this.formMess.totalPackages;
                // 截取第二个值规格值
                const two = this.Calculationspecification;
                if (two === 300) {
                    this.formMess.total = one * two
                } else if (two === 400) {
                    this.formMess.total = one * two
                    console.log(400)
                } else if (two == 220) {
                    this.formMess.total = one * two
                    console.log(220)
                }
            },
            // 新增功能的实现
            Sure() {
                const userName = this.getCookie('userName', userName)
                this.$axios({
                    method: 'post',
                    url: 'api/qrcodeplaning/addtask',
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'stationCode': this.stationCode,
                        'stationSrt': this.stationSrt,
                    },
                    withCredentials: true,
                    data: {
                        "data": {
                            "companyCode": this.formMess.companyCode,
                            "customer": this.formMess.customer,
                            "areaCode": this.formMess.areaCode,
                            "executeTime": this.formMess.executeTime,
                            "markingCode": this.formMess.markingCode,
                            "productName": this.formMess.productName,
                            "remark": this.formMess.remark,
                            "stationCode": this.formMess.stationCode,
                            "total": this.formMess.total,
                            "totalPackages": this.formMess.totalPackages,
                            "username": userName
                        }
                    }
                }).then(res => {
                    if (res.data.code == 200) {
                        this.formMess = {};
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        })
                        location.reload();
                    }
                }).catch(error => {
                    console.log(error);
                    this.$message.error('添加失败请检查是否填写正确')
                })
            },
            // 调取规格下拉选项
            Specifications() {
                const userName = this.getCookie('userName', userName);// 当前用户
                const stationCode = this.getCookie('stationCode', stationCode); // 工位
                const stationSrt = this.getCookie('stationSrt', stationSrt); // 工位srt
                this.formMess.userName = userName
                this.stationCode = stationCode;
                this.stationSrt = stationSrt;
                this.$axios({
                    method: 'get',
                    url: 'api/qrcodeplaning/standards',
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'stationCode': this.stationCode,
                        'stationSrt': this.stationSrt,
                    },
                    withCredentials: true,
                }).then(res => {
                    if (res.data.code == 200) {
                        this.Specificationsdata = res.data.data;
                    }
                })
            },
            // 分公司请求数据
            BranchOffice() {
                this.$axios({
                    method: 'get',
                    url: 'api/qrcodeplaning/companys',
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'stationCode': this.stationCode,
                        'stationSrt': this.stationSrt,
                    },
                    withCredentials: true,
                }).then(res => {
                    if (res.data.code == 200) {
                        this.Branchdata = res.data.data;
                    }
                })
            },
            // 调取工位
            Workstation() {
                this.$axios({
                    method: 'get',
                    url: 'api/qrcodeplaning/stationCodes/' + this.formMess.companyCode,
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'stationCode': this.stationCode,
                        'stationSrt': this.stationSrt,
                    },
                    withCredentials: true,
                }).then(res => {
                    if (res.data.code == 200) {
                        this.Workstationdata = res.data.data;
                    }
                })
            },
            // 调取产品列表
            Productlist() {
                this.$axios({
                    method: 'get',
                    url: 'api/qrcodeplaning/products',
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'stationCode': this.stationCode, // 工位
                        'stationSrt': this.stationSrt, // 工位srt
                    },
                    withCredentials: true,
                }).then(res => {
                    if (res.data.code == 200) {
                        this.Productlistdata = res.data.data;
                    }
                })
            },
            // 调取客户数据
            Customer() {
                this.$axios({
                    method: 'get',
                    url: 'api/qrcodeplaning/customers',
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'stationCode': this.stationCode, // 工位
                        'stationSrt': this.stationSrt, // 工位srt
                    },
                    withCredentials: true,
                }).then(res => {
                    if (res.data.code == 200) {
                        this.Customerdata = res.data.data;
                    }
                })
            },
            // 将编码数据值传输到喷码当中
            Copyvalue() {
                // 当检测到编码数据然后将数据添加到喷码当中
                const areaCode = this.formMess.areaCode
                this.formMess.markingCode = areaCode
            },
        }
    }
</script>

<style lang="less" scoped>
  .Newtasks {
    margin-top: 20px;

    .span {
      width: 1200px;
      height: 550px;
      margin: 0 auto;
      background-color: white;
      padding-top: 20px;

      .form {
        label {
          line-height: 30px;
          font-size: 13px;

          .el-input {
            width: 2.5rem;
            height: 30px;
            font-size: 13px;
            line-height: 30px;

            /deep/ .el-input__inner {
              height: 30px;
              line-height: 30px;
            }
          }

          /deep/ .el-date-editor {
            width: 200px;

            .el-input__prefix {
              .el-input__icon {
                line-height: 33px;
              }

              .el-icon-circle-close {
                line-height: 60px;
              }
            }
          }

          /deep/ .el-select {
            .el-input {
              .el-input__inner {
                height: 30px;
              }

              .el-input__suffix {
                line-height: 30px;

                .el-input__suffix-inner {
                }
              }
            }

            .el-input__suffix {
              .el-input__suffix-inner {
                .el-select__caret {
                  line-height: 30px;
                }

                .el-input__icon {
                  line-height: 30px;
                }
              }
            }
          }
        }

        .Tow {
          height: 30px;

          .Demandquantity {
            height: 30px;

            /deep/ .el-input-number {
              line-height: 30px;
              width: 202px;

              .el-input__inner {
                height: 30px;
              }
            }
          }
        }

        .textarea {
          label {
            margin-left: 150px;

            textarea {
              width: 870px;
              border: 1px solid #DCDFE6;
              resize: none;
              border-radius: 5px;
              margin-left: 25px;
            }
          }
        }

        .bottom {
          margin-top: 30px;

          .el-button {
            width: 120px;
            height: 40px;
            margin-left: 205px;
          }
        }

        .Three {
          label {
            margin-left: 55px;

            .el-cascader {
              /deep/ .el-input {
                .el-input__inner {
                  width: 140px;
                  height: 30px;
                }
              }
            }
          }
        }

        .BranchOffice {
          .el-select {
            margin-left: 12px;
          }
        }
      }
    }
  }
</style>
