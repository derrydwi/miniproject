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
          <v-btn v-if="cart.length" :to="{ name: 'checkout' }" color="teal" text
            >Checkout</v-btn
          >
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
    $subscribe: {
      cart: {
        query: subscriptionCart,
        result({ data }) {
          this.cart = data.cart
        },
      },
    },
  },
}
</script>