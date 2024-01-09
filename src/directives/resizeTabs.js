// base on element-ui el-tabs and Splitpanes
import { findNearestAncestor } from '@/utils/commonUtil'
const touch = {}
let splitpanesElement = null
let panes = []
function mouseMove(event) {
  const rect = splitpanesElement.getBoundingClientRect()
  const clientWidth = splitpanesElement.clientWidth
  const clientHeight = splitpanesElement.clientHeight
  const obj = { x: event.clientX - rect.left, y: event.clientY - rect.top }
  const precentObj = { x: obj.x / clientWidth, y: obj.y / clientHeight }
  requestAnimationFrame(() => {
    const precent = precentObj.y * 100
    panes[0].style.height = `${precent}%`
    panes[1].style.height = `${100 - precent}%`
  })
}
function mouseUp(event) {
  touch.mouseDown = false
  unBindEvents()
}

function bindEvents() {
  document.addEventListener('mousemove', mouseMove)
  document.addEventListener('mouseup', mouseUp)
}

function unBindEvents() {
  document.removeEventListener('mousemove', mouseMove)
  document.removeEventListener('mouseup', mouseUp)
}

const resizeTabs = {
  inserted: function (el, binding) {
    splitpanesElement = findNearestAncestor(el, '.splitpanes')
    panes = splitpanesElement.querySelectorAll('.splitpanes__pane')
    const tabHeader = el.querySelector('.el-tabs__header')
    tabHeader.onmouseover = function () {
      this.style.cursor = 'row-resize'
    }

    tabHeader.onmousedown = function (event) {
      touch.mouseDown = true
      touch.startPoint = {
        clientX: event.clientX,
        clientY: event.clientY,
      }
      bindEvents()
    }
    tabHeader.onmousemove = function (event) {
      if (touch.mouseDown) {
        event.preventDefault()
        touch.dragging = true
      }
    }
    tabHeader.onmouseup = function () {
      touch.mouseDown = false
      setTimeout(() => {
        touch.dragging = false
        unBindEvents()
      }, 0)
    }
  },
}

const install = function (Vue) {
  Vue.directive('resizeTabs', resizeTabs)
}

if (window.Vue) {
  window['resizeTabs'] = resizeTabs
  Vue.use(install) // eslint-disable-line
}

resizeTabs.install = install
export default resizeTabs
