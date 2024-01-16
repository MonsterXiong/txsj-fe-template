const apis = require.context('./module', true, /\.js$/)
const modules = {}
apis.keys().forEach((key) => {
  let moduleName = key.replace(/(\.\/|\.js)/g, '')
  if (moduleName.includes('/')) {
    const list = moduleName.split('/')
    moduleName = list[list.length - 1]
  }
  moduleName = moduleName.replace(moduleName[0], moduleName[0].toUpperCase())
  modules[moduleName] = apis(key).default
})
Object.assign(exports, modules)
