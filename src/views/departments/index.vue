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
            @editDepts="editDepts"
          />
        </el-tree>
      </el-card>
    </div>
    <addDepts
      ref="editDialog"
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
      node: null // 用于接收点击新增或编辑部门时被点击部门的数据
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
    },
    editDepts (node) {
      this.showDialog = true
      this.node = node
      // 因为props传值是异步的，如果我们在子组件内部使用父组件传过去的node的id值可能会出现获取不到的情况，因此我们通过ref在父组件内调用子组件的函数
      this.$refs.editDialog.getDepartDetails(node.id)
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
