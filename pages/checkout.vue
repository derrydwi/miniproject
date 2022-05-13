<template>
  <BaseLoading v-if="$apollo.loading" />
  <v-container v-else>
    <h2 class="mt-2 mb-7 text-center">Checkout</h2>
    <v-row v-if="cart.length" dense>
      <v-col cols="12" sm="8" md="6" class="mx-auto mb-2">
        <template v-for="(orderItem, index) in cart">
          <v-fade-transition :key="orderItem.id">
            <CheckoutItem :index="index" :order-item="orderItem" />
          </v-fade-transition>
        </template>
        <CheckoutShippingDetail :total-weight="totalWeight" />
      </v-col>
      <v-col cols="12" md="4" class="mx-auto">
        <CheckoutSummary
          :total-price="totalPrice"
          :total-item="totalItem"
          :total-weight="totalWeight"
          @make-order="makeOrder"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { getCart, subscriptionCart } from '~/graphql/cart/queries'
import { insertOrder } from '~/graphql/order/queries'
import { insertOrderItem } from '~/graphql/orderItem/queries'

export default {
  name: 'CheckoutPage',
  middleware: 'auth',
  apollo: {
    cart: {
      query: getCart,
      subscribeToMore: {
        document: subscriptionCart,
        updateQuery: (_, { subscriptionData }) => {
          return { cart: subscriptionData.data.cart }
        },
      },
    },
  },
  computed: {
    ...mapGetters('checkout', {
      alamat: 'getAlamat',
      kotaKabupaten: 'getKotaKabupaten',
      provinsi: 'getProvinsi',
      noHp: 'getNoHp',
      courierService: 'getCourierService',
    }),
    totalPrice() {
      const pricePerItem = this.cart.map(
        (item) => item.product.price * item.quantity
      )
      const totalPrice = pricePerItem.reduce(
        (prev, current) => prev + current,
        0
      )
      return totalPrice + this.courierService.price
    },
    totalItem() {
      const itemQuantity = this.cart.map((item) => item.quantity)
      const totalItem = itemQuantity.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        0
      )
      return totalItem
    },
    totalWeight() {
      const weightPerItem = this.cart.map(
        (item) => item.product.weight * item.quantity
      )
      const totalWeight = weightPerItem.reduce(
        (prev, current) => prev + current,
        0
      )
      return totalWeight
    },
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
            alamat: `${this.alamat}, ${this.kotaKabupaten.type} ${this.kotaKabupaten.city_name}, ${this.provinsi.province}`,
            no_hp: this.noHp,
            shipping_price: this.courierService.price,
            total_price: this.totalPrice,
            status: 'PENDING',
            response_midtrans: null,
          },
        })
        .then((result) => {
          this.makeOrderItem(result.data.insert_order_one.id)
          this.makePaymentToken(result.data.insert_order_one.id)
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
          this.$store.dispatch('checkout/deleteShippingDetail')
        })
        .catch((error) => {
          this.$showAlert({
            text: `Order Failed. ${error.message}`,
            icon: 'error',
          })
        })
    },
    makePaymentToken(orderId) {
      const item = this.cart.map((item) => ({
        id: item.product.id,
        price: item.product.price,
        quantity: item.quantity,
        name: item.product.name,
      }))
      const ongkir = {
        id: 1,
        price: this.courierService.price,
        quantity: 1,
        name: 'Shipping Service',
      }
      const body = {
        transaction_details: {
          order_id: orderId,
          gross_amount: this.totalPrice,
        },
        item_details: [...item, ongkir],
        credit_card: {
          secure: true,
        },
        customer_details: {
          first_name: this.$auth.user.nickname,
          email: this.$auth.user.email,
          phone: this.noHp,
          shipping_address: {
            first_name: this.$auth.user.nickname,
            email: this.$auth.user.email,
            phone: this.noHp,
            address: `${this.alamat}, ${this.kotaKabupaten.type} ${this.kotaKabupaten.city_name}, ${this.provinsi.province}`,
          },
        },
      }
      this.$axios.post('/api/pay', body).catch((error) => {
        alert(`Can't make payment. ${error.message}`)
      })
    },
  },
}
</script>