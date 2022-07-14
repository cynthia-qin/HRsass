import Layout from '@/layout'
// 默认导出一条路由规则对象
export default {
  path: '/permission',
  name: 'permission',
  component: Layout,
  children: [{
    path: '',
    component: () => import('@/views/permission'),
    name: 'permission',
    meta: {
      title: '权限管理',
      icon: 'lock'
    }
  }]
}
