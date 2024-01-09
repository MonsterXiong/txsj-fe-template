// base on element-ui
const onlyNumber = {
  inserted: function (el, binding) {
    const input = el.querySelector('.el-input__inner')
    const span = document.createElement('span')
    span.setAttribute('class', 'input-number-span')
    const min = binding.value.min
    const max = binding.value.max
    let textContent = `只能输入数字或者小数`
    if (isFinite(min)) {
      if (min || min == 0) {
        textContent += ` ,最小值为${min}`
      }
    }
    if (isFinite(max)) {
      if (max || max == 0) {
        textContent += ` ,最大值为${max}`
      }
    }
    span.textContent = textContent
    input.parentNode.appendChild(span)
    input.onkeyup = function (e) {
      input.value = input.value.replace(/[^0-9.]/, '')
    }
    input.onblur = function (e) {
      input.value = input.value.replace(/[^0-9.]/, '')
    }
    input.onafterpaste = function (e) {
      input.value = input.value.replace(/[^0-9.]/, '')
    }
  },
}

const install = function (Vue) {
  Vue.directive('onlyNumber', onlyNumber)
}

if (window.Vue) {
  window['onlyNumber'] = onlyNumber
  Vue.use(install) // eslint-disable-line
}

onlyNumber.install = install
export default onlyNumber
