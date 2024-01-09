import { service } from '@/services/http'

/**
 * 关于日志的服务
 */
export default class LogService {
  static async findLog(params) {
    return service.postQuery('/log/findLog', params)
  }

  static async exportExcel(params) {
    return service.get('/log/exportExcel', params, {
      responseType: 'blob',
    })
  }

  /**
   * @description 清除日志
   * @param params 开始、结束时间
   * @returns
   */
  static async cleanLogs(params) {
    return service.postQuery('/log/cleanLogs', params)
  }
}
