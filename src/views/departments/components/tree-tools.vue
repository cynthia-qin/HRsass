<template>
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
    style="height: 40px; width: 100%"
  >
    <!-- 左边列 -->
    <el-col
      ><span>{{ treeNode.name }}</span></el-col
    >
    <!-- 右边列 -->
    <el-col :span="4">
      <!-- 控制内容flex -->
      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <!-- 下拉菜单 -->
          <el-dropdown>
            <span>操作<i class="el-icon-arrow-down"></i></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot">编辑子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot">删除子部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  components: {},
  props: {
    // 传入一个对象，根据对象里的内容渲染数据
    treeNode: {
      type: Object,
      required: true
    },
    // 判断当前使用插槽的是否是首行 ，首行就只有一个操作
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () { },
  methods: {}
}
</script>

<style scoped>
</style>
