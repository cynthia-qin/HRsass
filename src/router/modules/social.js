import Layout from '@/layout'
// 默认导出一条路由规则对象
export default {
  path: '/social',
  name: 'social',
  component: Layout,
  children: [{
    path: '',
    component: () => import('@/views/social'),
    meta: {
      title: '社保',
      icon: 'table'
    }
  }]
}
