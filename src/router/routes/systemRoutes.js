import { routesConstant } from '@/router/routeConstant.js'

const routes = [
  {
    ...routesConstant.LOG,
    component: () => import('@/views/systemModule/log/Log.vue'),
    meta: {
      title: '操作日志管理',
    },
  },
  {
    ...routesConstant.SYSTEM_DICTIONARY,
    component: () => import('@/views/systemModule/dictionary/Dictionary.vue'),
    meta: {
      title: '系统词典',
    },
  },
]

export default routes
