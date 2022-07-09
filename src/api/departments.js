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

/**
 *获取部门详情
 * @param {} data
 * @returns
 */
export const getDepartDetails = (id) => {
  return request({
    url: `/company/department/${id}`
  })
}

/**
 * 修改部门详情
 * @param {当前点击的部门ID} id
 * @returns
 */
export const editDepartById = (data) => {
  return request({
    url: `/company/department/${data.id}`,
    method: 'PUT',
    data
  })
}
