import Layout from '@/layout'
// 默认导出一条路由规则对象
export default {
  path: '/salarys',
  name: 'salarys',
  component: Layout,
  children: [{
    path: '',
    component: () => import('@/views/salarys'),
    meta: {
      title: '工资',
      icon: 'money'
    }
  }]
}
