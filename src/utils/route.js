import path from 'path-browserify'

/**
 * 获得所有自己路由
 */
const getChildrenRoutes = (routes) => {
  const result = []
  routes.forEach((route) => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children)
    }
  })
  return result
}

/**
 * 处理脱离层级路由
 */
export const filterRoutes = (routes) => {
  const childrenRoutes = getChildrenRoutes(routes)
  return routes.filter((route) => {
    return !childrenRoutes.find((childrenRoute) => {
      return childrenRoute.path === route.path
    })
  })
}

function isNull(data) {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
  return false
}

/**
 * 返回符合菜单规则的数据结构
 */
export const generateMenus = (routes, basePath = '') => {
  const result = []

  routes.forEach((item) => {
    // 不存在children,也不存在meta
    if (isNull(item.meta) && isNull(item.children)) return
    // 存在children,不存在meta,递归generateMenus
    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...generateMenus(item.children))
      return
    }

    // 不存在children存在meta或者存在children也存在meta
    const routePath = path.resolve(basePath, item.path)

    // 路由分离后,可能存在同名父路由
    let route = result.find((item) => item.path === routePath)
    // 当前路由未加入到result
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }
      if (route.meta.icon && route.meta.title) {
        result.push(route)
      }
    }
    // 存在children也存在meta
    if (item.children) {
      route.children.push(...generateMenus(item.children, route.path))
    }
  })
  return result
}
