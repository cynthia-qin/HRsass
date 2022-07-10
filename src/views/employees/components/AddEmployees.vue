<template>
  <el-dialog :visible="showDialog" title="新增员工" @close="onCancel">
    <el-form ref="addForm" label-width="120px" :model="FormData" :rules="rules">
      <el-form-item label="姓名" prop="username">
        <el-input
          v-model="FormData.username"
          style="width: 50%"
          placeholder="请输入姓名"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input
          v-model="FormData.mobile"
          style="width: 50%"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="FormData.timeOfEntry"
          style="width: 50%"
          placeholder="请选择入职时间"
        />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select
          v-model="FormData.formOfEmployment"
          style="width: 50%"
          placeholder="请选择"
        >
          <el-option
            v-for="item in EmployeeEnum.hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input
          v-model="FormData.workNumber"
          style="width: 50%"
          placeholder="请输入工号"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input
          v-model="FormData.departmentName"
          style="width: 50%"
          placeholder="请选择部门"
          @focus="getDepartments"
        />
        <el-tree
          v-if="showTree"
          v-loading="loading"
          default-expand-all
          :data="treeData"
          :props="{ label: 'name' }"
          @node-click="onClick"
        />
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker
          v-model="FormData.correctionTime"
          style="width: 50%"
          placeholder="请选择转正时间"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button @click="onCancel">取消</el-button>
          <el-button type="primary" @click="onConfirm">确认</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import { getDepartments } from '@/api/departments'
import { tranListToTreeList } from '@/utils'
import EmployeeEnum from '@/api/constant/employees'
import { addEmployee } from '@/api/employees'
export default {
  filters: {},
  components: {},
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // EmployeeEnum 必须要在data里注册了，html中才能使用
      EmployeeEnum,
      FormData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [{ required: true, message: '用户姓名不能为空', trigger: 'blur' }, {
          min: 1, max: 4, message: '用户姓名为1-4位'
        }],
        mobile: [{ required: true, message: '手机号不能为空', trigger: 'blur' }, {
          pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur'
        }],
        formOfEmployment: [{ required: true, message: '聘用形式不能为空', trigger: 'blur' }],
        workNumber: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
        // 这里用change触发方式是为了我们点击时不校验
        departmentName: [{ required: true, message: '部门不能为空', trigger: 'change' }],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }]
      },
      treeData: [],
      showTree: false, // 控制树形的显示或者隐藏
      loading: false // 控制树的显示或者隐藏进度条
    }
  },
  computed: {},
  watch: {},
  created () { },
  methods: {
    async getDepartments () {
      this.loading = true
      const { depts } = await getDepartments()
      this.treeData = tranListToTreeList(depts, '')
      this.showTree = true // 数据请求回来后再显示
      this.loading = false
    },
    onClick (node) {
      // console.log(node) node表示当前点击的部门的数据
      this.FormData.departmentName = node.name
      this.showTree = false
    },
    async onConfirm () {
      try {
        await this.$refs.addForm.validate()
        // 校验通过
        await addEmployee(this.FormData)
        // 通知父页面重新拉取数据  this.$parent可以获取到当前组件亲父亲的实例对象
        this.$parent.getDepartments && this.$parent.getDepartments()
        // 关闭弹出层
        this.$parent.showDialog = false
      } catch (err) {
        console.log(err)
      }
    },
    onCancel () {
      // 重置表单数据
      this.FormData = {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      }
      // 清空校验规则
      this.$refs.addForm.resetFields()
      // 关闭弹出层
      this.$emit('update:showDialog', false)
    }
  }
}
</script>

<style scoped>
</style>
