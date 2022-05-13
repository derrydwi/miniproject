<template>
  <v-card class="pa-6 mt-8 mx-auto" width="600" outlined>
    <p class="text-md-body-1 font-weight-bold mt-1 mb-8">Shipping Detail</p>
    <v-form
      ref="form"
      v-model="isValid"
      @submit.prevent="isValid && $router.push({ name: 'checkout' })"
    >
      <v-text-field
        v-model="noHp"
        class="input-no-hp"
        label="No. Hp"
        outlined
        :counter="13"
        :rules="[noHpRules]"
        color="accent"
      ></v-text-field>
      <v-autocomplete
        v-model="provinsi"
        :items="tujuan.province"
        item-value="province_id"
        item-text="province"
        return-object
        :rules="provinsiRules"
        label="Provinsi"
        outlined
        color="accent"
      ></v-autocomplete>
      <v-autocomplete
        v-model="kotaKabupaten"
        :items="tujuan.city"
        item-value="city_id"
        item-text="city_name"
        return-object
        :rules="kotaKabupatenRules"
        label="Kota / Kabupaten"
        outlined
        color="accent"
      >
        <template slot="selection" slot-scope="data">
          {{ data.item.type }} {{ data.item.city_name }}
        </template>
        <template slot="item" slot-scope="data">
          {{ data.item.type }} {{ data.item.city_name }}
        </template></v-autocomplete
      >
      <v-textarea
        v-model="alamat"
        label="Alamat"
        outlined
        :rules="alamatRules"
        color="accent"
      ></v-textarea>
      <v-radio-group v-model="courier" :rules="courierRules" class="mt-0">
        <p>Pilih Kurir</p>
        <v-radio
          v-for="item in courierItems"
          :key="item"
          :label="item"
          :value="item"
          color="accent"
          class="text-uppercase"
        ></v-radio>
        <v-radio-group
          v-if="courier"
          v-model="courierService"
          :rules="courierServiceRules"
        >
          <p>Pilih Layanan</p>
          <v-radio
            v-for="(ongkirItem, index) in tujuan.ongkir"
            :key="index"
            :label="`${ongkirItem.service} | ${$formatMoney(
              ongkirItem.cost[0].value
            )} | ${ongkirItem.cost[0].etd} ${courier !== 'pos' ? 'Day' : ''}`"
            :value="{
              service: ongkirItem.service,
              price: ongkirItem.cost[0].value,
            }"
            color="accent"
          ></v-radio>
        </v-radio-group>
      </v-radio-group>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: 'CheckoutShippingDetail',
  props: {
    totalWeight: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      provinsiRules: [(v) => !!Object.keys(v).length || 'Provinsi is required'],
      kotaKabupatenRules: [
        (v) => !!Object.keys(v).length || 'Kota / Kabupaten is required',
      ],
      alamatRules: [(v) => !!v || 'Alamat is required'],
      noHpRules: (v) => {
        if (!isNaN(parseInt(v)) && v.length > 11 && v.length < 14) return true
        return `Phone number must consist of 12 - 13 digits`
      },
      courierRules: [(v) => !!v || 'Courier is required'],
      courierServiceRules: [(v) => !!v.price || 'Courier Service is required'],
      courierItems: ['jne', 'tiki', 'pos'],
    }
  },
  computed: {
    tujuan() {
      return this.$store.getters['checkout/getTujuan']
    },
    noHp: {
      get() {
        return this.$store.getters['checkout/getNoHp']
      },
      set(value) {
        this.$store.dispatch('checkout/saveNoHp', value)
      },
    },
    provinsi: {
      get() {
        return this.$store.getters['checkout/getProvinsi']
      },
      set(value) {
        this.$store.dispatch('checkout/saveProvinsi', value)
      },
    },
    kotaKabupaten: {
      get() {
        return this.$store.getters['checkout/getKotaKabupaten']
      },
      set(value) {
        this.$store.dispatch('checkout/saveKotaKabupaten', value)
      },
    },
    alamat: {
      get() {
        return this.$store.getters['checkout/getAlamat']
      },
      set(value) {
        this.$store.dispatch('checkout/saveAlamat', value)
      },
    },
    courier: {
      get() {
        return this.$store.getters['checkout/getCourier']
      },
      set(value) {
        this.$store.dispatch('checkout/saveCourier', value)
      },
    },
    courierService: {
      get() {
        return this.$store.getters['checkout/getCourierService']
      },
      set(value) {
        this.$store.dispatch('checkout/saveCourierService', value)
      },
    },
    isValid: {
      get() {
        return this.$store.getters['checkout/getIsValid']
      },
      set(value) {
        this.$store.dispatch('checkout/saveIsValid', value)
      },
    },
  },
  watch: {
    provinsi() {
      this.$store.dispatch('checkout/fetchWilayah', {
        type: 'city',
        param: 'provincea',
        id: this.provinsi.province_id,
      })
      this.$store.dispatch('checkout/saveKotaKabupaten', {})
      this.$store.dispatch('checkout/saveAlamat', '')
      this.$store.dispatch('checkout/saveCourier', '')
      this.$store.dispatch('checkout/deleteCourierService')
    },
    courier() {
      this.fetchOngkir()
    },
    kotaKabupaten() {
      this.fetchOngkir()
    },
  },
  mounted() {
    this.$store.dispatch('checkout/deleteTujuan')
    this.$store.dispatch('checkout/fetchWilayah', { type: 'province' })
  },
  methods: {
    fetchOngkir() {
      if (this.kotaKabupaten.city_id && this.courier) {
        this.$store.dispatch('checkout/fetchOngkir', {
          /*
          STORE LOCATION (ORIGIN)
          "city_id": "152",
          "province_id": "6",
          "province": "DKI Jakarta",
          "type": "Kota",
          "city_name": "Jakarta Pusat",
          "postal_code": "10540"
          */
          origin: 152,
          destination: this.kotaKabupaten.city_id,
          weight: this.totalWeight,
          courier: this.courier,
        })
        this.$store.dispatch('checkout/deleteCourierService')
      }
    },
  },
}
</script>