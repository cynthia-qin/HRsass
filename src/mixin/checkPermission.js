import store from '@/store'
export default {
  methods: {
    checkPermission (key) {
      const { userInfo } = store.state.user
      if (userInfo.roles.points && userInfo.roles.points.length) {
        // 查找points权限里有没有当前需要的权限 如果有就返回true
        return userInfo.roles.points.some(item => item === key)
      }
      // 如果一个权限也没有就不会进上面的if 直接返回false
      return false
    }
  }
}
