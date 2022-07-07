import router from './router'
import store from '@/store'
import NProgress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式
const whiteList = ['/404', '/login'] // 定义白名单 白名单内的页面都是不需要token就可以访问的

// 前置守卫
router.beforeEach(async (to, from, next) => {
  NProgress.start() // 开启进度条
  // 判断有无token
  if (store.getters.token) {
    // 有token 判断是否是去登陆页面 如果是去登陆页面就直接跳转到主页 如果是去别的页面就直接放行
    // to.path === '/login' ? next('/') : next()
    if (to.path === '/login') {
      next('/')
    } else {
      if (!store.getters.userId) {
        // 如果用户ID没有，那就要请求用户资料
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    //  没有token 判断要去的页面是否在白名单内，在就直接放行 ，不在就跳转去登录页面
    whiteList.indexOf(to.path) > -1 ? next() : next('/login')
  }
  NProgress.done() // 手动强制关闭进度条 防止手动切换页面时，进度条不关闭的问题
})

// 后置守卫
router.afterEach(() => {
  NProgress.done() // 关闭进度条
})
