<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <div v-if="$apollo.loading">Loading...</div>
        <div v-else>
          <div>
            <p>Checkout</p>
            {{ provinsi }}
            <OrderItem
              v-for="(orderItem, index) in cart"
              :key="orderItem.id"
              :index="index"
              :order-item="orderItem"
            />
            <v-select
              v-model="provinsi"
              :items="tujuan.provinsi"
              item-value="id"
              item-text="nama"
              return-object
              label="Provinsi"
              outlined
              color="teal"
            ></v-select>
            <v-select
              v-model="kotaKabupaten"
              :items="tujuan.kota"
              item-value="id"
              item-text="nama"
              return-object
              label="Kota / Kabupaten"
              outlined
              color="teal"
            ></v-select>
            <v-select
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
            ></v-text-field>
            <v-text-field
              v-model="noHp"
              class="input-no-hp"
              type="number"
              label="No. Hp"
              outlined
              color="teal"
            ></v-text-field>
            <div>
              Total Price:
              {{
                totalPrice
                  .toLocaleString('id-id', {
                    style: 'currency',
                    currency: 'IDR',
                  })
                  .slice(0, -3)
              }}
            </div>
            <v-btn color="teal" text @click="checkout">Checkout</v-btn>
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
  },
  data() {
    return {
      provinsi: {},
      kotaKabupaten: {},
      kecamatan: {},
      kelurahan: {},
      alamat: '',
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
      return total
    },
    tujuan() {
      return this.$store.getters['order/getTujuan']
    },
  },
  watch: {
    provinsi(value) {
      this.$store.dispatch('order/fetchWilayah', {
        type: 'kota',
        response: 'kota_kabupaten',
        param: 'id_provinsi',
        id: value.id,
      })
    },
    kotaKabupaten(value) {
      this.$store.dispatch('order/fetchWilayah', {
        type: 'kecamatan',
        param: 'id_kota',
        id: value.id,
      })
    },
    kecamatan(value) {
      this.$store.dispatch('order/fetchWilayah', {
        type: 'kelurahan',
        param: 'id_kecamatan',
        id: value.id,
      })
    },
  },
  mounted() {
    this.subs()
    this.$store.dispatch('order/deleteTujuan')
    this.$store.dispatch('order/fetchWilayah', { type: 'provinsi' })
  },
  methods: {
    checkout() {
      this.$apollo
        .mutate({
          mutation: insertOrder,
          variables: {
            alamat: `${this.alamat}, ${this.kelurahan.nama}, ${this.kecamatan.nama}, ${this.kotaKabupaten.nama}, ${this.provinsi.nama}`,
            no_hp: this.noHp,
            shipping_price: 35000,
            total_price: this.totalPrice + 35000,
          },
        })
        .then((result) => {
          // eslint-disable-next-line no-console
          console.log('result insert order', result)
          const orderItem = this.cart.map((item) => ({
            order_id: result.data.insert_order_one.id,
            quantity: item.quantity,
            product_id: item.product.id,
            price: item.product.price * item.quantity,
          }))
          this.$apollo
            .mutate({
              mutation: insertOrderItem,
              variables: {
                objects: orderItem,
              },
            })
            .then((result) => {
              // eslint-disable-next-line no-console
              console.log('result insert order item', result)
            })
            .catch((error) => {
              // eslint-disable-next-line no-console
              console.log('error', error)
            })
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log('error', error)
        })
    },
    subs() {
      if (this.tagsSub) {
        this.tagsSub.unsubscribe()
      }
      this.tagsSub = this.$apollo.queries.cart.subscribeToMore({
        document: subscriptionCart,
        updateQuery: (previousResult, { subscriptionData }) => {
          return { cart: subscriptionData.data.cart }
        },
      })
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