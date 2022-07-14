import request from '@/utils/request'

/**
 * 获取所有的角色列表
 * @param {page:当前页码 pagesize:每页条数} params
 * @returns
 */
export const getRoleList = (params) => {
  return request({
    url: '/sys/role',
    params
  })
}

/**
 *根据公司ID获取公司信息
 * @param {公司id} companyId
 * @returns
 */
export const getCompanyInfo = (companyId) => {
  return request({
    url: `/company/${companyId}`
  })
}

/**
 * 删除角色
 * @param {当前删除的数据的id} id
 * @returns
 */
export const delRoleList = (id) => {
  return request({
    url: `/sys/role/${id}`,
    method: 'DELETE'
  })
}

/**
 * 根据ID获取角色详情
 * @param {} id
 * @returns
 */
export const getRoleDetails = (id) => {
  return request({
    url: `/sys/role/${id}`
  })
}

/**
 * 根据ID更新角色详情
 * @param {角色数据} data
 * @returns
 */
export const updateRole = (data) => {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'PUT',
    data
  })
}

// 新增角色
export const addRole = (data) => {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}
// 给角色分配权限
export const assignPerm = ({ id, permIds }) => {
  return request({
    url: '/sys/role/assignPrem',
    method: 'PUT',
    data: {
      id,
      permIds
    }
  })
}

