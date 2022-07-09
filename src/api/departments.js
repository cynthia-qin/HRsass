import request from '@/utils/request'

/**
 * 获取企业的部门列表
 * @returns
 */
export const getDepartments = () => {
  return request({
    url: '/company/department'
  })
}

/**
 *删除部门
 * @param {部门ID} id
 * @returns
 */
export const delDepartments = (id) => {
  return request({
    url: `/company/department/${id}`,
    method: 'DELETE'
  })
}

/**
 *新增部门
 * @param {} data
 * @returns
 */
export const addDepartments = (data) => {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}
