import { addPending, removePending } from './pendingHandler'
import store from 'storejs'
import { LocalStorageItems } from '@/common/constants.js'

export function requestResolve(config) {
  // 获取token，并将其添加至请求头中
  // removePending(config) // 在请求开始前，对之前的请求做检查取消操作
  // addPending(config) // 将当前请求添加到 pending 中
  const token = store.get(LocalStorageItems.TOKEN)
  if (token) {
    config.headers.token = token
  }
  return config
}

export function requestReject(error) {
  // 错误抛到业务代码
  // error.data = {}
  // error.data.msg = '服务器异常'

  return Promise.resolve(error)
}
