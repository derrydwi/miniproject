const state = () => ({
  tujuan: {},
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
      .$get(`https://dev.farizdotid.com/api/daerahindonesia/${param.type}`, {
        params: { [param.param]: [param.id] },
      })
      .then((result) => {
        commit('SET_TUJUAN', {
          ...(param.type === 'provinsi' && {
            [param.type]: result[param.type],
            kota: [],
            kecamatan: [],
            kelurahan: [],
          }),
          ...(param.type === 'kota' && {
            [param.type]: result[param.response],
            kecamatan: [],
            kelurahan: [],
          }),
          ...(param.type === 'kecamatan' && {
            [param.type]: result[param.type],
            kelurahan: [],
          }),
          ...(param.type === 'kelurahan' && {
            [param.type]: result[param.type],
          }),
        })
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error)
      })
  },
  deleteTujuan({ commit }) {
    commit('DELETE_TUJUAN', {})
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
