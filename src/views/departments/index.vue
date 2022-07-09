<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 卡片 -->
      <el-card class="tree-card">
        <!-- 首行 -->
        <tree-tools
          :tree-node="company"
          :is-root="true"
          @add-depts="addDepts"
        />
        <el-tree :data="departs" :props="defaultProps" default-expand-all>
          <!-- 因为el-tree会根据data接收的数组的长度循环内部tree-tools，没循环一次就会有一个新的node和data产生 表示的是当前循环项的数据 我们可以根据这个渲染数据 -->
          <tree-tools
            slot-scope="{ data }"
            :tree-node="data"
            @delDep="getDepartments"
            @add-depts="addDepts"
          />
        </el-tree>
      </el-card>
    </div>
    <addDepts
      :show-dialog.sync="showDialog"
      :tree-node="node"
      @addDepts="getDepartments"
    />
  </div>
</template>

<script>
import { tranListToTreeList } from '@/utils'
import { getDepartments } from '@/api/departments'
import treeTools from './components/tree-tools.vue'
import addDepts from './components/add-depts.vue'
export default {
  components: {
    treeTools,
    addDepts
  },
  data () {
    return {
      departs: [],
      defaultProps: {
        label: 'name'
      },
      // 这里添加id的作用时为了后面添加子部门时，通过""字符串判断，是否有部门重复
      company: { name: 'xxxx有限公司', manager: '负责人', id: '' },
      showDialog: false,
      node: null
    }
  },
  created () {
    this.getDepartments()
  },
  methods: {
    async getDepartments () {
      try {
        const result = await getDepartments()
        console.log(result)
        // // 这里添加id的作用时为了后面添加子部门时，通过""字符串判断，是否有部门重复
        // this.company = { name: 'xxxx有限公司', manager: '负责人', id: '' }
        this.departs = tranListToTreeList(result.depts, '')
      } catch (err) {
        console.log(err)
      }
    },
    addDepts (node) {
      this.showDialog = true
      this.node = node
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
