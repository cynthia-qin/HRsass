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

/**
 *获取员工列表
 * @param {page:页码 size:每页条数} params
 * @returns
 */
export const getEmployeesList = (params) => {
  return request({
    url: '/sys/user',
    params
  })
}

/**
 * 删除员工
 */
export const delEmployee = (id) => {
  return request({
    url: `/sys/user/${id}`,
    method: 'DELETE'
  })
}
/** **
 *  新增员工的接口
 * **/
export function addEmployee (data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}

/**
 *  批量导入员工
 * @param {是一个数组} data
 * @returns
 */
export const importEmployees = (data) => {
  return request({
    url: '/sys/user/batch',
    method: 'POST',
    data
  })
}
