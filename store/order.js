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
    // eslint-disable-next-line no-console
    console.log('param', param)
    this.$axios
      .$get(`https://miniproject-express.netlify.app/${param.type}`, {
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
        // eslint-disable-next-line no-console
        console.log('result', result)
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error)
      })
  },
  fetchOngkir({ commit }, param) {
    // eslint-disable-next-line no-console
    console.log('param ongkir', param)
    this.$axios
      .$post(`https://miniproject-express.netlify.app/cost`, {
        ...param,
      })
      .then((result) => {
        commit('SET_TUJUAN', { ongkir: result })
        // eslint-disable-next-line no-console
        console.log('result', result)
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error)
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
