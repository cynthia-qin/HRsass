import request from '@/utils/request'

/**
 *获取员工简单列表
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
/**
 * 保存用户基本信息
 * @param {用户信息} data
 * @returns
 */
export const saveUserDetails = (data) => {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'PUT',
    data
  })
}
/** *
 *  读取用户详情的基础信息
 * **/
export function getPersonalDetail (id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}

/** *
 *  更新用户详情的基础信息
 * **/
export function updatePersonal (data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data
  })
}

/** **
 * 获取用户的岗位信息
 *
 * ****/
export function getJobDetail (id) {
  return request({
    url: `/employees/${id}/jobs`
  })
}

/**
 * 保存岗位信息
 * ****/
export function updateJob (data) {
  return request({
    url: `/employees/${data.userId}/jobs`,
    method: 'put',
    data
  })
}

/**
 * 给员工分配角色
 * @param {id,roleIds} data
 * @returns
 */
export function assignRoles (data) {
  return request({
    url: '/sys/user/assignRoles',
    data,
    method: 'put'
  })
}
