import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout/Layout.vue'
import store from '@/store'
import configData from '@/utils/config'
import { routesConstant } from './routeConstant.js'
// import { systemRoutes, projectRoutes, designRoutes } from './routes'
import extendRoutes from './extend/extendRoutes'
import baseRoutes from './base/baseRoutes'
Vue.use(VueRouter)
const routes = [
  {
    ...routesConstant.REDIRECT,
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/baseModule/redirect/index.vue'),
      },
    ],
  },
  {
    ...routesConstant.LOGIN,
    component: () => import('@/views/baseModule/login/Login.vue'),
  },
  {
    path: '/',
    name: 'Home',
    redirect: '/welcome',
    component: Layout,
    children: [
      ...baseRoutes,
      // ...systemRoutes,
      // ...projectRoutes,
      // ...designRoutes,
      ...extendRoutes,
      {
        ...routesConstant.WELCOME,
        component: () => import('@/views/welcome/index.vue'),
        meta: {
          title: '首页',
          noCache: true,
        },
        affix: true,
      },
    ],
  },
]
const router = new VueRouter({
  routes,
})

const whiteList = ['Authority', 'Log', 'Role', 'User', 'FileManage', 'ImageManage']
// router.beforeEach(async (to, from, next) => {
//   const userId = store.getters['user/userInfo'].id
//   if (whiteList.includes(to.name)) {
//     //  在白名单中，直接放行
//     next()
//   } else if (to.name === 'login') {
//     // 目标页面是登录页面
//     if (configData.autoLogin == 1 && !userId) {
//       // 自动登录
//       store.dispatch('user/autoLogin').then(() => {
//         next('/')
//       })
//     } else {
//       userId ? next('/') : next()
//     }
//   } else {
//     if (configData.autoLogin == 1 && !userId) {
//       // 自动登录
//       store.dispatch('user/autoLogin').then(() => {
//         next()
//       })
//     } else {
//       userId ? next() : next(`/login?redirectUrl=${to.fullPath}`)
//     }
//   }
// })

export default router
