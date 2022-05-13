const state = () => ({
  isDark: false,
})

const getters = {
  getIsDark: (state) => {
    return state.isDark
  },
}

const mutations = {
  SET_IS_DARK(state) {
    state.isDark = !state.isDark
  },
}

const actions = {
  saveIsDark({ commit }) {
    commit('SET_IS_DARK')
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
