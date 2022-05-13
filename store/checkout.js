const state = () => ({
  tujuan: {
    province: [],
    city: [],
    ongkir: [],
  },
  provinsi: {},
  kotaKabupaten: {},
  alamat: '',
  noHp: '',
  courier: '',
  courierService: {
    service: '',
    price: 0,
  },
  isValid: false,
})

const getters = {
  getTujuan: (state) => {
    return state.tujuan
  },
  getProvinsi: (state) => {
    return state.provinsi
  },
  getKotaKabupaten: (state) => {
    return state.kotaKabupaten
  },
  getAlamat: (state) => {
    return state.alamat
  },
  getNoHp: (state) => {
    return state.noHp
  },
  getCourier: (state) => {
    return state.courier
  },
  getCourierService: (state) => {
    return state.courierService
  },
  getIsValid: (state) => {
    return state.isValid
  },
}

const mutations = {
  SET_TUJUAN(state, param) {
    state.tujuan = { ...state.tujuan, ...param }
  },
  DELETE_TUJUAN(state, param) {
    state.tujuan = param
  },
  SET_PROVINSI(state, param) {
    state.provinsi = param
  },
  SET_KOTA_KABUPATEN(state, param) {
    state.kotaKabupaten = param
  },
  SET_ALAMAT(state, param) {
    state.alamat = param
  },
  SET_NO_HP(state, param) {
    state.noHp = param
  },
  SET_COURIER(state, param) {
    state.courier = param
  },
  SET_COURIER_SERVICE(state, param) {
    state.courierService = param
  },
  SET_IS_VALID(state, param) {
    state.isValid = param
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
  saveProvinsi({ commit }, param) {
    commit('SET_PROVINSI', param)
  },
  saveKotaKabupaten({ commit }, param) {
    commit('SET_KOTA_KABUPATEN', param)
  },
  saveAlamat({ commit }, param) {
    commit('SET_ALAMAT', param)
  },
  saveNoHp({ commit }, param) {
    commit('SET_NO_HP', param)
  },
  saveCourier({ commit }, param) {
    commit('SET_COURIER', param)
  },
  saveIsValid({ commit }, param) {
    commit('SET_IS_VALID', param)
  },
  deleteShippingDetail({ commit }) {
    commit('SET_PROVINSI', {})
    commit('SET_KOTA_KABUPATEN', {})
    commit('SET_ALAMAT', '')
    commit('SET_NO_HP', '')
    commit('SET_COURIER', '')
    commit('SET_COURIER_SERVICE', { service: '', price: 0 })
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
