import axios from 'axios'
import qs from 'qs'
import { axiosConfig } from './config'
import { requestResolve } from './requestHandler'
import { responseResolve } from './responseHandler'
import { errorHandler } from './errorHandler'

class Service {
  constructor() {
    this.instance = axios.create(axiosConfig)
    // 请求拦截器
    this.instance.interceptors.request.use(requestResolve, errorHandler)
    // 响应拦截器
    this.instance.interceptors.response.use(responseResolve, errorHandler)
  }

  get(url, params, config) {
    return this.instance.get(url, Object.assign({ params }, config))
  }

  post(url, data, config) {
    return this.instance.post(url, data, config)
  }

  postFormData(url, data, config) {
    const formData = new FormData()
    Object.keys(data).forEach((k) => {
      if (data[k] !== undefined && data[k] !== null) {
        if (data[k] instanceof Object) {
          Object.keys(data[k]).forEach((key) => {
            if (data[k] !== undefined && data[k] !== null) {
              formData.append(`${k}.${key}`, data[k][key])
            }
          })
        } else {
          formData.append(k, data[k])
        }
      }
    })
    return this.post(
      url,
      formData,
      Object.assign({}, config, {
        headers: { 'content-type': 'multipart/form-data' },
      })
    )
  }

  postFormDataFile(url, data, config) {
    const formData = new FormData()
    Object.keys(data).forEach((k) => {
      if (data[k] !== undefined && data[k] !== null) {
        formData.append(k, data[k])
      }
    })
    return this.post(
      url,
      formData,
      Object.assign({}, config, {
        headers: { 'content-type': 'multipart/form-data' },
      })
    )
  }

  postForm(url, form, config) {
    return this.post(
      url,
      form,
      Object.assign({}, config, {
        headers: { 'content-type': 'multipart/form-data' },
      })
    )
  }

  plainPostFormData(url, data, config) {
    const formData = new FormData()
    Object.keys(data).forEach((k) => {
      formData.append(k, data[k])
    })
    return this.post(
      url,
      formData,
      Object.assign({}, config, {
        headers: { 'content-type': 'multipart/form-data' },
      })
    )
  }

  postQuery(url, params, config) {
    return this.instance.post(url + '?' + qs.stringify(params), undefined, config)
  }

  postQueryToBlob(url, params, config) {
    return this.instance.post(
      url + '?' + qs.stringify(params),
      undefined,
      Object.assign({}, config, {
        responseType: 'blob',
      })
    )
  }

  deleteQuery(url, params, config) {
    return this.instance.delete(url + '?' + qs.stringify(params), config)
  }

  postXmlFormData(url, data, config) {
    const formData = new FormData()
    Object.keys(data).forEach((k) => {
      if (data[k] !== undefined && data[k] !== null) {
        formData.append(k, data[k])
      }
    })
    return this.post(
      url,
      formData,
      Object.assign({}, config, {
        headers: { 'content-type': 'multipart/form-data' },
      })
    )
  }
}

export const service = new Service()
