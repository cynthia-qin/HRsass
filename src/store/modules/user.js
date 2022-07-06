import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'
const state = {
  // 设置token初始化状态
  token: getToken()
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
  }
}
const actions = {
  async login (context, data) {
    const result = await login(data)
    // // 判断发起的请求是否成功，
    // if (result.data.success) {
    //   context.commit('setToken', result.data.data)
    // }
    // 我们已经在请求拦截器里解构了服务器返回的数据 并且进行了判断，所以我们这里就不用判断了
    context.commit('setToken', result)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
