<template>
  <div>
    <p>detail product</p>
    <div v-if="$apollo.loading">Loading...</div>
    <div v-else>
      <pre>{{ productDetail }}</pre>
      Total rating:
      <v-rating
        color="teal"
        half-increments
        length="5"
        readonly
        :value="productDetail.reviews_aggregate.aggregate.avg.rating"
      ></v-rating>
      <div>
        Total Review: {{ productDetail.reviews_aggregate.aggregate.count }}
      </div>
      <div v-for="review in productDetail.reviews" :key="review.id">
        <div class="d-flex justify-start align-center">
          <v-rating
            color="teal"
            class="mr-4"
            half-increments
            length="5"
            readonly
            :value="review.rating"
          ></v-rating>
          <span>
            {{ getRelativeTime(+new Date(review.created_at)) }}
          </span>
        </div>
        <div class="d-flex justify-start align-center mb-4">
          <!-- <v-avatar color="teal" size="35" class="mr-2">{{
            review.user.username.substr(0, 2).toUpperCase()
          }}</v-avatar> -->
          <v-img
            :src="review.user.picture"
            max-width="30"
            class="rounded-circle mr-2"
          />
          <span>{{ review.user.username }}</span>
        </div>
        <p>{{ review.comment }}</p>
      </div>
      <pre>{{ cart }}</pre>
      <v-btn color="teal" text @click="addToCart">Add To Cart</v-btn>
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
        return { id: this.$route.params.id }
      },
    },
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
  methods: {
    getRelativeTime(d1, d2 = new Date()) {
      const units = {
        year: 24 * 60 * 60 * 1000 * 365,
        month: (24 * 60 * 60 * 1000 * 365) / 12,
        day: 24 * 60 * 60 * 1000,
        hour: 60 * 60 * 1000,
        minute: 60 * 1000,
        second: 1000,
      }
      const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
      const elapsed = d1 - d2
      for (const u in units) {
        if (Math.abs(elapsed) > units[u] || u === 'second') {
          return rtf.format(Math.round(elapsed / units[u]), u)
        }
      }
    },
    addToCart() {
      const isSameItem = this.cart.find(
        (x) => x.product.id === parseInt(this.$route.params.id)
      )
      this.$apollo
        .mutate({
          mutation: isSameItem ? updateToCart : insertToCart,
          variables: {
            ...(isSameItem && {
              id: isSameItem.id,
              quantity: isSameItem.quantity + 1,
            }),
            ...(!isSameItem && {
              product_id: this.$route.params.id,
              quantity: 1,
            }),
          },
        })
        .then((result) => {
          // eslint-disable-next-line no-console
          console.log('result', result)
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log('error', error)
        })
    },
  },
}
</script>