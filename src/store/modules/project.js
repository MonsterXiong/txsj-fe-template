import store from 'storejs'
import { LocalStorageItems } from '@/common/constants.js'

export const ProjectMutations = {
  ADD_PROJECT: 'ADD_PROJECT',
  DELETE_PROJECT: 'DELETE_PROJECT',
  DELETE_ALL_PROJECT: 'DELETE_ALL_PROJECT',
}

const state = {
  recentOpenProjectIds: store.get(LocalStorageItems.RECENT_OPENP_PROJECT_IDS) || [],
}

const getters = {
  recentOpenProjectIds: (state) => state.recentOpenProjectIds,
}

const mutations = {
  [ProjectMutations.ADD_PROJECT]: (state, projectId) => {
    if (projectId) {
      const index = state.recentOpenProjectIds.findIndex((item) => projectId == item)
      //原本存在就删掉
      if (index > -1) {
        state.recentOpenProjectIds.splice(index, 1)
      }
      state.recentOpenProjectIds.unshift(projectId)
      store.set(LocalStorageItems.RECENT_OPENP_PROJECT_IDS, state.recentOpenProjectIds)
    }
  },
  [ProjectMutations.DELETE_PROJECT]: (state, projectId) => {
    const index = state.recentOpenProjectIds.findIndex((item) => projectId == item)
    if (index > -1) {
      state.recentOpenProjectIds.splice(index, 1)
      store.set(LocalStorageItems.RECENT_OPENP_PROJECT_IDS, state.recentOpenProjectIds)
    }
  },
  [ProjectMutations.DELETE_ALL_PROJECT]: (state) => {
    state.recentOpenProjectIds = []
    store.set(LocalStorageItems.RECENT_OPENP_PROJECT_IDS, state.recentOpenProjectIds)
  },
}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
