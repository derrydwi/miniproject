const state = () => ({
  tujuan: {
    province: [],
    city: [],
    ongkir: [],
  },
})

const getters = {
  getTujuan: (state) => {
    return state.tujuan
  },
}

const mutations = {
  SET_TUJUAN(state, param) {
    state.tujuan = { ...state.tujuan, ...param }
  },
  DELETE_TUJUAN(state, param) {
    state.tujuan = param
  },
}

const actions = {
  fetchWilayah({ commit }, param) {
    this.$axios
      .$get(`/${param.type}`, {
        params: {
          [param.param]: param.id,
        },
      })
      .then((result) => {
        commit('SET_TUJUAN', {
          [param.type]: result,
          ...(param.type === 'province' && {
            city: [],
          }),
        })
      })
      .catch((error) => {
        this.$showAlert({
          text: `Failed when fetch province. ${error.message}`,
          icon: 'error',
        })
      })
  },
  fetchOngkir({ commit }, param) {
    this.$axios
      .$post('/cost', {
        ...param,
      })
      .then((result) => {
        commit('SET_TUJUAN', { ongkir: result })
      })
      .catch((error) => {
        this.$showAlert({
          text: `Failed when fetch shipping service. ${error.message}`,
          icon: 'error',
        })
      })
  },
  deleteTujuan({ commit }) {
    commit('DELETE_TUJUAN', { province: [], city: [], ongkir: [] })
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
