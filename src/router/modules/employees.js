import Layout from '@/layout'
// 默认导出一条路由规则对象
export default {
  path: '/employees',
  name: 'employees',
  component: Layout,
  children: [{
    path: '',
    component: () => import('@/views/employees'),
    meta: {
      title: '员工管理',
      icon: 'people'
    }
  }, {
    path: 'details/:id',
    name: 'employeesDetails',
    hidden: true,
    component: () => import('@/views/employees/details.vue'),
    meta: {
      title: '员工详情'
      // icon: 'people'
    }
  }]
}
