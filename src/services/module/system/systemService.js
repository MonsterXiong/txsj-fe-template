import { service } from '@/services/http'

export default class SystemService {
  static async uploadFile(param) {
    return service.postForm('/system/file/uploadFile', param)
  }
}
