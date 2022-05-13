<template>
  <div>
    <p>detail product</p>
    <div v-if="$apollo.loading">Loading...</div>
    <div v-else>
      <pre>{{ productDetail }}</pre>
      <pre>{{ cart }}</pre>
      <v-btn color="teal" text @click="test">Add To Cart</v-btn>
    </div>
  </div>
</template>

<script>
import {
  getProductDetail,
  getCart,
  insertToCart,
  updateToCart,
  subscriptionCart,
} from '~/graphql/queries'

export default {
  name: 'DetailProductPage',
  apollo: {
    productDetail: {
      query: getProductDetail,
      variables() {
        return { _eq: this.$route.params.id }
      },
    },
    cart: {
      query: getCart,
    },
  },
  mounted() {
    // this.$store.dispatch('cart/fetchCart')
    // eslint-disable-next-line no-console
    // console.log('ngefetch cart')
    // eslint-disable-next-line no-console
    // console.log('data cart terisi', this.$store.state.cart.cart)
    // this.itemInCart.find((x) => x.product.id === this.$route.params.id)
    // eslint-disable-next-line no-console
    // console.log(
    //   'pencarian item sama',
    //   this.itemInCart.find((x) => x.product.id === this.$route.params.id)
    // )
    // eslint-disable-next-line no-console
    // console.log('cart apollo', this.cart)
    this.subs()
  },
  methods: {
    test() {
      const isSameItem = this.cart.find(
        (x) => x.product.id === parseInt(this.$route.params.id)
      )
      if (isSameItem) {
        this.$apollo
          .mutate({
            mutation: updateToCart,
            variables: {
              id: isSameItem.id,
              quantity: isSameItem.quantity + 1,
            },
          })
          .then((result) => {
            // eslint-disable-next-line no-console
            console.log('resulta updatea', result)
            // this.$apollo.queries.cart.refetch()
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log('errora updatea', error)
          })
      } else {
        this.$apollo
          .mutate({
            mutation: insertToCart,
            variables: {
              product_id: this.$route.params.id,
              quantity: 1,
            },
          })
          .then((result) => {
            // eslint-disable-next-line no-console
            console.log('resulta inserta', result)
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log('errora inserta', error)
          })
      }
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