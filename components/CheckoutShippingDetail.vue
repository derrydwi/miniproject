<template>
  <v-card class="el pa-6 mt-8 mx-auto" width="600">
    <p class="text-md-body-1 font-weight-bold mt-1 mb-8">Shipping Detail</p>
    <v-form
      ref="form"
      v-model="isValid"
      @submit.prevent="isValid && $router.push({ name: 'checkout' })"
    >
      <v-autocomplete
        v-model="provinsi"
        :items="tujuan.province"
        item-value="province_id"
        item-text="province"
        return-object
        :disabled="!tujuan.province.length"
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
        :disabled="!tujuan.city.length"
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
        :disabled="!kotaKabupaten.city_name"
        color="accent"
      ></v-textarea>
      <v-text-field
        v-model="noHp"
        class="input-no-hp"
        label="No. Hp"
        outlined
        :disabled="!alamat"
        :counter="13"
        color="accent"
      ></v-text-field>
      <pre>{{ courier }}</pre>
      <v-radio-group v-model="courier" :disabled="noHp.length < 12">
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
          :disabled="!courierItems"
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
      isValid: false,
      provinsi: {},
      kotaKabupaten: {},
      kecamatan: {},
      kelurahan: {},
      alamat: '',
      courier: '',
      courierItems: ['jne', 'tiki', 'pos'],
      noHp: '',
    }
  },
  computed: {
    courierService: {
      get() {
        return this.$store.getters['order/getCourierService']
      },
      set(value) {
        this.$store.dispatch('order/saveCourierService', value)
      },
    },
    tujuan() {
      return this.$store.getters['order/getTujuan']
    },
  },
  watch: {
    provinsi() {
      this.$store.dispatch('order/fetchWilayah', {
        type: 'city',
        param: 'province',
        id: this.provinsi.province_id,
      })
      this.$store.dispatch('order/deleteCourierService')
    },
    courier() {
      this.fetchOngkir()
    },
    kotaKabupaten() {
      this.fetchOngkir()
    },
  },
  mounted() {
    this.$store.dispatch('order/deleteTujuan')
    this.$store.dispatch('order/fetchWilayah', { type: 'province' })
  },
  methods: {
    fetchOngkir() {
      if (this.kotaKabupaten.city_id && this.courier) {
        this.$store.dispatch('order/fetchOngkir', {
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
        this.$store.dispatch('order/deleteCourierService')
      }
    },
  },
}
</script>
