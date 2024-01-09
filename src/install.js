//用于引入各种外部组件以及方法
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import emitter from '@/utils/eventBus'
import animate from 'animate.css'
import keepAlive from '@/components/keepAlive/keepAlive.js'

const install = (Vue) => {
  Vue.use(ElementUI)
  Vue.prototype.$emitter = emitter
  Vue.use(animate)
  Vue.component('keep-alive', keepAlive)
}

export default install
