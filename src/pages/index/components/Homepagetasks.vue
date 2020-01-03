<template>
  <div class="indextask">
    <div class="search">
      <el-input v-model="keywords" placeholder="请输入内容"></el-input>
    </div>
    <!-- 数据 -->
    <div class="span">
      <!-- 搜索前的数据 -->
      <el-table
        :height="tableHeight"
        :row-style="{height:'20px'}"
        :cell-style="{padding:'0px'}"
        :data="search(keywords)"
        :show-overflow-tooltip="true"
        style="width: 100%;font-size:12px;height: 740px; max-height: 900px;">
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <el-button @click.stop.prevent="editGroup(scope.$index,scope)" size="small">编辑</el-button>
            <el-button
              @click.stop.prevent="handleDelete(scope.$index, scope.row)"
              type="text"
              size="small"
            >移除
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="seqNum" label="序号 " width="120"></el-table-column>
        <el-table-column prop="companyCode" label="公司编号" width="120">{{this.depart}}</el-table-column>
        <el-table-column prop="stationCode" label="工位编号" width="150">{{this.stationCode}}</el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="name" label="任务名称" width="120"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="120" :formatter="dateFormdate"></el-table-column>
        <el-table-column prop="executeTime" label="执行时间" width="120" :formatter="dateFormdate"></el-table-column>
        <el-table-column prop="finishTime" label="完成时间" width="120" :formatter="dateFormdate"></el-table-column>
        <el-table-column prop="productName" label="产品" width="120"></el-table-column>
        <el-table-column prop="customer" label="客户" width="120"></el-table-column>
        <el-table-column prop="areaCode" label="编码" width="120"></el-table-column>
        <el-table-column prop="markingCode" label="喷码" width="120"></el-table-column>
        <el-table-column prop="typeCode" label="任务状态" :formatter="filedFormat" width="120"></el-table-column>
        <el-table-column prop="total" label="需求数量" width="120"></el-table-column>
        <el-table-column prop="curNum" label="当前数量" width="120"></el-table-column>
        <el-table-column prop="remark" label="备注" width="120"></el-table-column>
      </el-table>
    </div>
    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="delVisible = false">取 消</el-button>
          <el-button type="primary" @click.stop="deleteRow">确定</el-button>
        </span>
    </el-dialog>
    <!-- 分页 -->
    <div class="block" style="position: relative;top: -12px;left:5px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10]"
        :page-size="1"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!--    修改数据   -->
    <div class="EditdataPopup" v-show="EditdataPopup" @mousedown="move">
      <h3>修改数据 <i class="iconfont" @click.stop.prevent="Modifywindow">&#xe62b;</i></h3>
      <div class="windwodata">
        <form>
          <label>
            当前数量
            <el-input v-model="shuliang" placeholder="数量"></el-input>
          </label>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Homepagetasks",
        data() {
            return {
                tableHeight: 740, // el-table数据定高
                data: [
                    {
                        id: 1
                    },
                    {
                        id: 2
                    },
                    {
                        id: 3
                    }
                ],
                currentPage: 1, // 当前页码
                pageSize: 10, // 数据显示数量
                total: 0, // 数据条数
                delVisible: false, // 删除控件选项
                keywords: '', // 输入的值
                goods: [], // 数据条数
                activeIndex: undefined, // 选中表格index
                editGroupInfo: [], // 合同修改获取的值
                EditdataPopup: false, // 编辑显示与不显示的窗口
                formMess: {
                    companyCode: '', // 公司编号
                    stationCode: '', // 工位编号
                    executeTime: '', // 执行时间
                    productName: '', // 产品
                    seqNum: '', // 序号
                    customer: '', // 客户
                    areaCode: '', // 编码
                    markingCode: '', // 喷码
                    total: '', // 需求数量
                    remark: '', // 备注
                },
                left: {marginLeft: '150px'}, // 向左边移动
                Top: {marginTop: '20px'}, // 距离上方距离
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
                positionX: 0, // 拖拽重置为0
                positionY: 0, // 拖拽重置为0
                position: {x: 0, y: 0},
                shuliang: '',
                stationCode: '', // 工位code
                stationSrt: '', // 工位srt
                depart: '', // 部门
            }
        },
        created() {
            this.initList()
            // this.Obtaincookie()
        },
        methods: {
            // 时间格式化
            dateFormdate(row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return ''
                }
                return this.$moment(date).format('YYYY-MM-DD HH:DD')
            },
            // 当前改变----当前页码改变之后，触发这个函数
            handleCurrentChange(val) {
                this.currentPage = val;
                this.initList()
            },
            //  长度改变----改变每页显示的条数的时候  自动触发
            handleSizeChange(val) {
                this.pageSize = val;
                this.initList()
            },
            // 请求数据
            initList() {
                const stationCode = this.getCookie('stationCode', stationCode)
                const stationSrt = this.getCookie('stationSrt', stationSrt)
                const depart = this.getCookie('depart', depart)
                this.stationCode = stationCode
                this.stationSrt = stationSrt
                this.depart = depart
                this.$axios({
                    method: 'post',
                    url: 'api/qrcodeplaning/list?offset=' +
                        (this.currentPage > 0 ? this.currentPage - 1 : 0) * this.pageSize +
                        '&limit=' +
                        this.pageSize,
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'stationCode': this.stationCode,
                        'stationSrt': this.stationSrt,
                    },
                    withCredentials: true,
                }).then(res => {
                    this.goods = res.data.rows
                    this.total = res.data.total
                })
            },
            // 编辑数据
            editGroup(index, gropList) {
                this.EditdataPopup = true;
                // this.activeIndex = index;
                // //  这样就不会共用同一个对象,避免对话框内容改变的时候遮罩层下面跟着改变
                // this.editGroupInfo = Object.assign({}, gropList.row);
                // this.editGroupDialog = true;
                // this.Equipmentmodification = true;
                console.log('触发编辑')
            },
            // 拖拽
            move(e) {
                let odiv = e.target; // 获取目标元素
                // 算出鼠标相对元素的位置
                let disX = e.clientX - odiv.offsetLeft;
                let disY = e.clientY - odiv.offsetTop;
                document.onmousemove = e => {
                    // 鼠标按下并移动的事件
                    // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                    let left = e.clientX - disX;
                    let top = e.clientY - disY;

                    // 绑定元素位置到positionX和positionY上面
                    this.positionX = top;
                    this.positionY = left;
                    // 移动当前元素
                    odiv.style.left = left + 'px';
                    odiv.style.top = top + 'px';
                };
                document.onmouseup = e => {
                    document.onmousemove = null;
                    document.onmouseup = null;
                }
            },
            // 当被点击删除按钮的时候会获取到数据中的具体那一数据项
            handleDelete(index, row) {
                this.idx = index;
                this.delarr = row.id;
                this.delVisible = true;
            },
            // 点击删除后会出现弹窗是否删除点击确定删除数据
            deleteRow(index) {
                // this.$axios
                //     .delete('api/eqp/preInstallcheck/remove/' + this.delarr)
                //     .then(res => {
                //         if (res.data.code == 0) {
                //             this.$message({
                //                 message: '删除成功',
                //                 type: 'success'
                //             })
                //             this.initList() // 删除成功重新调用数据函数
                //         }
                //     })
                //     .catch(error => {
                //         console.log(error)
                //         this.$message.error('删除失败')
                //     })
                // this.delVisible = false
            },
            //  关闭窗口事件
            Modifywindow() {
                this.EditdataPopup = false;
            },
            // 根据关键字,进行数据搜索
            search(keywords) {
                return this.goods.filter(item => {
                    if (item.name.includes(keywords)) {
                        return item
                    } else if (item.productName.includes(keywords)) {
                        return item
                    } else if (item.customer.includes(keywords)) {
                        return item
                    } else if (item.markingCode.includes(keywords)) {
                        return item
                    }
                })
            },
            // 转换字符串
            filedFormat(row, column) {
                let s = row.typeCode
                if (s === -1) {
                    return '未执行'
                } else {
                    return '已执行'
                }
                //return this.$moment(date).format("YYYY-MM-DD");
            },
        }
    }
</script>

<style lang="less" scoped>
  .indextask {
    .search {
      height: 50px;
      line-height: 50px;
      margin-left: 20px;

      .el-input {
        width: 150px;
        height: 30px;

        /deep/ .el-input__inner {
          height: 30px;
        }
      }
    }

    .block {
      margin-top: 20px;
    }

    .EditdataPopup {
      position: absolute;
      width: 500px;
      height: 360px;
      border: 1px solid #cccccc;
      border-radius: 5px;
      z-index: 100;
      left: 100px;
      top: 20px;
      background-color: white;

      h3 {
        height: 40px;
        line-height: 40px;
        padding-left: 20px;
        background-color: #0098cc;
        margin-top: 20px;
        color: white;

        .iconfont {
          float: right;
          font-size: 20px;
          margin-right: 10px;
          cursor: pointer;
        }
      }

      .windwodata {
        margin-left: 20px;
        line-height: 200px;

        form {
          label {
            .el-input {
              position: static;
              width: 130px;

              .el-input__inner {
                width: 130px;
              }
            }
          }
        }
      }
    }
  }
</style>
