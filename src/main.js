import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import install from './install'
import _ from 'lodash'
import { znTool } from 'zn-ui'
import './directives/index.js'
import '@/baseComponents'
// icomoon 的图标（树形绘图模型和指标绘图模型专用）
import '@/assets/iconfont/icomoon.js'
// iconfont 的图标
import '@/assets/iconfont/iconfont.js'
import '@/assets/iconfont/iconfont.css'
import configData from '@/utils/config'

import 'default-passive-events'

import './icons'
import '@/assets/iconfont/iconfont-txjm.css'
import '@/assets/iconfont/iconfont-txjm.js'

// import '@/assets/iconfont/index.js'
import '@/style/index.less'

Vue.config.productionTip = false
// 注册全局组件
install(Vue)
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
//阻止浏览器默认右键菜单
window.addEventListener('contextmenu', (event) => event.preventDefault())
window.router = router
//修改名称
window.onload = (event) => {
  window.document.title = configData.systemName
}
window._ = _
window.znTool = znTool
