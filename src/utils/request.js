import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
import { getTimeStamp } from './auth'
const timeout = 3600 // token有效时间 一小时
// 创建一个axios
const service = axios.create({
  // 这个基准地址 当我们在开发环境（npm run dev）的时候是’/api'  当我们在生产环境的时候(npm run build) 的时候是 '/prod-api'
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000 // 超时时间限制
})
// 请求拦截器
service.interceptors.request.use(config => {
  // 判断token是否存在
  if (store.getters.token) {
    // 判断token是否超时，这是对token超时的主动处理，主动介入
    if (IsCheckTimeOut()) {
      // 如果超时，就清空token和用户信息，跳转到登录页面，并提示
      store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('token超时了'))
    }
    // 存在，就添加到请求头里  注入token
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config
}, err => {
  return Promise.reject(err)
})

// 响应拦截器  处理服务器返回的数据 参数是两个回调函数 第一个是成功的回调函数，第二个是失败的回调函数
service.interceptors.response.use((response) => {
  // 对象解构
  const { success, message, data } = response.data
  if (success) {
    return data
  } else {
    Message.error(message) // 提示错误消息
    return Promise.reject(new Error(message)) // 返回一个错误对象，让程序进入catch里面
  }
}, (error) => {
  // token失效的被动处理 这是当token失效时，根据后端返回给我们的数据进行处理
  if (error.response && error.response.data && error.response.data.code === 10002) {
    store.dispatch('user/logout')
    router.push('/login')
  } else {
    Message.error(error.message) // 提示错误消息
  }
  return Promise.reject(error)
})

function IsCheckTimeOut () {
  const currentTime = Date.now()
  const timestamp = getTimeStamp()
  return (currentTime - timestamp) / 1000 > timeout
}
export default service
