import router from '@/router'
import store from '@/store'

// 白名单
const whiteList = ['/login']

/**
 * 路由前置守卫
 */
router.beforeEach(async (to, from, next) => {
  if (store.getters.token) {
    // 用户已登录
    if (to.path === '/login') {
      next('/')
    } else {
      // 判断用户资料是否存在,如果不存在,重新获取
      if (!store.getters.hasUserInfo) {
        const { permission } = await store.dispatch('user/getUserInfo')
        // 处理用户权限，筛选出需要添加路由
        const filterRoutes = await store.dispatch(
          'permission/filterRoutes',
          permission.menus
        )
        // 循环添加动态路由
        filterRoutes.forEach((route) => {
          router.addRoute(route)
        })
        // 添加完路由需要主动跳转
        return next(to.path)
      }
      next()
    }
  } else {
    // 用户未登录
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
