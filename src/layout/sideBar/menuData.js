import { routesConstant } from '@/router/routeConstant'

export const menuList = [
  {
    id: '001',
    parent: '',
    code: 'design',
    name: '设计',
    icon: '',
    menuType: 'module',
  },
  {
    id: '001001',
    parent: '001',
    code: 'design_abi',
    name: '能力清单',
    icon: '',
    menuType: 'page',
    menuParams: routesConstant.DESIGN_ABI.path,
  },
  {
    id: '001002',
    parent: '001',
    code: 'design_index',
    name: '指标清单',
    icon: '',
    menuType: 'page',
    menuParams: routesConstant.DESIGN_INDEX.path,
  },
]
