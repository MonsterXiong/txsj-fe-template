import { UserService } from '@/services'
import store from 'storejs'
import { LocalStorageItems } from '@/common/constants.js'

const UserMutations = {
  SET_USER_INFO: 'SET_USER_INFO',
  SET_TOKEN: 'SET_TOKEN',
}

const state = {
  userInfo: store.get(LocalStorageItems.USER_INFO) || {},
  token: store.get(LocalStorageItems.TOKEN),
}

const getters = {
  token: (state) => state.token,
  username: (state) => state.userInfo.name,
  userInfo: (state) => state.userInfo,
}

const mutations = {
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo
    store.set(LocalStorageItems.USER_INFO, JSON.stringify(userInfo))
  },
  SET_TOKEN(state, token) {
    state.token = token
    store.set(LocalStorageItems.TOKEN, token)
  },
}

const actions = {
  async login({ commit }, payload) {
    return new Promise((resolve, reject) => {
      UserService.login(payload.account, payload.pass)
        .then((response) => {
          commit(UserMutations.SET_USER_INFO, response.data)
          commit(UserMutations.SET_TOKEN, response.data.token)
          store.set(LocalStorageItems.TOKEN, response.data.token)
          store.set(LocalStorageItems.USER_INFO, response.data)
          resolve(response.data)
        })
        .catch((err) => reject(err))
    })
  },
  async autoLogin({ commit }) {
    return new Promise((resolve, reject) => {
      UserService.autoLogin()
        .then((response) => {
          commit(UserMutations.SET_USER_INFO, response.data)
          commit(UserMutations.SET_TOKEN, response.data.token)
          store.set(LocalStorageItems.TOKEN, response.data.token)
          store.set(LocalStorageItems.USER_INFO, response.data)
          resolve(response.data)
        })
        .catch((err) => reject(err))
    })
  },
  async logout({ commit }) {
    commit(UserMutations.SET_USER_INFO, {})
    commit(UserMutations.SET_TOKEN, null)
    store.remove(LocalStorageItems.TOKEN)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
