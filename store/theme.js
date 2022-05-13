const state = () => ({
  isDark: false,
})

const getters = {
  getIsDark: (state) => {
    return state.isDark
  },
}

const mutations = {
  SET_IS_DARK(state, param) {
    state.isDark = param
  },
}

const actions = {
  saveIsDark({ commit }, param) {
    commit('SET_IS_DARK', param)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
