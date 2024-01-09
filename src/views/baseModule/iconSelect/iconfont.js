import iconfontData from './iconfont.json'
const iconfont = iconfontData.glyphs.map((item) => {
  return {
    icon: item.font_class,
    name: item.name,
  }
})

export default iconfont
