/**
 * 设置html节点对应的id
 * @param {*} htmlNode html节点
 * @param {*} value id值
 */
export function setHtmlNodeId(htmlNode, value) {
  htmlNode.id = value
}

export function exportCanvasAsPNG(canvasElement, fileName) {
  const MIME_TYPE = 'image/png'
  const imgURL = canvasElement.toDataURL(MIME_TYPE)
  const dlLink = document.createElement('a')
  dlLink.download = fileName
  dlLink.href = imgURL
  dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':')

  document.body.appendChild(dlLink)
  dlLink.click()
  document.body.removeChild(dlLink)
}

export function exportEChartAsPng(chart, fileName) {
  let picInfo = chart.getDataURL({
    type: 'png',
    pixelRatio: 1.5, //放大两倍下载，之后压缩到同等大小展示。解决生成图片在移动端模糊问题
    backgroundColor: '#fff',
  }) //获取到的是一串base64信息

  const elink = document.createElement('a')
  elink.download = fileName
  elink.style.display = 'none'
  elink.href = picInfo
  document.body.appendChild(elink)
  elink.click()
  URL.revokeObjectURL(elink.href) // 释放URL 对象
  document.body.removeChild(elink)
}

//  base64转二进制流
export function dataUrltoBlob(dataUrl) {
  let arr = dataUrl.split(','),
    mine = arr[0].match(/:(.*?);/)[1],
    bstr = window.atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], {
    type: mine,
  })
}

export function setObj(returnObj, formData) {
  for (let key in returnObj) {
    if (formData[key] && formData[key] != 'null' && formData[key] != null) {
      returnObj[key] = formData[key]
    }
    if (formData[key] == 'null' || formData[key] == null) {
      returnObj[key] = null
    }
  }
  return returnObj
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

export function getTextWidth(text) {
  if (text) {
    const measureDom = document.createElement('span')
    measureDom.style.display = 'inline-block'
    measureDom.textContent = text
    document.body.appendChild(measureDom)
    const width = measureDom.clientWidth
    document.body.removeChild(measureDom)
    return width
  }
}
