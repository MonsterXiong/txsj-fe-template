import Stomp from 'stompjs'
import SockJS from 'sockjs-client'
import { uuid } from '@/utils/commonUtil'
export function initSocketFn(sockerUrl, header, subscribeList, vm) {
  // 建立连接对象
  const socket = new SockJS(sockerUrl)
  // 获取Stomp子协议的客户端对象
  const stompClient = Stomp.over(socket)
  // 向服务器发起websocket连接
  stompClient.connect(
    header, // 客户端的认证信息
    (frame) => {
      console.log('websocket连接成功......')
      if (subscribeList && subscribeList.length > 0) {
        handleConnectSuccess(stompClient, subscribeList, vm)
      }
    },
    (err) => {
      console.error('websocket连接失败...... 将自动进行重连，直至连接成功为止', err)
      reconnect(stompClient, subscribeList, vm)
    }
  )
  // client will send heartbeats every 5000ms
  stompClient.heartbeat.outgoing = 5000
  // client does not want to receive heartbeats
  stompClient.heartbeat.incoming = 0
  window.stompClient = stompClient
  return stompClient
}

export function closeSocketFn(stompClient, cbFn, ...params) {
  if (!stompClient.connected) {
    console.error('没有连接,无法断开连接')
    return
  }
  if (stompClient) {
    stompClient.disconnect(() => {
      console.log('socket连接关闭')
      cbFn && cbFn.apply(this, params)
    })
  }
}

function handleConnectSuccess(stompClient, subscribeList, vm) {
  if (subscribeList) {
    subscribeList.forEach((item) => {
      subscribeFn(stompClient, item.endpoint, item.cbFn, vm)
    })
  }
}

// 订阅
export function subscribeFn(stompClient, endpoint, callbackFn, vm) {
  window.stompClient = stompClient
  return stompClient.subscribe(
    endpoint,
    (message) => {
      const body = message.body
      callbackFn.call(vm, body)
    },
    {
      id: uuid() + endpoint,
    }
  )
}

// 取消订阅
export function unSubscribeFn(stompClient, endpoint) {
  let id = ''
  for (let item in stompClient.subscriptions) {
    if (item.endsWith(endpoint)) {
      id = item
      break
    }
  }
  stompClient.unsubscribe(id, endpoint)
  console.log('取消订阅成功 -> id:' + id + ' endpoint:' + endpoint)
}

function reconnect(stompClient, subscribeList, vm) {
  let i = 0
  const timer = setInterval(() => {
    i++
    if (i > 10) {
      clearInterval(timer)
      return
    }
    stompClient.connect(
      {},
      (frame) => {
        console.log('websocket重连成功')
        clearInterval(timer)
        if (subscribeList && subscribeList.length > 0) {
          handleConnectSuccess(stompClient, subscribeList, vm)
        }
      },
      (err) => {
        console.error('websocket重连失败... 1秒之后进行重新连接', err)
      }
    )
  }, 1000)
  return stompClient
}
