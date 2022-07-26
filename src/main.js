import { createApp } from 'vue'
import './styles/index.scss'
import App from './App.vue'

import installElement from '@/plugins/element'

import store from './store'
import router from './router'
import installIcons from './icons'
import installElementIcon from './icons/element'
import 'virtual:svg-icons-register'
import i18n from '@/i18n'
import installFilter from '@/filters'
import installDirective from '@/directives'

// 路由鉴权守卫
import './permission'

const app = createApp(App)
app.use(store)
app.use(router)
installIcons(app)
installElement(app)
installElementIcon(app)
installFilter(app)
installDirective(app)
app.use(i18n)
app.mount('#app')
