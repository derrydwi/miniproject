<template>
  <BaseLoading v-if="$apollo.loading" />
  <v-container v-else>
    <h2 class="mt-2 mb-7 text-center">Cart</h2>
    <v-row v-if="cart.length" dense>
      <v-col cols="12" sm="8" md="6" class="mx-auto mb-2">
        <v-form
          ref="form"
          v-model="isValid"
          @submit.prevent="isValid && $router.push({ name: 'checkout' })"
        >
          <template v-for="cartItem in cart">
            <v-fade-transition :key="cartItem.id">
              <CartItem :cart-item="cartItem" />
            </v-fade-transition>
          </template>
          <v-btn
            v-if="cart.length"
            color="grey"
            class="mt-6"
            outlined
            @click="deleteCart"
            ><v-icon class="mr-2">mdi-close</v-icon>Clear All</v-btn
          >
        </v-form>
      </v-col>
      <v-col cols="12" md="4" class="mx-auto">
        <CartSummary
          :total-price="totalPrice"
          :total-item="totalItem"
          :is-valid="isValid"
        />
      </v-col>
    </v-row>
    <v-row v-else dense>
      <v-col cols="12" md="6" class="mx-auto mt-4">
        <v-alert type="info" color="accent" text>Cart is empty</v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getCart, subscriptionCart, deleteCart } from '~/graphql/cart/queries'

export default {
  name: 'CartPage',
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
  data() {
    return {
      isValid: false,
    }
  },
  head: {
    title: 'Cart',
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
    totalItem() {
      const itemQuantity = this.cart.map((item) => item.quantity)
      const totalItem = itemQuantity.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        0
      )
      return totalItem
    },
  },
  methods: {
    deleteCart() {
      this.$apollo
        .mutate({
          mutation: deleteCart,
        })
        .then(() => {
          this.$showAlert({ text: 'Cart Deleted', icon: 'success' })
        })
        .catch((error) => {
          this.$showAlert({
            text: `Can't delete cart. ${error.message}`,
            icon: 'error',
          })
        })
    },
  },
}
</script>
