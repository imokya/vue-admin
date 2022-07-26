import store from '@/store'

function checkPersmission(el, binding) {
  // 获取对应权限
  const { value } = binding
  // 获取当前用户所有功能权限
  const points = store.getters.userInfo.permission.points
  // value必须是数组
  if (value && value instanceof Array) {
    const hasPermission = points.some((point) => {
      return value.includes(point)
    })
    // 匹配失败
    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    throw new Error('v-permission值必须是数组')
  }
}

export default {
  // 在绑定元素的父组件被挂载之后
  mounted(el, binding) {
    checkPersmission(el, binding)
  },
  // 在包含组件的VNode和其子组件更新后调用
  update(el, binding) {
    checkPersmission(el, binding)
  }
}
