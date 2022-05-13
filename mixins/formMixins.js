export default {
  data() {
    return {
      rules: {
        provinsiRules: [
          (v) =>
            !!Object.getOwnPropertyNames(v).length || 'Provinsi is required',
        ],
        kotaKabupatenRules: [
          (v) =>
            !!Object.getOwnPropertyNames(v).length ||
            'Kota / Kabupaten is required',
        ],
        namaRules: [(v) => !!v || 'Nama is required'],
        alamatRules: [(v) => !!v || 'Alamat is required'],
        noHpRules: (v) => {
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
