const state = () => ({
  page: 0,
  hasMore: true,
})

const getters = {
  getPage: (state) => {
    return state.page
  },
  getHasMore: (state) => {
    return state.hasMore
  },
}

const mutations = {
  SET_PAGE(state, param) {
    state.page = param
  },
  SET_HAS_MORE(state, param) {
    state.hasMore = param
  },
}

const actions = {
  savePage({ commit }, param) {
    commit('SET_PAGE', param)
  },
  saveHasMore({ commit }, param) {
    commit('SET_HAS_MORE', param)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
