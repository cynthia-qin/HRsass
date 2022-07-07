<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 卡片 -->
      <el-card class="tree-card">
        <!-- 首行 -->
        <tree-tools :tree-node="company" :is-root="true" />
        <el-tree :data="departs" :props="defaultProps" default-expand-all>
        <!-- 因为el-tree会根据data接收的数组的长度循环内部tree-tools，没循环一次就会有一个新的node和data产生 表示的是当前循环项的数据 我们可以根据这个渲染数据 -->
          <tree-tools slot-scope="{ data }" :tree-node="data" />
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import treeTools from './components/tree-tools.vue'
export default {
  components: {
    treeTools
  },
  data () {
    return {
      departs: [
        { name: '总裁办', manager: '曹操', children: [{ name: '董事会', manager: '曹丕' }] },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }],
      defaultProps: {
        label: 'name'
      },
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人' }
    }
  }
}
</script>

<style>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
