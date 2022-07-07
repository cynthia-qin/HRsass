import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login, getUserInfo, getUserInfoById } from '@/api/user'
const state = {
  // 设置token初始化状态
  token: getToken(),
  // 设置用户资料初始化状态
  userInfo: {}
}
// 操作state里的数据
const mutations = {
  // 保存token到本地存储
  setToken (state, token) {
    state.token = token
    setToken(token)
  },
  // 删除token
  removeToken (state) {
    state.token = null
    removeToken()
  },
  // 设置userInfo
  setUserInfo (state, result) {
    // 复杂数据类型要改变引用的地址才会响应式
    state.userInfo = result
  },
  // 清空用户信息 当用户登出，换账号登录时，用户信息要置空
  removeUserInfo (state) {
    state.userInfo = {}
  }
}
const actions = {
  // 发起登录请求，持久化token
  async login (context, data) {
    const result = await login(data)
    // // 判断发起的请求是否成功，
    // if (result.data.success) {
    //   context.commit('setToken', result.data.data)
    // }
    // 我们已经在请求拦截器里解构了服务器返回的数据 并且进行了判断，所以我们这里就不用判断了
    context.commit('setToken', result)
    setTimeStamp() // 将当前时间戳存起来
  },
  // 发起获取用户信息请求
  async getUserInfo (context) {
    // 获取用户基本资料，但是没有头像信息
    const result = await getUserInfo()
    // 获取员工基本信息 主要用来获取头像
    const baseInfo = await getUserInfoById(result.userId)
    // 将获取回来的所有信息都存在userInfo里面
    context.commit('setUserInfo', { ...result, ...baseInfo })
    return result // 为后面设置权限
  },
  // 用户登出 清空token和用户信息
  logout (context) {
    // 清空token
    context.commit('removeToken')
    // 清空用户信息
    context.commit('removeUserInfo')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
