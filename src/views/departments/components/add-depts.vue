<template>
  <el-dialog :title="showTitle" :visible="showDialog" @close="onCancel">
    <el-form
      ref="loginForm"
      label-width="120px"
      :model="formData"
      :rules="fromRules"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input
          v-model="formData.name"
          style="width: 80%"
          placeholder="1-50个字符"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          v-model="formData.code"
          style="width: 80%"
          placeholder="1-50个字符"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          v-model="formData.manager"
          style="width: 80%"
          placeholder="请选择"
          @focus="getEmployeesSimple"
        >
          <el-option
            v-for="item in peoples"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          v-model="formData.introduce"
          style="width: 80%"
          placeholder="1-300个字符"
          type="textarea"
          :rows="3"
        >
        </el-input>
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center">
      <el-col>
        <el-button size="small" @click="onCancel">取 消</el-button>
        <el-button size="small" type="primary" @click="onConfirm"
          >确 定</el-button
        >
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getEmployeesSimple } from '@/api/employees'
import { getDepartments, addDepartments, getDepartDetails, editDepartById } from '@/api/departments'
export default {
  filters: {},
  components: {},
  props: {
    // 表示弹出框是否显示
    showDialog: {
      type: Boolean,
      required: true
    },
    treeNode: {
      type: Object,
      default: null
    }
  },
  data () {
    // 校验同级部门名称是否重复
    const checkNameRepate = async (rule, value, callback) => {
      // 先获取所有的数据
      const { depts } = await getDepartments()

      let isRepate = null
      // 判断form表单数据里有没有id，如果有就代表编辑操作
      if (this.formData.id) {
        // 获取当前部门的所有同级部门，排除自身的数据
        isRepate = depts.filter(item => item.pid === this.treeNode.pid && item.id !== this.treeNode.id).some(item => item.name === value)
      } else {
        // 先获取到当前添加部门的子部门数据
        const children = depts.filter(item => item.pid === this.treeNode.id)
        // 判断子部门数据中是否有和名字和value相等的部门
        isRepate = children.some(item => item.name === value)
      }
      return isRepate ? callback(new Error(`当前部门下已经有${value}这个部门了`)) : callback()
    }

    // 校验部门编码在所有部门中是否重复
    const checkCodeRepate = async (rule, value, callback) => {
      // 先获取所有的数据
      const { depts } = await getDepartments()
      let isRepate = null
      if (this.formData.id) {
        // 先获取除自己之外的数据，再判断里面有没有code和当前value相等的
        isRepate = depts.filter(item => item.id !== this.treeNode.id).some(item => item.code === value)
      } else {
        // 判断获取到的数据里有没有和当前value相等的code 并且value不为空
        isRepate = depts.some(item => item.code === value && value)
      }
      return isRepate ? callback(new Error(`当前部门编码${value}已经存在了`)) : callback()
    }
    return {
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      fromRules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '长度必须为1~50个字符', trigger: 'blur' },
          { validator: checkNameRepate, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '长度必须为1~50个字符', trigger: 'blur' },
          { validator: checkCodeRepate, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '部门管理者不能为空', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { min: 1, max: 300, message: '长度必须为1~300个字符', trigger: 'blur' }
        ]
      },
      peoples: []
    }
  },
  computed: {
    showTitle () {
      return this.formData.id ? '编辑部门' : '新增部门'
    }
  },
  watch: {},
  created () { },
  methods: {
    async getEmployeesSimple () {
      this.peoples = await getEmployeesSimple()
    },
    onConfirm () {
      this.$refs.loginForm.validate(async isOk => {
        if (isOk) {
          if (this.formData.id) {
            await editDepartById(this.formData)
          } else {
            await addDepartments({
              ...this.formData,
              pid: this.treeNode.id
            })
          }
          // 让父页面重新拉去数据
          this.$emit('addDepts')
          // 关闭弹出层 并且会自动调用dialog的close事件，
          this.$emit('update:showDialog', false)
        }
      })
    },
    onCancel () {
      // 重置数据  因为resetFields 只能重置 表单上的数据 非表单上的 比如 编辑中id 不能重置
      this.formData = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
      // 关闭弹层
      this.$emit('update:showDialog', false)
      // 移除校验 并且清空表单数据
      this.$refs.loginForm.resetFields()
    },
    async getDepartDetails (id) {
      this.formData = await getDepartDetails(id)
    }
  }
}
</script>

<style scoped>
</style>
