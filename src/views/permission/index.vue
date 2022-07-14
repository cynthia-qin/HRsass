<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <template #after>
          <el-button
            size="small"
            type="primary"
            :disabled="checkPermission('add-perm')"
            @click="addPermission(1, '0')"
            >添加权限</el-button
          >
        </template>
      </page-tools>
      <el-table :data="list" row-key="id">
        <el-table-column
          align="center"
          label="名称"
          prop="name"
        ></el-table-column>
        <el-table-column
          align="center"
          label="标识"
          prop="code"
        ></el-table-column>
        <el-table-column
          align="center"
          label="描述"
          prop="description"
        ></el-table-column>
        <el-table-column align="center" label="操作">
          <!-- 通过作用域插槽获取到每一行的数据 -->
          <template v-slot="{ row }">
            <!-- 我们只对一级权限进行添加 所以只有一级权限显示添加按钮 -->
            <el-button
              v-if="row.type === 1"
              type="text"
              @click="addPermission(2, row.id)"
              >添加</el-button
            >
            <el-button type="text" @click="getPermissionDetail(row.id)"
              >编辑</el-button
            >
            <el-button type="text" @click="delPermission(row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增/编辑的弹层 -->
    <el-dialog :visible="showDialog" title="新增编辑" @close="cancel">
      <el-form
        ref="permForm"
        label-width="120px"
        :model="formData"
        :rules="rules"
      >
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="formData.name" style="width: 90%"></el-input>
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input v-model="formData.code" style="width: 90%"></el-input>
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input
            v-model="formData.description"
            style="width: 90%"
          ></el-input>
        </el-form-item>
        <el-form-item label="开启">
          <!-- 当我们给switch绑定的值不是布尔值的时候 我们就需要指定什么状态是开，什么状态是关 -->
          <el-switch
            v-model="formData.enVisible"
            active-value="1"
            inactive-value="0"
          ></el-switch>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-row type="flex" justify="center">
          <el-col :span="6">
            <el-button size="small" @click="cancel">取消</el-button>
            <el-button size="small" type="primary" @click="confirm"
              >确认</el-button
            >
          </el-col>
        </el-row>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getPermissionList, delPermission, addPermission, updatePermission, getPermissionDetail } from '@/api/permission'
import { tranListToTreeList } from '@/utils/index'
export default {
  data () {
    return {
      list: [], // 所有的权限数据
      showDialog: false, // 控制新增 编辑弹出层
      formData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      },
      rules: { // 表单校验规则
        name: [{ required: true, message: '权限名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.getPermissionList()
  },
  methods: {
    // 获取所有的权限信息
    async getPermissionList () {
      // await getPermissionList() 返回的就是一个数组
      this.list = tranListToTreeList(await getPermissionList(), '0')
    },
    // 删除权限
    async delPermission (id) {
      try {
        await this.$confirm('确定要删除该权限吗？')
        // 确定删除
        await delPermission(id)
        this.$message.success('删除权限点成功')
        this.getPermissionList()
      } catch (err) {
        console.log('取消删除')
        console.log(err)
      }
    },
    // 点击新增/添加权限
    addPermission (type, pid) {
      // type = 1 访问权限 type=2 操作权限 访问权限的pid = '0',操作权限的pid等于他父级权限的id
      this.formData.type = type
      this.formData.pid = pid
      // 弹出弹层
      this.showDialog = true
    },
    // 点击确认按钮
    confirm () {
      // 校验表单
      this.$refs.permForm.validate().then(() => {
        // 校验成功 发起请求
        // 判断当前是编辑还是新增
        if (this.formData.id) {
          // 编辑权限
          return updatePermission(this.formData)
        }
        // 新增/添加权限
        return addPermission(this.formData)
      }).then(() => {
        // 发起请求成功
        this.$message.success('添加权限成功')
        // 重新拉取数据
        this.getPermissionList()
        // 关闭弹层
        this.showDialog = false
      })
    },
    // 点击编辑按钮 回写数据
    async getPermissionDetail (id) {
      // 先获取数据
      this.formData = await getPermissionDetail(id)
      // 再弹出弹出层 这样不会有卡顿
      this.showDialog = true
    },
    // 点击取消按钮
    cancel () {
      // 重置formData内容
      this.formData = {
        name: '',
        code: '',
        description: '',
        type: '',
        pid: '',
        enVisible: '0'
      }
      // 清除表单校验
      this.$refs.permForm.resetFields()
      // 关闭弹出层
      this.showDialog = false
    }
  }

}
</script>

<style>
</style>
