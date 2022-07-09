import request from '@/utils/request'

/**
 *获取员工共简单列表
 * @returns
 */
export const getEmployeesSimple = () => {
  return request({
    url: '/sys/user/simple'
  })
}
