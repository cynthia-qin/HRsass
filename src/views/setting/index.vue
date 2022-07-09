<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="角色管理">
            <el-row style="height: 60px">
              <el-button
                size="small"
                type="primary"
                icon="el-icon-plus"
                @click="showDialog = true"
                >新增角色</el-button
              >
            </el-row>
            <el-table border="" :data="list">
              <el-table-column
                align="center"
                type="index"
                label="序号"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="角色"
                width="240"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="description"
                label="描述"
                align="center"
              ></el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="{ row }">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button
                    size="small"
                    type="primary"
                    @click="editRole(row.id)"
                    >编辑</el-button
                  >
                  <el-button
                    size="small"
                    type="danger"
                    @click="delRoleList(row.id)"
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
                :current-page.sync="page.page"
                :page-size="page.pagesize"
                :total="page.total"
                layout="prev,pager,next"
                @current-change="onChange"
              ></el-pagination>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <el-form label-width="120px" style="margin-top: 50px">
              <el-form-item label="公司名称">
                <el-input
                  v-model="fromData.name"
                  disabled
                  style="width: 400px"
                ></el-input>
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input
                  v-model="fromData.companyAddress"
                  disabled
                  style="width: 400px"
                ></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input
                  v-model="fromData.mailbox"
                  disabled
                  style="width: 400px"
                ></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  v-model="fromData.remarks"
                  type="textarea"
                  :rows="3"
                  disabled
                  style="width: 400px"
                ></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <!-- 点击编辑或者新增弹出弹出层 -->
    <el-dialog :visible="showDialog" title="编辑角色" @close="onCancel">
      <el-form
        ref="roleForm"
        label-width="120px"
        :model="roleForm"
        :rules="roleRules"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="roleForm.description"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-row type="flex" justify="center">
          <el-col :span="8">
            <el-button type="default" @click="onCancel">取消</el-button>
            <el-button type="primary" @click="onConfirm">确认</el-button>
          </el-col>
        </el-row>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getRoleList, getCompanyInfo, delRoleList, getRoleDetails, updateRole, addRole } from '@/api/setting'
export default {
  data () {
    return {
      list: [], // 表示所有的角色数据
      page: {
        page: 1, // 当前页码
        pagesize: 10, // 每页条数
        total: 0
      },
      fromData: {}, // 用来接收公司信息
      showDialog: false,
      roleForm: { // 用来表示点击编辑或新增时表单的数据
        name: '',
        description: ''
      },
      roleRules: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  created () {
    this.getRoleList()
    this.getCompanyInfo()
  },
  methods: {
    async getRoleList () {
      const { rows, total } = await getRoleList(this.page)
      this.list = rows
      this.page.total = total
    },
    onChange (val) {
      // console.log(val)
      this.page.page = val
      this.getRoleList()
    },
    async getCompanyInfo () {
      this.fromData = await getCompanyInfo(this.companyId)
    },
    async delRoleList (id) {
      try {
        await this.$confirm('确认删除该角色吗？')
        // 点击确认进入这里
        await delRoleList(id)
        // 删除完成后重新获取角色数据
        this.getRoleList()
      } catch (err) {
        // 进入这里表示点击了取消
        console.log(err)
      }
    },
    async editRole (id) {
      this.roleForm = await getRoleDetails(id)
      this.showDialog = true // 关闭弹出层放在请求数据后面这样能保证弹出层弹出时，里面一定有数据
    },
    // 点击确认触发
    async onConfirm () {
      try {
        // 先进行表单校验  validate如果不穿参数则返回一个Promise函数
        await this.$refs.roleForm.validate()
        // 校验成功
        if (this.roleForm.id) {
          // 编辑角色详情
          await updateRole(this.roleForm)
        } else {
          // 新增角色
          await addRole(this.roleForm)
        }
        // 请求发送成功之后
        this.getRoleList() // 重新拉取数据
        this.$message.success('操作成功')// 提示信息
        this.showDialog = false // 关闭弹出层
      } catch (err) {
        // 校验失败
        console.log(err)
      }
    },
    onCancel () {
      this.roleForm = { // 清空表单
        name: '',
        description: ''
      }
      this.$refs.roleForm.resetFields() // 清除校验规则
      this.showDialog = false // 关闭弹出层
    }
  }
}
</script>

<style>
</style>
