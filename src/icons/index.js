import SvgIcon from '@/components/SvgIcon'

const modules = import.meta.glob('./svg/*.svg')

Object.values(modules).forEach((func) => func())

export default (app) => {
  app.component('svg-icon', SvgIcon)
}
