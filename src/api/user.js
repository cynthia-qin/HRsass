import request from '@/utils/request'

export function login (data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

/**
 *获取用户资料的接口
 * @param {已经在请求拦截器中添加了token} token
 */
export function getUserInfo () {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}

/**
 * 根据用户ID获取用户基本信息 主要用于获取用户头像
 */
export function getUserInfoById (id) {
  return request({
    url: `/sys/user/${id}`
  })
}

export function logout () {

}
