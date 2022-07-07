// 此文件内放所有自定义的指令
export const imagerror = {
  // dom表示指令绑定的元素
  inserted (dom, options) {
    // img在图片加载不出来时会触发自身的onerror事件
    // v-imagerror="变量名" options表示对这个变量名的解释 options身上有个value属性
    dom.onerror = function () {
      dom.src = options.value
    }
  }
}
