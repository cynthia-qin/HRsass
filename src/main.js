import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control  判断页面跳转有无token

// 导入print插件
import print from 'vue-print-nb'
Vue.use(print) // 注册好之后，会返回一个v-print的指令

// 导入注册全局组件
import components from './components'
Vue.use(components)

// 导出所有的自定义指令并全局注册
import * as directives from '@/directives'
// console.log(directives)
Object.keys(directives).forEach(key =>
  Vue.directive(key, directives[key])
)
// 导入所有的过滤器并全局注册
import * as filters from '@/filters'
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

//  导入混入函数 并全局注册
import checkPermission from '@/mixin/checkPermission'
Vue.mixin(checkPermission)

// 导入国际化语言配置
import i18n from '@/lang'
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI, { i18n: (key, val) => i18n.t(key, val) })
// 设置element为当前的语言
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})
// import VueI18n from 'vue-i18n'
// console.log(VueI18n)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
