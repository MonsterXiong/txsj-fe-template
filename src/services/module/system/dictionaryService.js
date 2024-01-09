import { service } from '@/services/http'

/**
 * 关于枚举字典的服务
 */
export default class DictionaryService {
  // 查询枚举结构
  static async queryArchiDictStruct(params) {
    return service.postQuery('/lowcode/archiDict/queryArchiDictStruct', params)
  }

  // 查询枚举属性
  static async queryMetaEnumAttri(params) {
    return service.postQuery('/lowcode/archiDict/queryMetaEnumAttri', params)
  }

  // 增加枚举属性
  static async insertEnumAttri(params) {
    return service.postFormData('/lowcode/archiDict/insertEnumAttri', params)
  }

  // 修改枚举属性
  static async updateMetaEnumAttri(params) {
    return service.postFormData('/lowcode/archiDict/updateMetaEnumAttri', params)
  }

  // 删除枚举属性
  static async deleteMetaEnumAttri(params) {
    return service.postQuery('/lowcode/archiDict/deleteMetaEnumAttri', params)
  }

  //获取元枚举属性
  static async queryMetaEnumAttriByCode(params) {
    return service.postQuery('/lowcode/archiDict/queryMetaEnumAttriByCode', params)
  }

  // 查询字典数据
  // algorithm_model_type 算法模型类型
  // algorithm_model_shape 算法模型形式
  static async queryDictData(params) {
    return service.post(`/lowcode/archiDict/queryDictData?cateoryCode=${params}`)
  }
}
