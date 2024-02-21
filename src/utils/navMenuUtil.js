import router from '@/router'
import { MENU_TYPE } from '@/common/menuType'

export function isOpenNewWindow(url) {
  return url.startsWith('open:')
}

/**
 * 处理菜单点击事件
 * @param {*} menu 菜单项
 */
export function handleNavMenuClick1(menu) {
  const { menuType, menuParams } = menu
  if (menuType == MENU_TYPE.PAGE) {
    if (router.currentRoute.fullPath != menuParams) {
      router.push(menuParams)
    }
  }
}

export function handleNavMenuClick(menu) {
  let { menuType, menuParams } = menu
  if (menuParams.includes('vue:')) {
    menuParams = menuParams.split('vue:')[1]
  } else if (menuParams.includes('static:')) {
    // 外部链接则嵌套iframe
    const url = encodeURIComponent(menuParams.split('static:')[1])
    router.push(`${routesConstant.OTHER_PAGE.path}/${menu.id}?url=${url}`)
    return
  }
  if (menuType == MENU_TYPE.PAGE && menuParams) {
    let url = menuParams + `?projectId=${getCurrentProjectId()}&menuId=${menu.id}&tagName=${menu.name}`
    const wordPagePath = [routesConstant.DESIGN_PAGE.path, routesConstant.READ_PAGE.path, routesConstant.FUNCTION_DESIGN_PAGE.path].join(',')
    if (wordPagePath.includes(menuParams)) {
      // url = menuParams + '/' + menu.id + `?tagName=${menu.name}`
      url = menuParams + '/' + menu.id + `?projectId=${getCurrentProjectId()}&menuId=${menu.id}&tagName=${menu.name}`
    }
    if (router.currentRoute.fullPath != url) {
      router.push(url)
    }
  }
}
