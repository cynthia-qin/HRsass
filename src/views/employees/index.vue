<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="true">
        <template #before>
          <span>共{{ page.total }}条数据</span>
        </template>
        <template #after>
          <el-button
            size="small"
            type="success"
            @click="$router.push('/import')"
            >excel导入</el-button
          >
          <el-button size="small" type="info" @click="FuzaExport"
            >复杂表头excel导出</el-button
          >
          <el-button size="small" type="danger" @click="exportDataByExcel"
            >excel导出</el-button
          >
          <el-button size="small" type="primary" @click="showDialog = true"
            >新增员工</el-button
          >
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table :data="list">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="头像" width="120px" align="center">
            <template slot-scope="{ row }">
              <!-- <img :src="row.staffPhoto" alt=""> -->
              <img
                v-imagerror="require('@/assets/common/head.jpg')"
                style="border-radius: 50%; width: 100px; height: 100px"
                :src="row.staffPhoto"
                fit="cover"
                @click="showQrCode(row.staffPhoto)"
              />
            </template>
          </el-table-column>
          <el-table-column label="手机号" sortable="" prop="mobile" />
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable=""
            prop="formOfEmployment"
            :formatter="formatEmployment"
          />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
            <template v-slot="{ row }">
              {{ row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="" prop="enableState">
            <template v-slot="{ row }">
              <el-switch :value="row.enableState === 1"> </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template v-slot="{ row }">
              <el-button
                type="text"
                size="small"
                @click="
                  $router.push({
                    name: 'employeesDetails',
                    params: { id: row.id },
                  })
                "
                >查看</el-button
              >
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small" @click="editRole(row.id)"
                >角色</el-button
              >
              <el-button type="text" size="small" @click="delEmployee(row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            :current-page="page.page"
            :total="page.total"
            :page-size="page.size"
            layout="prev,pager,next"
            @current-change="onChange"
          ></el-pagination>
        </el-row>
      </el-card>
    </div>
    <AddEmployees :show-dialog.sync="showDialog" />
    <!-- 显示头像二维码弹层 -->
    <el-dialog title="二维码" :visible.sync="showCanvas">
      <el-row type="flex" justify="center">
        <canvas ref="myCanvas"></canvas>
      </el-row>
    </el-dialog>
    <!-- 角色分配弹出层 -->
    <assignRole
      ref="roleRef"
      :show-role-dialog.sync="showRoleDialog"
      :user-id="userId"
    />
  </div>
</template>

<script>
import assignRole from './components/assign-role.vue'
import AddEmployees from './components/AddEmployees.vue'
import EmployeeEnum from '@/api/constant/employees'
import { getEmployeesList, delEmployee } from '@/api/employees'
import { formatDate } from '@/filters'
import QrCode from 'qrcode'
let multiHeader = []
let merges = []
export default {
  components: {
    AddEmployees, // 新增员工弹出层
    assignRole // 角色分配弹出层
  },
  data () {
    return {
      showCanvas: false, // 控制头像二维码弹出层的弹出
      list: [], // 存放员工列表
      page: {
        page: 1, // 表示当前页码
        size: 10, // 表示每页条数
        total: 0 // 表示总数量
      },
      showDialog: false, // 控制新增员工弹出层弹出
      // treeData: []
      loading: false, // 显示遮罩层
      showRoleDialog: false,
      userId: ''
    }
  },
  created () {
    this.getEmployeesList()
  },
  methods: {
    async getEmployeesList () {
      const { total, rows } = await getEmployeesList(this.page)
      // console.log(rows)
      this.page.total = total
      this.list = rows
    },
    onChange (val) {
      // 将点击的新页码值赋给page.page，再重新发起请求
      this.page.page = val
      this.getEmployeesList()
    },
    formatEmployment (row, column, cellValue, index) {
      //  cellValue表示当前单元格的值
      const obj = EmployeeEnum.hireType.find(item => item.id === cellValue)
      return obj ? obj.value : '未知'
    },
    async delEmployee (id) {
      try {
        await this.$confirm('确认删除该员工吗？')
        // 点击确认后执行
        await delEmployee(id)
        this.$message.success('删除成功')
        this.getEmployeesList() // 重新拉取数据
      } catch (err) {
        console.log(err)
      }
    },
    exportDataByExcel () {
      // 定义对应关系- 把英文的key转化成中文的key所对应的值
      const headers = {
        '姓名': 'username',
        '手机': 'mobile',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      // 懒加载 只有点击导出才会引入这个模块 excel是导出的模块的实例对象
      import('@/vendor/Export2Excel').then(async excel => {
        // 获取所有的员工列表
        const { rows } = await getEmployeesList({ page: 1, size: this.page.total })
        const data = this.formatJson(headers, rows)
        console.log(data)
        excel.export_json_to_excel({
          header: Object.keys(headers), // 导出的表格头部数组
          data,
          filename: '员工列表',
          multiHeader,
          merges
        })
        multiHeader = []
        merges = []
      })
    },
    formatJson (headers, rows) {
      // 调用函数，返回的值
      return rows.map(item => {
        // 返回一个二维数组，数组每一项是每一个员工的数据
        return Object.keys(headers).map(key => {
          // 返回一个数组，数组每一项是每个属性对应的值
          if (headers[key] === 'timeOfEntry' || headers[key] === 'correctionTime') {
            return formatDate(item[headers[key]])
          } else if (headers[key] === 'formOfEmployment') {
            const obj = EmployeeEnum.hireType.find(obj => obj.id === item[headers[key]])
            return obj ? obj.value : '未知'
          }
          return item[headers[key]]
        })
      })
    },
    FuzaExport () {
      multiHeader = [['姓名', '主要信息', '', '', '', '', '部门']]
      merges = ['A1:A2', 'B1:F1', 'G1:G2']
      console.log(this.multiHeader, this.merges)
      this.exportDataByExcel()
    },
    showQrCode (url) {
      // 先判断 当前点击的用户头像是否存在
      if (url) {
        // 弹出弹出层
        this.showCanvas = true
        // 因为在vue中数据更新是同步的，但视图渲染是异步的，虽然此时showCanvas的值已经更改为true,但是页面中弹层还未渲染出来，所以取不到myCanvas这个ref实例对象
        this.$nextTick(() => {
          QrCode.toCanvas(this.$refs.myCanvas, url)
        })
      } else {
        // 弹出提示框
        this.$message.warning('该用户还未上传头像')
      }
    },
    async editRole (id) {
      // 强制等待，数据请求回来了再弹出弹出层
      await this.$refs.roleRef.getUserInfoById(id)
      this.showRoleDialog = true
      this.userId = id
    }
  }

}
</script>

<style>
</style>
