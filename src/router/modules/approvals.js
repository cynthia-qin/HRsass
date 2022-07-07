import Layout from '@/layout'
// 默认导出一条路由规则对象
export default {
  path: '/approvals',
  name: 'approvals',
  component: Layout,
  children: [{
    path: '',
    component: () => import('@/views/approvals'),
    meta: {
      title: '审批',
      icon: 'tree-table'
    }
  }]
}
