import { MessageBox, Message } from 'element-ui'

export const tools = {
  message(msg, options) {
    Message.closeAll()
    return Message(Object.assign({ type: 'success', message: msg, duration: 500 }, options))
  },

  confirm(message, options) {
    return MessageBox(
      Object.assign(
        {
          type: 'warning',
          title: '提示',
          message,
          showCancelButton: true,
          cancelButtonText: '取 消',
          confirmButtonText: '确 定',
        },
        options
      )
    )
  },
}

export default tools
