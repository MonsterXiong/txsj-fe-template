export function genCacheViewKey(name, params, type = 'route') {
  let id = ''
  if (type === 'modelKey') {
    if (isModel(name)) {
      const match = params.match(/\/model\/(.*)/)
      if (match && match[1]) {
        id = match[1]
      }
    } else if (isResourceList(name)) {
      const match = params.match(/\/resourceList\/(.*)/)
      if (match && match[1]) {
        id = match[1]
      }
    } else if (isGanttModel(name)) {
      const match = params.match(/\/Gantt\/(.*)/)
      if (match && match[1]) {
        id = match[1]
      }
    } else if (isProjectResourceList(name)) {
      const match = params.match(/\/projectResourceList\/(.*)/)
      if (match && match[1]) {
        id = match[1]
      }
    } else if (isStatisticalChart(name)) {
      const match = params.match(/\/statisticalChart\/(.*)/)
      if (match && match[1]) {
        id = match[1]
      }
    } else if (isRetrospective(name)) {
      const match = params.match(/\/retrospective\/(.*)/)
      if (match && match[1]) {
        id = match[1]
      }
    } else if (isModelElement(name)) {
      const arr = params.slpit('/')
      id = arr[arr.length - 1]
    } else if (isCheck(name)) {
      const match = params.match(/\/check\/(.*)/)
      if (match && match[1]) {
        id = match[1]
      }
    }
  } else if (type === 'route') {
    if (isModel(name) || isGanttModel(name) || isModelElement(name)) {
      id = params.modelId
    } else if (isResourceList(name) || isProjectResourceList(name) || isStatisticalChart(name) || isRetrospective(name)) {
      id = params.id
    } else if (isCheck(name)) {
      id = params.checkId
    }
  }
  return name + id
}

export function isModel(name) {
  return 'Model'.toLocaleLowerCase() === name.toLocaleLowerCase()
}

export function isGanttModel(name) {
  return 'GanttTable'.toLocaleLowerCase() === name.toLocaleLowerCase()
}

export function isResourceList(name) {
  return 'ResourceList'.toLocaleLowerCase() === name.toLocaleLowerCase()
}

export function isProjectResourceList(name) {
  return 'ProjectResourceList'.toLocaleLowerCase() === name.toLocaleLowerCase()
}

export function isStatisticalChart(name) {
  return 'StatisticalChart'.toLocaleLowerCase() === name.toLocaleLowerCase()
}

export function isRetrospective(name) {
  return 'Retrospective'.toLocaleLowerCase() === name.toLocaleLowerCase()
}

export function isModelElement(name) {
  return 'ModelElement'.toLocaleLowerCase() === name.toLocaleLowerCase()
}

export function isCheck(name) {
  return 'Check'.toLocaleLowerCase() === name.toLocaleLowerCase()
}

export const TagsViewMutations = {
  ADD_VISITED_VIEW: 'ADD_VISITED_VIEW',
  ADD_CACHED_VIEW: 'ADD_CACHED_VIEW',
  DEL_VISITED_VIEW: 'DEL_VISITED_VIEW',
  DEL_VISITED_VIEWLIST: 'DEL_VISITED_VIEWLIST',
  DEL_CACHED_VIEW: 'DEL_CACHED_VIEW',
  DEL_OTHERS_VISITED_VIEWS: 'DEL_OTHERS_VISITED_VIEWS',
  DEL_OTHERS_CACHED_VIEWS: 'DEL_OTHERS_CACHED_VIEWS',
  DEL_CACHED_VIEWLIST: 'DEL_CACHED_VIEWLIST',
  DEL_ALL_VISITED_VIEWS: 'DEL_ALL_VISITED_VIEWS',
  DEL_ALL_CACHED_VIEWS: 'DEL_ALL_CACHED_VIEWS',
  UPDATE_VISITED_VIEW: 'UPDATE_VISITED_VIEW',
  DRAG_SORT_VISITED_VIEW: 'DRAG_SORT_VISITED_VIEW',
  SET_ACTIVE_VIEW: 'SET_ACTIVE_VIEW',
  UPDATE_MODEL_VIEW_NAME: 'UPDATE_MODEL_VIEW_NAME',
  CHANGE_VISITED_VIEW_EDIT: 'CHANGE_VISITED_VIEW_EDIT',
  CHANGE_CACHED_VIEW_EDIT: 'CHANGE_CACHED_VIEW_EDIT',
}

const state = {
  visitedViews: [],
  cachedViews: [],
}

const getters = {
  visitedViews: (state) => state.visitedViews,
  cachedViews: (state) => state.cachedViews,
}
//-------------TODO   先随便写一下 lcl 有时间整理一下------------------
const mutations = {
  [TagsViewMutations.DRAG_SORT_VISITED_VIEW]: (state, { dragIndex, index, view }) => {
    state.visitedViews.splice(dragIndex, 1)
    state.visitedViews.splice(index, 0, view)
  },
  [TagsViewMutations.ADD_VISITED_VIEW]: (state, view) => {
    if (state.visitedViews.some((v) => v.path === view.path)) return
    state.visitedViews.push(
      Object.assign({}, view, {
        title: view.query.tagName || view.meta.title || 'no-name',
        isEdit: false,
      })
    )
  },
  [TagsViewMutations.ADD_CACHED_VIEW]: (state, view) => {
    let name = genCacheViewKey(view.name, view.params)
    if (state.cachedViews.includes(name)) {
      return
    }
    if (!view.meta.noCache) {
      state.cachedViews.push(name)
    }
  },

  [TagsViewMutations.DEL_VISITED_VIEW]: (state, view) => {
    if (view.name != 'welcome') {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews.splice(i, 1)
          break
        }
      }
    }
  },
  [TagsViewMutations.DEL_VISITED_VIEWLIST]: (state, viewList) => {
    if (viewList && viewList.length > 0) {
      for (let index = 0, len = viewList.length; index < len; index++) {
        const view = viewList[index]
        for (const [i, v] of state.visitedViews.entries()) {
          if (v.path === view.path) {
            state.visitedViews.splice(i, 1)
            break
          }
        }
      }
    }
  },
  [TagsViewMutations.DEL_CACHED_VIEW]: (state, view) => {
    if (view.name != 'welcome') {
      let name = genCacheViewKey(view.name, view.params)
      const index = state.cachedViews.indexOf(name)
      index > -1 && state.cachedViews.splice(index, 1)
    }
  },
  [TagsViewMutations.DEL_CACHED_VIEWLIST]: (state, viewList) => {
    if (viewList && viewList.length > 0) {
      for (let index = 0, len = viewList.length; index < len; index++) {
        const view = viewList[index]
        if (view) {
          let name = genCacheViewKey(view.name, view.params)
          const index = state.cachedViews.indexOf(name)
          index > -1 && state.cachedViews.splice(index, 1)
        }
      }
    }
  },

  [TagsViewMutations.DEL_OTHERS_VISITED_VIEWS]: (state, view) => {
    state.visitedViews = state.visitedViews.filter((v) => {
      return v.meta.affix || v.path === view.path
    })
  },
  [TagsViewMutations.DEL_OTHERS_CACHED_VIEWS]: (state, view) => {
    let name = genCacheViewKey(view.name, view.params)
    const index = state.cachedViews.indexOf(name)
    if (index > -1) {
      state.cachedViews = state.cachedViews.slice(index, index + 1)
    } else {
      // if index = -1, there is no cached tags
      state.cachedViews = []
    }
  },

  [TagsViewMutations.DEL_ALL_VISITED_VIEWS]: (state) => {
    state.visitedViews = []
  },
  [TagsViewMutations.DEL_ALL_CACHED_VIEWS]: (state) => {
    state.cachedViews = []
  },

  [TagsViewMutations.UPDATE_VISITED_VIEW]: (state, view) => {
    // 编辑模型传入的数据
    for (let v of state.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  },
  [TagsViewMutations.UPDATE_MODEL_VIEW_NAME]: (state, { modelId, title }) => {
    const modelInfo = state.visitedViews.find((item) => item.params.modelId === modelId)
    if (modelInfo) {
      modelInfo.title = title
    }
  },
  [TagsViewMutations.CHANGE_VISITED_VIEW_EDIT]: (state, { modelId, statu }) => {
    const modelInfo = state.visitedViews.find((item) => item?.params.modelId === modelId)
    if (modelInfo) {
      modelInfo.isEdit = statu
    }
  },
  [TagsViewMutations.CHANGE_CACHED_VIEW_EDIT]: (state, { modelId, statu }) => {
    // const modelInfo = state.cachedViews.find((item) => item?.params.modelId === modelId)
    // if (modelInfo) {
    //   modelInfo.isEdit = statu
    // }
  },
}

const actions = {
  addView({ dispatch }, view) {
    dispatch('addVisitedView', view)
    dispatch('addCachedView', view)
  },
  addVisitedView({ commit }, view) {
    commit(TagsViewMutations.ADD_VISITED_VIEW, view)
  },
  addCachedView({ commit }, view) {
    commit(TagsViewMutations.ADD_CACHED_VIEW, view)
  },
  changeViewEdit({ dispatch }, { modelId, statu }) {
    dispatch('changeVisitedViewEdit', { modelId, statu })
    dispatch('changeCachedViewEdit', { modelId, statu })
  },
  changeVisitedViewEdit({ commit }, view) {
    commit(TagsViewMutations.CHANGE_VISITED_VIEW_EDIT, view)
  },
  changeCachedViewEdit({ commit }, view) {
    commit(TagsViewMutations.CHANGE_CACHED_VIEW_EDIT, view)
  },

  delView({ dispatch, state }, view) {
    if (view.name != 'welcome') {
      return new Promise((resolve) => {
        dispatch('delVisitedView', view)
        dispatch('delCachedView', view)
        resolve({
          visitedViews: [...state.visitedViews],
          cachedViews: [...state.cachedViews],
        })
      })
    }
    return new Promise((resolve) => {
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews],
      })
    })
  },

  delViewList({ dispatch, state }, viewList) {
    return new Promise((resolve) => {
      dispatch('delVisitedViewList', viewList)
      dispatch('delCachedViewList', viewList)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews],
      })
    })
  },

  delVisitedViewList({ commit, state }, viewList) {
    return new Promise((resolve) => {
      commit(TagsViewMutations.DEL_VISITED_VIEWLIST, viewList)
      resolve({
        visitedViews: [...state.visitedViews],
      })
    })
  },

  delCachedViewList({ commit, state }, viewList) {
    return new Promise((resolve) => {
      commit(TagsViewMutations.DEL_CACHED_VIEWLIST, viewList)
      resolve({
        cachedViews: [...state.cachedViews],
      })
    })
  },
  delVisitedView({ commit, state }, view) {
    return new Promise((resolve) => {
      commit(TagsViewMutations.DEL_VISITED_VIEW, view)
      resolve([...state.visitedViews])
    })
  },
  delCachedView({ commit, state }, view) {
    return new Promise((resolve) => {
      commit(TagsViewMutations.DEL_CACHED_VIEW, view)
      resolve([...state.cachedViews])
    })
  },

  delOthersViews({ dispatch, state }, view) {
    return new Promise((resolve) => {
      dispatch('delOthersVisitedViews', view)
      dispatch('delOthersCachedViews', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews],
      })
    })
  },
  delOthersVisitedViews({ commit, state }, view) {
    return new Promise((resolve) => {
      commit(TagsViewMutations.DEL_OTHERS_VISITED_VIEWS, view)
      resolve([...state.visitedViews])
    })
  },
  delOthersCachedViews({ commit, state }, view) {
    return new Promise((resolve) => {
      commit(TagsViewMutations.DEL_OTHERS_CACHED_VIEWS, view)
      resolve([...state.cachedViews])
    })
  },

  delAllViews({ dispatch, state }, view) {
    return new Promise((resolve) => {
      dispatch('delAllVisitedViews', view)
      dispatch('delAllCachedViews', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews],
      })
    })
  },
  delAllVisitedViews({ commit, state }) {
    return new Promise((resolve) => {
      commit(TagsViewMutations.DEL_ALL_VISITED_VIEWS)
      resolve([...state.visitedViews])
    })
  },
  delAllCachedViews({ commit, state }) {
    return new Promise((resolve) => {
      commit(TagsViewMutations.DEL_ALL_CACHED_VIEWS)
      resolve([...state.cachedViews])
    })
  },
  updateVisitedView({ commit }, view) {
    commit(TagsViewMutations.UPDATE_VISITED_VIEW, view)
  },
  updateModelViewName({ commit }, { modelId, title }) {
    commit(TagsViewMutations.UPDATE_MODEL_VIEW_NAME, { modelId, title })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
