const fs = require('fs')
const iconFontPath = 'src/assets/iconfont/iconfont.js'
// 替换iconfont.js 中的fill="xxxx" 为fill="" 不然BaseIcon使用的时候fill属性不能生效
fs.readFile(iconFontPath, 'utf8', (err, data) => {
  if (err) {
    console.error('读取iconfont.js失败', err)
    return
  }
  // 替换fill的值为"" ,因为如果fill的值不为空字符串的话，BaseIcon 的fill无法生效
  const pattern = /fill="(.*?)"/g
  const newData = data.replace(pattern, 'fill=""')
  fs.writeFile(iconFontPath, newData, (err) => {
    if (err) {
      console.error('写入iconfont.js失败', err)
      return
    }
    console.error('写入iconfont.js成功')
  })
})
