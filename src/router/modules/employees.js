import Layout from '@/layout'
// 默认导出一条路由规则对象
export default {
  path: '/employees',
  name: 'employees',
  component: Layout,
  children: [{
    path: '',
    component: () => import('@/views/employees'),
    name: 'employees',
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
  },
  {
    path: 'print/:id', // 如果没有id也想跳转到print页面就写:id?
    component: () => import('@/views/employees/print.vue'),
    hidden: true,
    meta: {
      title: '员工打印'
    }
  }]
}
