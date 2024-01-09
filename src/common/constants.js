export const GRAPH_LINE = 'graph_line'

//  localstorage存储相关
export const LocalStorageItems = Object.freeze({
  TOKEN: 'token',
  USER_INFO: 'userInfo',
  ROLE_LIST: 'roleList',
  RECENT_OPENP_PROJECT_IDS: 'recentOpenProjectIds', //====todo========关闭项目localStorage应该刷新
  THEME_CODE: 'themeCode',
})

// 主题code
export const ThemeCodes = Object.freeze({
  DEFAULT: 'default',
  DARK_BLUE: 'darkBlue', //深蓝色主题
  NETSIN_BLUE: 'netsinBlue', //网信蓝
  FRESH_GREEN: 'freshGreen', //清新绿
})

export const LightThemeCodes = ['default', ThemeCodes.NETSIN_BLUE, ThemeCodes.FRESH_GREEN]

// 日期格式
export const dateFormat = ['yyyy-MM-dd', 'yyyy/MM/dd', 'yyyy MM dd', 'yyyy年MM月dd日', 'yyyy-MM', 'MM-dd-yyyy']

// 时间格式
export const timeFormat = ['HH:mm', 'HH:mm:ss']

// 日期时间格式
export const dateTimeFormat = dateFormat.reduce((pre, cur) => {
  timeFormat.forEach((tf) => {
    pre.push(`${cur} ${tf}`)
  })
  return pre
}, [])

export const ToolbarIconType = Object.freeze({
  EL: 'el',
  SVG: 'svg',
  IMG: 'img',
  ICONFONT: 'iconfont',
})
