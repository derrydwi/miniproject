<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <div v-if="$apollo.loading">Loading...</div>
        <div v-else>
          <div>
            <p>Checkout</p>
            <OrderItem
              v-for="(orderItem, index) in cart"
              :key="orderItem.id"
              :index="index"
              :order-item="orderItem"
            />
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
                color="teal"
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
                color="teal"
              >
                <template slot="selection" slot-scope="data">
                  {{ data.item.type }} {{ data.item.city_name }}
                </template>
                <template slot="item" slot-scope="data">
                  {{ data.item.type }} {{ data.item.city_name }}
                </template></v-autocomplete
              >
              <!-- <v-select
              v-model="kecamatan"
              :items="tujuan.kecamatan"
              item-value="id"
              item-text="nama"
              return-object
              label="Kecamatan"
              outlined
              color="teal"
            ></v-select>
            <v-select
              v-model="kelurahan"
              :items="tujuan.kelurahan"
              item-value="id"
              item-text="nama"
              return-object
              label="Kelurahan"
              outlined
              color="teal"
            ></v-select>
            <v-text-field
              v-model="alamat"
              label="Alamat"
              outlined
              color="teal"
            ></v-text-field> -->
              <v-textarea
                v-model="alamat"
                label="Alamat"
                outlined
                :disabled="!kotaKabupaten.city_name"
                color="teal"
              ></v-textarea>
              <v-text-field
                v-model="noHp"
                class="input-no-hp"
                type="number"
                label="No. Hp"
                outlined
                :disabled="!alamat"
                :counter="13"
                color="teal"
              ></v-text-field>
              <v-radio-group v-model="courier" :disabled="noHp.length < 12">
                <p>Pilih Kurir</p>
                <v-radio
                  v-for="item in courierItems"
                  :key="item"
                  :label="item"
                  :value="item"
                  color="teal"
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
                    )} | ${ongkirItem.cost[0].etd} ${
                      courier !== 'pos' ? 'Day' : ''
                    }`"
                    :value="{
                      service: ongkirItem.service,
                      price: ongkirItem.cost[0].value,
                    }"
                    color="teal"
                  ></v-radio>
                </v-radio-group>
              </v-radio-group>
              <div>
                Total Price:
                {{ $formatMoney(totalPrice) }}
              </div>
              <div class="text-center">
                <v-btn
                  color="teal"
                  text
                  :disabled="!courierService.service"
                  @click="makeOrder"
                  >Checkout</v-btn
                >
              </div>
            </v-form>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {
  getCart,
  subscriptionCart,
  insertOrder,
  insertOrderItem,
} from '~/graphql/queries'

export default {
  name: 'CheckoutPage',
  middleware: 'auth',
  apollo: {
    cart: {
      query: getCart,
    },
    $subscribe: {
      cart: {
        query: subscriptionCart,
        result({ data }) {
          this.cart = data.cart
        },
      },
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
      courierService: {
        service: '',
        price: 0,
      },
      noHp: '',
    }
  },
  computed: {
    totalPrice() {
      const pricePerItem = this.cart.map(
        (item) => item.product.price * item.quantity
      )
      const total = pricePerItem.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        0
      )
      return total + this.courierService.price
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
    validateStock() {
      for (let index = 0; index < this.cart.length; index++) {
        if (this.cart[index].quantity > this.cart[index].product.stock) {
          alert(
            `Kuantitas tidak sesuai, silahkan ubah kuantitas produk ${this.cart[index].product.name} terlebih dahulu`
          )
          return false
        }
      }
      return true
    },
    makeOrder() {
      if (!this.validateStock()) return
      this.$apollo
        .mutate({
          mutation: insertOrder,
          variables: {
            alamat: `${this.alamat}, ${this.kotaKabupaten.city_name}, ${this.provinsi.province}`,
            no_hp: this.noHp,
            shipping_price: this.courierService.price,
            total_price: this.totalPrice,
          },
        })
        .then((result) => {
          this.makeOrderItem(result.data.insert_order_one.id)
        })
        .catch((error) => {
          this.$showAlert({
            text: `Order Failed. ${error.message}`,
            icon: 'error',
          })
        })
    },
    makeOrderItem(orderId) {
      const orderItem = this.cart.map((item) => ({
        order_id: orderId,
        quantity: item.quantity,
        product_id: item.product.id,
        price: item.product.price * item.quantity,
      }))
      const newStock = this.cart.map((item) => ({
        id: item.product.id,
        stock: item.product.stock - item.quantity,
      }))
      this.$apollo
        .mutate({
          mutation: insertOrderItem,
          variables: {
            objectsOrder: orderItem,
            objectsProduct: newStock,
          },
        })
        .then(() => {
          this.$showAlert({ text: 'Order Successful', icon: 'success' })
          this.$router.replace({ name: 'order' })
        })
        .catch((error) => {
          this.$showAlert({
            text: `Order Failed. ${error.message}`,
            icon: 'error',
          })
        })
    },
    fetchOngkir() {
      if (this.kotaKabupaten.city_id && this.courier) {
        this.$store.dispatch('order/fetchOngkir', {
          origin: 152,
          destination: this.kotaKabupaten.city_id,
          weight: 500,
          courier: this.courier,
        })
        this.courierService = {
          service: '',
          price: 0,
        }
      }
    },
  },
}
</script>

<style scoped>
.input-no-hp >>> input[type='number'] {
  -moz-appearance: textfield;
}
.input-no-hp >>> input::-webkit-outer-spin-button,
.input-no-hp >>> input::-webkit-inner-spin-button {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.centered-input >>> input {
  text-align: center;
}
</style>