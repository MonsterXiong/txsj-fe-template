import configData from '@/utils/config'

export const axiosConfig = {
  baseURL: configData.baseUrl,
  headers: {
    get: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    post: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  },
  timeout: 60000,
  validateStatus() {
    return true
  },
}
