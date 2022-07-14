// 此文件内放所有自定义的指令
export const imagerror = {
  // dom表示指令绑定的元素
  inserted (dom, options) {
    // img在图片加载不出来时会触发自身的onerror事件
    // 如果当前元素的src有值就直接等于他的src, 否则就等于默认值 用于当前元素的src值为null的时候
    dom.src = dom.src || options.value
    // v-imagerror="变量名" options表示对这个变量名的解释 options身上有个value属性
    dom.onerror = function () {
      dom.src = options.value
    }
  },
  componentUpdated (dom, options) {
    dom.src = dom.src || options.value
  }
}
