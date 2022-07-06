/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername (str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}
/**
 * 校验手机号
 * @param {校验的值} str
 * @returns
 */
export const validMobile = (str) => {
  const reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
  return reg.test(str)
}
