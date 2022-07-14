import Layout from '@/layout'
// 默认导出一条路由规则对象
export default {
  path: '/setting',
  name: 'setting',
  component: Layout,
  children: [{
    path: '',
    component: () => import('@/views/setting'),
    name: 'settings',
    meta: {
      title: '公司设置',
      icon: 'setting'
    }
  }]
}
