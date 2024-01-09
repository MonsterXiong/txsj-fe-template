import router from '@/router'
import { MENU_TYPE } from '@/common/menuType'

export function isOpenNewWindow(url) {
  return url.startsWith('open:')
}

/**
 * 处理菜单点击事件
 * @param {*} menu 菜单项
 */
export function handleNavMenuClick(menu) {
  const { menuType, menuParams } = menu
  if (menuType == MENU_TYPE.PAGE) {
    if (router.currentRoute.fullPath != menuParams) {
      router.push(menuParams)
    }
  }
}
