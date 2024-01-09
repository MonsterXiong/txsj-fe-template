//外部配置，如使用默认配置请将改属性置位undefined或是注掉改属性，
//配置内容为字符串请使用''
const externalConfig = Object.freeze({
  //-------------------------- 通用配置  --------------------------------//
  // baseUrl:'http://192.168.2.121:9080/',
  baseUrl: undefined,
  systemName: undefined,
  systemIcon: undefined,
  // 登录界面配置 可选值: 'login' | 'login1' | 'login2' | 'login3' | 'login4' | 'login5'
  loginPageName: 'login6',
  companyName: ' ',
  // 默认主题 可选值：'default' | 'netsinBlue' | 'freshGreen'
  defaultTheme: 'plainGray',
  // 系统是以什么为主体，比如以项目，任务或者作业，默认是项目
  projectName: '方案',
  // 0 或者 1  1表示前端自动登录
  autoLogin: 0,
  // 'click | 'dbClick'  侧边栏打开方式，单击或者双击
  sideBarMode: 'click',
  // tagsView模式 可选值：'scroll' | 'drawer'
  tagsViewMode: 'scroll',
  //-------------------------- 项目特有配置  --------------------------------//
  showLogo: true,
})
