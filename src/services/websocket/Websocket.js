import { initSocketFn, subscribeFn, unSubscribeFn, closeSocketFn } from './socketUtil'

class Websocket {
  static stompClientMap = new Map()
  static async _getSingletonInstance(url, headers, subscribeList = []) {
    let stompClient = this.stompClientMap.get(url)
    if (!stompClient) {
      stompClient = await initSocketFn(url, headers, subscribeList)
      this.stompClientMap.set(url, stompClient)
      stompClient.hadSubscribe = true
    } else {
      stompClient.hadSubscribe = false
    }
    return stompClient
  }
  static async subscribe(url, header, subscribeList, vm) {
    const stompClient = await this._getSingletonInstance(url, header, subscribeList)
    if (!stompClient.hadSubscribe) {
      subscribeList &&
        subscribeList.forEach((item) => {
          subscribeFn(stompClient, item.endpoint, item.cbFn, vm)
        })
    }
  }
  static async unSubscribe(url, endpoint) {
    const stompClient = this.stompClientMap.get(url)
    if (stompClient) {
      unSubscribeFn(stompClient, endpoint)
    } else {
      console.error('当前websocket没有连接上！！！')
    }
  }
  static async closeSocket(url, cbFn, ...params) {
    const stompClient = this.stompClientMap.get(url)
    if (stompClient) {
      closeSocketFn(stompClient, cbFn, params)
    } else {
      console.error('当前websocket没有连接上！！！')
    }
  }
  static async send(url, headers, endpoint, jsonStr) {
    const stompClient = this.stompClientMap.get(url)
    stompClient?.send(endpoint, headers, jsonStr)
  }
}

export { Websocket }
