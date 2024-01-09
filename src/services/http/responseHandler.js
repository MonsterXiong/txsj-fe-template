import { removePending } from './pendingHandler'
import { Message } from 'element-ui'
import router from '@/router'
import store from '@/store'

export function responseResolve(res) {
  // removePending(res) // 在请求结束后，移除本次请求
  if (res && res.status === 200) {
    //判断是不是请求的blob数据，若是blob数据，直接返回
    if (res.config && res.config.responseType == 'blob') {
      return Promise.resolve(res.data)
    }
    const state = res.data.statusCode
    const code = res.data.code
    //服务器返回内容是对的
    if (state === 200 && code === 200) {
      return Promise.resolve(res.data)
    } else if (code === 401) {
      store.dispatch('user/logout').then((res) => {
        router.push(`/login?redirectUrl=${router.currentRoute.fullPath}`)
      })
      return
    }
  }

  Message.error(res.data.message ? res.data.message : '未知请求错误')
  return Promise.reject(res.data)
}
