const state = () => ({
  tujuan: {
    province: [],
    city: [],
    ongkir: [],
  },
  province: {},
  city: {},
  address: '',
  name: '',
  phoneNumber: '',
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
  getProvince: (state) => {
    return state.province
  },
  getCity: (state) => {
    return state.city
  },
  getAddress: (state) => {
    return state.address
  },
  getName: (state) => {
    return state.name
  },
  getPhoneNumber: (state) => {
    return state.phoneNumber
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
  SET_PROVINCE(state, param) {
    state.province = param
  },
  SET_CITY(state, param) {
    state.city = param
  },
  SET_ADDRESS(state, param) {
    state.address = param
  },
  SET_NAME(state, param) {
    state.name = param
  },
  SET_PHONE_NUMBER(state, param) {
    state.phoneNumber = param
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
  fetchWilayah({ commit, dispatch }, param) {
    if (param.type === 'city') dispatch('deleteShippingDetail')
    this.$axios
      .$get(`/api/shipping/${param.type}`, {
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
    commit('SET_COURIER_SERVICE', { service: '', price: 0 })
    this.$axios
      .$post('/api/shipping/cost', {
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
  saveCourierService({ commit }, param) {
    commit('SET_COURIER_SERVICE', param)
  },
  deleteCourierService({ commit }) {
    commit('SET_COURIER_SERVICE', { service: '', price: 0 })
  },
  saveProvince({ commit }, param) {
    commit('SET_PROVINCE', param)
  },
  saveCity({ commit }, param) {
    commit('SET_CITY', param)
  },
  saveAddress({ commit }, param) {
    commit('SET_ADDRESS', param)
  },
  saveName({ commit }, param) {
    commit('SET_NAME', param)
  },
  savePhoneNumber({ commit }, param) {
    commit('SET_PHONE_NUMBER', param)
  },
  saveCourier({ commit }, param) {
    commit('SET_COURIER', param)
  },
  saveIsValid({ commit }, param) {
    commit('SET_IS_VALID', param)
  },
  deleteShippingDetail({ commit }) {
    commit('SET_CITY', {})
    commit('SET_ADDRESS', '')
    commit('SET_COURIER', '')
    commit('SET_COURIER_SERVICE', { service: '', price: 0 })
  },
  deleteAllShippingDetail({ commit }) {
    commit('SET_PROVINCE', {})
    commit('SET_CITY', {})
    commit('SET_ADDRESS', '')
    commit('SET_NAME', '')
    commit('SET_PHONE_NUMBER', '')
    commit('SET_COURIER', '')
    commit('SET_COURIER_SERVICE', { service: '', price: 0 })
    commit('DELETE_TUJUAN', { province: [], city: [], ongkir: [] })
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
