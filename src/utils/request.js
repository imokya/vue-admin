import axios from 'axios'
import { ElMessage } from 'element-plus'
import store from '@/store'
import { checkTimeout } from '@/utils/auth'

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      if (checkTimeout()) {
        // 客户端登录时间戳超时失效
        store.dispatch('user/logout')
        return Promise.reject(new Error('token失效'))
      }
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    config.headers.icode = 'F603D7D2621D1D4D'
    // 接口语言切换
    config.headers['Accept-Language'] = store.getters.language
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data
    // 是否成功
    if (success) {
      return data
    } else {
      ElMessage.error(message)
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    // 服务器端返回token失效信息
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      store.dispatch('user/logout')
    }
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

export default service
