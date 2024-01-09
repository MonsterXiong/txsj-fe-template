//默认配置
//环境变量中对象/数组使用JSON.parse进行一下转换
const configData = {
  baseUrl: process.env.VUE_APP_URL,
  systemName: process.env.VUE_APP_SYSTEM_NAME,
  loginSystemName: process.env.VUE_APP_LOGIN_SYSTEM_NAME,
  systemIcon: process.env.VUE_APP_SYSTEM_ICON,
  loginPageName: process.env.VUE_APP_LOGIN_PAGE_NAME,
  companyName: process.env.VUE_APP_COMPANY_NAME,
  projectName: process.env.VUE_APP_PROJECT_NAME ?? '项目',
  defaultTheme: process.env.VUE_APP_DEFAULT_THEME,
  sideBarMode: process.env.VUE_APP_SIDEBAR_OPERATIVE_MODE ?? 'dbClick',
  autoLogin: process.env.VUE_APP_AUTO_LOGIN ?? 0,

  showLogo: process.env.VUE_APP_SHOW_LOGO,
  tagsViewMode: process.env.VUE_APP_TAGS_VIEW_MODE,
}

function initConfigData() {
  const buildEnv = process.env.VUE_APP_BUILD_ENV
  if (buildEnv) {
    const envArr = buildEnv.split('_')
    //为prod模式，读取static数据
    if (envArr && envArr.length > 0 && envArr[0] === 'prod') {
      // eslint-disable-next-line no-undef
      if (typeof externalConfig != 'undefined') {
        // eslint-disable-next-line no-undef
        const config = externalConfig
        for (let key in configData) {
          if (key === 'baseUrl' && typeof config[key] == 'undefined') {
            configData[key] = '/'
          } else if (typeof config[key] != 'undefined') {
            configData[key] = config[key]
          }
        }
        if (!configData.loginSystemName) {
          configData.loginSystemName = configData.systemName
        }
      }
    }
  }
}

//若是prod模式则修改为外部配置
initConfigData()

export default configData
