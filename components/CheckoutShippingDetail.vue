<template>
  <v-card class="pa-6 mt-8 mx-auto" width="600" outlined>
    <p class="text-md-body-1 font-weight-bold mt-1 mb-8">Shipping Detail</p>
    <v-form
      ref="form"
      v-model="isValid"
      @submit.prevent="isValid && $router.push({ name: 'checkout' })"
    >
      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="6" class="ps-0">
            <v-text-field
              v-model="name"
              label="Name"
              outlined
              :rules="rules.nameRules"
              color="accent"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" class="pe-0">
            <v-text-field
              v-model="phoneNumber"
              class="input-no-hp"
              label="Phone Number"
              outlined
              :counter="13"
              :rules="[rules.phoneNumberRules]"
              :disabled="!name"
              color="accent"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-autocomplete
        v-model="province"
        :items="tujuan.province"
        item-value="province_id"
        item-text="province"
        return-object
        :rules="rules.provinceRules"
        :disabled="
          phoneNumber.length < 12 ||
          phoneNumber.length > 13 ||
          !tujuan.province.length
        "
        label="Province"
        outlined
        color="accent"
      ></v-autocomplete>
      <v-autocomplete
        v-model="city"
        :items="tujuan.city"
        item-value="city_id"
        item-text="city_name"
        return-object
        :rules="rules.cityRules"
        :disabled="!tujuan.city.length"
        label="City"
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
        v-model="address"
        label="Address"
        outlined
        :rules="rules.addressRules"
        :disabled="!city.city_name"
        color="accent"
      ></v-textarea>
      <v-radio-group
        v-model="courier"
        :rules="rules.courierRules"
        :disabled="!address"
        class="mt-0"
      >
        <p>Select Courier</p>
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
          :rules="rules.courierServiceRules"
        >
          <p>Select Service</p>
          <v-radio
            v-for="(ongkirItem, index) in tujuan.ongkir"
            :key="index"
            :label="`${ongkirItem.service} | ${$currency(
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
import formMixins from '~/mixins/formMixins'

export default {
  name: 'CheckoutShippingDetail',
  mixins: [formMixins],
  props: {
    totalWeight: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      courierItems: ['jne', 'tiki', 'pos'],
    }
  },
  computed: {
    tujuan() {
      return this.$store.getters['checkout/getTujuan']
    },
    name: {
      get() {
        return this.$store.getters['checkout/getName']
      },
      set(value) {
        this.$store.dispatch('checkout/saveName', value)
      },
    },
    phoneNumber: {
      get() {
        return this.$store.getters['checkout/getPhoneNumber']
      },
      set(value) {
        this.$store.dispatch('checkout/savePhoneNumber', value)
      },
    },
    province: {
      get() {
        return this.$store.getters['checkout/getProvince']
      },
      set(value) {
        this.$store.dispatch('checkout/saveProvince', value)
      },
    },
    city: {
      get() {
        return this.$store.getters['checkout/getCity']
      },
      set(value) {
        this.$store.dispatch('checkout/saveCity', value)
      },
    },
    address: {
      get() {
        return this.$store.getters['checkout/getAddress']
      },
      set(value) {
        this.$store.dispatch('checkout/saveAddress', value)
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
    province() {
      this.fetchWilayah()
    },
    courier() {
      this.fetchOngkir()
    },
  },
  created() {
    this.$store.dispatch('checkout/deleteAllShippingDetail')
  },
  mounted() {
    this.$store.dispatch('checkout/fetchWilayah', { type: 'province' })
  },
  methods: {
    fetchWilayah() {
      if (!this.province.province_id) return
      this.$store.dispatch('checkout/fetchWilayah', {
        type: 'city',
        param: 'province',
        id: this.province.province_id,
      })
    },
    fetchOngkir() {
      if (!this.city.city_id && !this.courier) return
      this.$store.dispatch('checkout/fetchOngkir', {
        origin: 152,
        destination: this.city.city_id,
        weight: this.totalWeight,
        courier: this.courier,
      })
    },
  },
}
</script>
