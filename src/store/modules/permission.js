import { publicRoutes, privateRoutes } from '@/router'

export default {
  namespaced: true,
  state: () => ({
    routes: publicRoutes
  }),
  mutations: {
    // 增加路由
    setRoutes(state, newRoutes) {
      state.routes = [...publicRoutes, ...newRoutes]
    }
  },
  actions: {
    /**
     * 根据权限筛选路由
     * @param {*} context
     * @param {*} menus 权限数据
     */
    filterRoutes(context, menus) {
      // 根据用户权限筛选后，需要addRoute添加的路由表
      const routes = []
      menus.forEach((key) => {
        const _routes = privateRoutes.filter((item) => item.name === key)
        routes.push(..._routes)
      })
      // 所有不匹配的路由，进入404页面
      routes.push({
        path: '/:catchAll(.*)',
        redirect: '/404'
      })
      context.commit('setRoutes', routes)
      return routes
    }
  }
}
