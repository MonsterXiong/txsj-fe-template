export const SettingMutations = {
  TOGGLE_SIDE_TREE: 'toggleSideTree',
  TOGGLE_LOADING: 'loadingLoading',
  SET_LOADING: 'setLoading',
  SET_IS_COLLAPSE_GUIDANCE: 'SET_IS_COLLAPSE_GUIDANCE',
}
const state = {
  sideTreeStatus: true,
  loading: false,
  isCollapseGuidance: false,
}

const getters = {
  getSideTreeStatus: (state) => state.sideTreeStatus,
  getLoading: (state) => state.loading,
  getIsCollapseGuidance: (state) => state.isCollapseGuidance,
}

const mutations = {
  [SettingMutations.TOGGLE_SIDE_TREE]: (state) => {
    state.sideTreeStatus = !state.sideTreeStatus
  },
  [SettingMutations.TOGGLE_LOADING]: (state) => {
    state.loading = !state.loading
  },
  [SettingMutations.SET_LOADING]: (state, loadingStatus) => {
    state.loading = loadingStatus
  },
  [SettingMutations.SET_IS_COLLAPSE_GUIDANCE]: (state, isCollapse) => {
    state.isCollapseGuidance = isCollapse
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
