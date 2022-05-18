export default {
  data() {
    return {
      rules: {
        provinceRules: [
          (v) =>
            !!Object.getOwnPropertyNames(v).length || 'Province is required',
        ],
        cityRules: [
          (v) => !!Object.getOwnPropertyNames(v).length || 'City is required',
        ],
        nameRules: [(v) => !!v || 'Name is required'],
        addressRules: [(v) => !!v || 'Address is required'],
        phoneNumberRules: (v) => {
          if (!isNaN(parseInt(v)) && v.length > 11 && v.length < 14) return true
          return `Phone number must consist of 12 - 13 digits`
        },
        courierRules: [(v) => !!v || 'Courier is required'],
        courierServiceRules: [
          (v) => !!v.price || 'Courier Service is required',
        ],
      },
    }
  },
}
