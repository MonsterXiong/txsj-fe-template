import { service } from '@/services/http'

/**
 * 关于用户的服务
 */
export default class UserService {
  /**
   * @description 用户登录
   * @param userName 用户名
   * @param password 密码
   * @returns
   */
  static async login(account, password) {
    return service.postFormData('/user/login', { password, account })
  }

  /**
   * @description 前端自动登录
   * @returns
   */
  static async autoLogin() {
    return service.postFormData('/user/login', { account: 'admin', password: 123 })
  }

  /**
   * @description 分页查询用户
   * @param pageNumber 页码
   * @param pageSize 每页大小
   * @param roleName 用户名称
   * @returns
   */
  static async findUser(page, rows, search) {
    return service.postQuery('/user/findUser', { page, rows, search })
  }

  static async getUserComplex(params) {
    return service.post('/user/findUserComplex', params)
  }

  /**
   * @description 编辑用户
   * @param roleDTO 用户参数
   * @returns
   */
  static async updateUser(userDTO, roleIds, rePasswordText) {
    return service.postFormData('/user/updateUser', {
      user: userDTO,
      roleId: roleIds,
      rePasswordText,
    })
  }

  /**
   * @description 编辑用户
   * @param roleDTO 用户参数
   * @returns
   */
  static async insertUser(userDTO, roleIds, rePasswordText) {
    return service.postFormData('/user/insertUser', {
      user: userDTO,
      roleId: roleIds,
      rePasswordText,
    })
  }

  /**
   * @description 删除用户
   * @param ids 用户ids
   * @returns
   */
  static async deleteUser(ids) {
    return service.postQuery('/user/deleteUser', { ids })
  }

  /**
   * @description 用户详情
   * @param id 用户id
   * @returns
   */
  static async getUserDetail(id) {
    return service.postQuery('/user/getUser', { id })
  }

  /**
   * 获取导航菜单项数组
   * @returns
   */
  static async getNavMenuList() {
    return service.get('/lowcode/archiFunction/getMenuByUserIdToOne')
  }
  /**
   * 获取导航菜单项数组(新)
   * @returns
   */
  static async getMenuList(params) {
    return service.postQuery('/lowcode/archiFunction/queryMenu', params)
  }
  // 设置用户主题 /user/setTheme
  static async setUserTheme(theme) {
    return service.get('/user/setTheme', theme)
  }
}
