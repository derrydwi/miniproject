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
            <v-btn color="teal" text @click="checkout">Order</v-btn>
            <!-- <v-card
              v-for="cartItem in cart"
              :key="cartItem.id"
              class="mx-auto my-4"
              max-width="300"
            >
              <div class="px-4 py-4">
                <v-img
                  contain
                  max-width="800"
                  max-height="200"
                  :src="cartItem.product.image_url"
                />
              </div>
              <v-card-text class="text--primary">
                <p class="text-h5 text--primary">{{ cartItem.product.name }}</p>
                <div>
                  {{
                    cartItem.product.price
                      .toLocaleString('id-id', {
                        style: 'currency',
                        currency: 'IDR',
                      })
                      .slice(0, -3)
                  }}
                  <div>Quantity: {{ cartItem.quantity }}</div>
                  <div>
                    Price:
                    {{
                      (cartItem.product.price * cartItem.quantity)
                        .toLocaleString('id-id', {
                          style: 'currency',
                          currency: 'IDR',
                        })
                        .slice(0, -3)
                    }}
                  </div>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn color="teal" text>Add To Cart</v-btn>
              </v-card-actions>
            </v-card> -->
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
  },
  mounted() {
    this.subs()
  },
  methods: {
    checkout() {
      this.$apollo
        .mutate({
          mutation: insertOrder,
          variables: {
            provinsi: 'Jawa Tengah',
            kota: 'Semarang',
            alamat: 'Jl. Soeta',
            no_hp: '081354787997',
            shipping_price: 20000,
            total_price: this.totalPrice + 20000,
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

<style>
</style>