<template>
  <el-dialog title="分配角色" :visible="showRoleDialog" @close="cancel">
    <!-- 角色多选框区域 -->
    <!-- 动态绑定选中的内容 -->
    <el-checkbox-group v-model="roleIds">
      <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id">{{
        item.name
      }}</el-checkbox>
    </el-checkbox-group>
    <!-- 底部按钮区域 -->
    <template #footer>
      <el-row type="flex" justify="center">
        <el-col :span="8">
          <el-button size="small" @click="cancel">取消</el-button>
          <el-button size="small" type="primary" @click="confirm"
            >确认</el-button
          >
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import { getRoleList } from '@/api/setting'
import { getUserInfoById } from '@/api/user'
import { assignRoles } from '@/api/employees'
export default {
  filters: {},
  components: {},
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false
    },
    userId: {
      type: [Number, String],
      default: null
    }
  },
  data () {
    return {
      roleList: [], // 所有的角色
      roleIds: [] // 当前用户的角色
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getRoleList()
  },
  methods: {
    // 获取所有的角色
    async getRoleList () {
      const { rows } = await getRoleList({
        page: 1,
        pageSize: 20
      })
      this.roleList = rows
    },
    // 因为这个事件是点击角色时触发，而props传值是异步的，因此这个函数应该由父组件来调用
    async getUserInfoById (id) {
      const { roleIds } = await getUserInfoById(id)
      this.roleIds = roleIds
    },
    // 点击确认
    async confirm () {
      // 发起请求
      await assignRoles({
        id: this.userId,
        roleIds: this.roleIds
      })
      // 关闭弹层
      this.$emit('update:showRoleDialog', false)
    },
    // 点击取消
    cancel () {
      // 清空选择的角色
      this.roleIds = []
      // 关闭弹层
      this.$emit('update:showRoleDialog', false)
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
