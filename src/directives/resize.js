const resize = {
  bind(el, binding) {
    let width = ''
    let height = ''
    function isResize() {
      const style = document.defaultView.getComputedStyle(el)
      if (width !== style.width || height !== style.height) {
        binding.value({ width: style.width, height: style.height })
      }
      width = style.width
      height = style.height
    }
    el.__vueSetInterval__ = setInterval(isResize, 300)
  },
  unbind(el) {
    clearInterval(el.__vueSetInterval__)
  },
}

const install = function (Vue) {
  Vue.directive('resize', resize)
}

if (window.Vue) {
  window['resize'] = resize
  Vue.use(install) // eslint-disable-line
}

resize.install = install

export default resize
