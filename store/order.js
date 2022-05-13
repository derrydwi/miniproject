const state = () => ({
  tujuan: {
    province: [],
    city: [],
    ongkir: [],
  },
  destination: {
    provinsi: {},
    kotaKabupaten: {},
    kecamatan: {},
    kelurahan: {},
    alamat: '',
    noHp: '',
  },
  courierService: {
    service: '',
    price: 0,
  },
})

const getters = {
  getTujuan: (state) => {
    return state.tujuan
  },
  getCourierService: (state) => {
    return state.courierService
  },
}

const mutations = {
  SET_TUJUAN(state, param) {
    state.tujuan = { ...state.tujuan, ...param }
  },
  DELETE_TUJUAN(state, param) {
    state.tujuan = param
  },
  SET_COURIER_SERVICE(state, param) {
    state.courierService = param
  },
}

const actions = {
  fetchWilayah({ commit }, param) {
    this.$axios
      .$get(`/api/${param.type}`, {
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
    commit('SET_TUJUAN', { ongkir: [] })
    this.$axios
      .$post('/api/cost', {
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
  saveCourierService({ commit }, param) {
    commit('SET_COURIER_SERVICE', param)
  },
  deleteCourierService({ commit }) {
    commit('SET_COURIER_SERVICE', { service: '', price: 0 })
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
