import { routesConstant } from '@/router/routeConstant.js'

const routes = [
  {
    ...routesConstant.PROJECT_LSIT,
    component: () => import('@/pages/projectList/ProjectList.vue'),
    meta: {
      title: '项目基本信息',
    },
  },
  {
    ...routesConstant.TECH_INDEX_REQUIREMENT,
    component: () => import('@/pages/techIndexRequirement/TechIndexRequirement.vue'),
    meta: {
      title: '技术指标要求',
    },
  },
]

export default routes
