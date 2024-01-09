// build结束之后，替换dist中的favicon.ico
const fs = require('fs')
console.info('build结束之后，会替换dist/favicon.ico')
const args = process.argv
const customArgv = args.slice(2)
const faviconPreStr = 'favicon='
let hasFaviconProp = false
let faviconPropValue = ''
if (customArgv && customArgv.length > 0) {
  hasFaviconProp = customArgv.some((item) => item.includes(faviconPreStr))
}
if (hasFaviconProp) {
  faviconPropValue = customArgv.find((item) => item.startsWith(faviconPreStr)).split('=')[1]
  faviconPropValue = faviconPropValue.substring(0, faviconPropValue.length)
} else {
  const lifecycleEvent = process.env.npm_lifecycle_event
  if (lifecycleEvent.startsWith('build')) {
    faviconPropValue = 'public/image/base/logo.png'
  } else if (lifecycleEvent.startsWith('build_')) {
    faviconPropValue = `public/image/base/logo_${lifecycleEvent.replace('build_', '')}.png`
  }
}
fs.readFile(faviconPropValue, function (err, originBuffer) {
  fs.writeFile('dist/favicon.ico', originBuffer, function (err) {
    if (err) {
      console.log(err)
    }
  })
})
