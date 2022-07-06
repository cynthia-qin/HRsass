import axios from 'axios'
import { Message } from 'element-ui'
// 创建一个axios
const service = axios.create({
  // 这个基准地址 当我们在开发环境（npm run dev）的时候是’/api'  当我们在生产环境的时候(npm run build) 的时候是 '/prod-api'
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000 // 超时时间限制
})
// 请求拦截器
service.interceptors.request.use()

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
  Message.error(error.message) // 提示错误消息
  return Promise.reject(error)
})
export default service
