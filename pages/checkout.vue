<template>
  <BaseLoading v-if="$apollo.loading" />
  <v-container v-else>
    <h2 class="mt-2 mb-7 text-center">Checkout</h2>
    <v-row v-if="cart.length" dense>
      <v-col cols="12" sm="8" md="6" class="mx-auto mb-2">
        <template v-for="orderItem in cart">
          <v-fade-transition :key="orderItem.id">
            <CheckoutItem :order-item="orderItem" />
          </v-fade-transition>
        </template>
        <CheckoutShippingDetail :total-weight="totalWeight" />
      </v-col>
      <v-col cols="12" md="4" class="mx-auto">
        <CheckoutSummary
          :total-price="totalPrice"
          :total-bill="totalBill"
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
import { getCart } from '~/graphql/cart/queries'
import { insertOrder } from '~/graphql/order/queries'
import { insertOrderItem } from '~/graphql/orderItem/queries'

export default {
  name: 'CheckoutPage',
  middleware: 'auth',
  apollo: {
    cart: {
      query: getCart,
    },
  },
  head: {
    title: 'Checkout',
  },
  computed: {
    ...mapGetters('checkout', {
      address: 'getAddress',
      city: 'getCity',
      province: 'getProvince',
      name: 'getName',
      phoneNumber: 'getPhoneNumber',
      courierService: 'getCourierService',
    }),
    totalBill() {
      return this.$totalBill(this.cart, this.courierService.price)
    },
    totalPrice() {
      return this.$totalPrice(this.cart)
    },
    totalItem() {
      return this.$totalItem(this.cart)
    },
    totalWeight() {
      return this.$totalWeight(this.cart)
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
            nama: this.name,
            no_hp: this.phoneNumber,
            alamat: `${this.address}, ${this.city.type} ${this.city.city_name}, ${this.province.province}`,
            shipping_price: this.courierService.price,
            total_price: this.totalBill,
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
      const cartId = this.cart.map((item) => item.id)
      this.$apollo
        .mutate({
          mutation: insertOrderItem,
          variables: {
            objectsOrder: orderItem,
            objectsProduct: newStock,
            _in: cartId,
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
          gross_amount: this.totalBill,
        },
        item_details: [...item, ongkir],
        credit_card: {
          secure: true,
        },
        customer_details: {
          first_name: this.name,
          email: this.$auth.user.email,
          phone: this.phoneNumber,
          shipping_address: {
            first_name: this.name,
            email: this.$auth.user.email,
            phone: this.phoneNumber,
            address: `${this.address}, ${this.city.type} ${this.city.city_name}, ${this.province.province}`,
          },
        },
      }
      this.$axios.post('/api/payment/pay', body).catch((error) => {
        alert(`Can't make payment. ${error.message}`)
      })
    },
  },
}
</script>
