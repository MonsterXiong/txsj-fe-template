import extendRouteConstant from './extendRouteConstant'

const routes = [
  {
    ...extendRouteConstant.WELCOME,
    component: () => import('@/views/welcome/index.vue'),
  },
]

export default routes
