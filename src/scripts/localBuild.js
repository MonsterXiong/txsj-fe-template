const fs = require('fs')
const vueConfig = require('../../vue.config')
const { outputDir } = vueConfig
let build_dir = 'dist'
if (outputDir) {
  build_dir = outputDir
}
const build_dir_path = `${build_dir}/static/config.js`

fs.readFile(build_dir_path, 'utf8', function (err, data) {
  if (err) {
    console.error(err)
    return
  }
  const modifiedData = modifyJavaScript(data)
  fs.writeFile(build_dir_path, modifiedData, 'utf8', (err) => {
    if (err) {
      console.error(err)
      return
    }
  })
})

function modifyJavaScript(data) {
  return data.replace(/(baseMapTileData\s*:\s*{\s*url\s*:\s*)(['"])[^'"]*\2/g, '$1$2/layer/{z}/{x}/{y}.png$2')
}
