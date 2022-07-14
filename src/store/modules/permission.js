// 按需导入静态路由 静态路由是基本权限 所有的用户都拥有这个权限
import { constantRoutes, asyncRoutes } from '@/router'
const state = {
  routes: constantRoutes
}
const mutations = {
  // 当用户登录后，经过一些操作会增加权限
  setRoutes (state, newRoutes) {
    state.routes = [...constantRoutes, ...newRoutes]
  }
}
const actions = {
  // 这个menu是userInfo里roles的menu 表示当前用户拥有的权限 是一个数组
  filterRoutes (context, menus) {
    const routes = []
    menus.forEach(key => {
      routes.push(...asyncRoutes.filter(item => item.name === key))
    })
    context.commit('setRoutes', routes) // 将删选的动态路由和静态路由合并 这个是为了左侧菜单栏
    return routes // 是为了配置路由
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
