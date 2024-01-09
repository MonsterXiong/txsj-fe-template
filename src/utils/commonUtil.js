import { v4 as uuidv4 } from 'uuid'
import configData from '@/utils/config'

export function uuid() {
  const id = uuidv4()
  return id.replace(/-/g, '')
}

export function sortBy(props) {
  return function (a, b) {
    return a[props] - b[props]
  }
}

/**
 * @description 把map数据转换为数组对象
 * @param {*} map 对应的map对象
 * @param {*} param1 转换对象的key以及value
 * @returns 转换后的数组
 */
export function transferMapToList(map, { key = 'key', value = 'value' } = {}) {
  const list = []
  if (map) {
    for (let item in map) {
      const object = {}
      object[key] = item
      object[value] = map[item]
      list.push(object)
    }
  }
  return list
}
export function exportFile(name, data, type) {
  const blob = new Blob([data], {
    type,
  })
  exportBlobFile(name, blob)
}

export function exportBlobFile(name, blob) {
  const objectUrl = URL.createObjectURL(blob)
  const link = document.createElement('a') // 创建a标签
  link.href = objectUrl
  // 重命名文件
  link.download = name
  link.click()
  URL.revokeObjectURL(objectUrl)
}

export function updateObject(obj, newObj, flag = true) {
  Object.keys(obj).forEach((k) => {
    if (flag) {
      if (hasValue(newObj[k])) {
        obj[k] = newObj[k]
      }
    } else {
      obj[k] = newObj[k]
    }
  })

  return obj
}

/**
 * 判断是否有值
 * @param val 待检测值
 * @return 检测结果
 *
 * @example
 *
 * hasValue(0) // => true
 * hasValue({}) // => true
 * hasValue(null) // => false
 * hasValue("") // => false
 */
export const hasValue = (val) => (val === 0 ? true : Boolean(val))

export function isString(str) {
  return Object.prototype.toString.call(str) === '[object String]'
}

export function isNullObjectSimple(obj) {
  return !obj || Object.keys(obj).length === 0
}

export function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

export function isFunction(obj) {
  return Object.prototype.toString.call(obj) === '[object Function]'
}

export function isNumber(num) {
  return Object.prototype.toString.call(num) === '[object Number]'
}

export function isMap(obj) {
  return isObject(obj) && obj instanceof Map
}

export function getFromIterator(iterator, indexOrObj = 0) {
  if (isNumber(indexOrObj)) {
    if (indexOrObj < 0) {
      indexOrObj = indexOrObj + iterator.count
    }
    let i = 0
    let result = null
    while (iterator.next()) {
      if (i === indexOrObj) {
        result = iterator.value
        break
      }
      i++
    }
    iterator.reset()
    return result
  } else if (isObject(indexOrObj)) {
    let i = 0
    while (iterator.next()) {
      if (indexOrObj === iterator.value) {
        break
      }
      i++
    }
    iterator.reset()
    return i
  }
}

export function appendUUID2Url(url) {
  if (url.includes('base64')) {
    return url
  }
  if (url.includes('?')) {
    url = url + '&uuid=' + uuid()
  } else {
    url = url + '?uuid=' + uuid()
  }
  return url
}

export function setUrl(url) {
  // 非http开头
  if (url.indexOf('http') !== 0) {
    url = configData.baseUrl + (url.indexOf('/') === 0 ? url.replace('/', '') : url)
  }
  return url
}

export function appendParams2Url(url, params) {
  url = setUrl(url)
  if (url.includes('?')) {
    Object.keys(params).forEach((key) => {
      url = url + `&${key}=${params[key]}`
    })
  } else {
    Object.keys(params).forEach((key, index) => {
      if (index === 0) {
        url = url + `?${key}=${params[key]}`
      } else {
        url = url + `${key}=${params[key]}`
      }
    })
  }
  return url
}

/**
 * 刷新当前TagsView
 * @param {VueComponent} vm
 */
export function refreshTagsView(vm) {
  vm.$store.dispatch('tagsView/delCachedView', vm.$route).then(() => {
    const { fullPath } = vm.$route
    vm.$nextTick(() => {
      vm.$router.replace({
        path: '/redirect' + fullPath,
      })
    })
  })
}

/**
 * 寻找最近的满足条件的祖先节点（不包括自己）,直到找到html根节点为止
 * @param {HtmlElement} el html节点
 * @param {Selector} selector 选择器
 * @returns 满足条件的祖先节点
 */
export function findNearestAncestor(el, selector) {
  const parent = el.parentElement
  if (parent) {
    const select = parent.querySelector(selector)
    if (select) {
      return select
    } else {
      if (parent.tagName.toUpperCase === 'HTML') {
        return null
      } else {
        return findNearestAncestor(parent, selector)
      }
    }
  }
  return null
}

/**
 * 将两个具有父子关系的平行结构List转换成tree结构
 * @param {Array} categoryList 父层级的List
 * @param {Array} itemList 子层级的List
 * @param {*} param2 配置参数
 * @returns 树形结构
 */
export function twoListZipToTree(
  categoryList,
  itemList,
  {
    categoryIdKey = 'id',
    categoryTextKey = 'name',
    parentIdKey = 'parentId',
    childrenKey = '_children',
    itemIdKey = 'id',
    itemTextKey = 'name',
    categoryFn = () => {},
    itemFn = () => {},
  }
) {
  let treeData = []
  for (let j = 0; j < categoryList.length; j++) {
    let category = categoryList[j]
    let obj = {
      ...category,
      _id: category[categoryIdKey],
      _name: category[categoryTextKey],
      [childrenKey]: [],
    }
    categoryFn(obj)
    for (let i = 0; i < itemList.length; i++) {
      const item = itemList[i]
      if (item[parentIdKey] === category[categoryIdKey]) {
        obj.children.push({
          ...item,
          _name: item[itemTextKey],
          _id: item[itemIdKey],
        })
      }
      itemFn(item)
    }
    treeData.push(obj)
  }
  return treeData
}

/**
 * 将数组转换成Map
 * @param {Array} list 将数组转换成Map
 * @param {Function} mapKeyFn Map的key生成函数
 * @returns Map
 */
export function listToMap(list, mapKeyFn = (item) => item.toString()) {
  const map = new Map()
  list.forEach((item) => {
    const key = mapKeyFn(item)
    let valueList = []
    if (map.has(key)) {
      valueList = map.get(key)
    }
    valueList.push(item)
    map.set(key, valueList)
  })
  return map
}

/**
 * 数组根据主键去重
 * @param {*} arr 需要去重的数据
 * @param {*} key 去重的根据
 * @returns
 */
export function reduceListByKey(arr, key = 'id') {
  if (arr && arr.length > 0) {
    const filterMap = new Map()
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i]
      if (!filterMap.has(item[key])) {
        filterMap.set(item[key], item)
      }
    }
    return [...filterMap.values()]
  } else {
    return []
  }
}

/**
 * 多继承
 * @params {*} arr 需要继承的各个class类
 * @return
 */
export const mixinClass = (base, ...mixins) => {
  const mixinProps = (target, source) => {
    Object.getOwnPropertyNames(source).forEach((prop) => {
      if (/^constructor$/.test(prop)) {
        return
      }
      Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(source, prop))
    })
  }

  let Ctor
  if (base && typeof base === 'function') {
    Ctor = class extends base {
      constructor(...props) {
        super(...props)
      }
    }
    mixins.forEach((source) => {
      mixinProps(Ctor.prototype, source.prototype)
    })
  } else {
    Ctor = class {}
  }
  return Ctor
}

export function isExternalUrl(url) {
  return /(http|https):\/\/\S*/.test(url)
}
