<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div v-if="$apollo.loading">Loading...</div>
      <div v-else>
        <div>
          <p>Cart</p>
          <CartItem
            v-for="(cartItem, index) in cart"
            :key="cartItem.id"
            :index="index"
            :cart-item="cartItem"
          />
          <v-btn :to="{ name: 'checkout' }" color="teal" text>Checkout</v-btn>
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
</template>

<script>
import { getCart, subscriptionCart } from '~/graphql/queries'

export default {
  name: 'CartPage',
  middleware: 'auth',
  apollo: {
    cart: {
      query: getCart,
    },
  },
  mounted() {
    this.subs()
  },
  methods: {
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