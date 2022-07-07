import Layout from '@/layout'
// 默认导出一条路由规则对象
export default {
  path: '/attendances',
  name: 'attendances',
  component: Layout,
  children: [{
    path: '',
    component: () => import('@/views/attendances'),
    meta: {
      title: '考勤',
      icon: 'skill'
    }
  }]
}
