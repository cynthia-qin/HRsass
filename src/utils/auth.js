import Cookies from 'js-cookie'

// 定义一个唯一的名称存放token
const TokenKey = 'hrsaas-ihrm-token'
// 定义一个名称存放存入token时的时间戳
const timeKey = 'hrsaas-timestamp-key'

// 对token的存，取，删
export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

// 对存入token时的时间戳的存，取，删
export function getTimeStamp () {
  return Cookies.get(timeKey)
}
export function setTimeStamp () {
  return Cookies.set(timeKey, Date.now())
}
