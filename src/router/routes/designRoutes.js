import { routesConstant } from '@/router/routeConstant.js'

const routes = [
  {
    ...routesConstant.SOFTWARE_DESIGN_DECISION,
    component: () => import('@/pages/softwareDesignDecision/SoftwareDesignDecision.vue'),
    meta: {
      title: '软件设计决策',
    },
  },
  {
    ...routesConstant.SYSTEM_BIZ_FLOW,
    component: () => import('@/pages/systemBizFlow/SystemBizFlow.vue'),
    meta: {
      title: '系统业务流程',
    },
  },
  {
    ...routesConstant.FUNCTIONAL_COMPOSITION_MODEL,
    component: () => import('@/pages/functionalCompositionModel/FunctionalCompositionModel.vue'),
    meta: {
      title: '功能组成模型',
    },
  },
]

export default routes
