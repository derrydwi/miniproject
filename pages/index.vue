<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <div
          v-if="$auth.loggedIn"
          :style="[$apollo.loading && { 'min-height': '90vh' }]"
        >
          <div v-if="$apollo.loading">Loading...</div>
          <v-btn @click="$auth.logout()">Logout</v-btn>
          <v-btn :to="{ name: 'cart' }">Cart</v-btn>
          <v-btn :to="{ name: 'order' }">Order</v-btn>
          <v-btn :to="{ name: 'profile' }">Profile</v-btn>
        </div>
        <div v-else :style="[$apollo.loading && { 'min-height': '90vh' }]">
          <v-btn
            @click="$auth.loginWith('auth0', { params: { prompt: 'login' } })"
            >Login</v-btn
          >
        </div>
        <div>PRODUCT</div>
        <v-card
          v-for="productItem in product"
          :key="productItem.id"
          class="mx-auto my-4 el"
          max-width="300"
          @click="
            $router.push({
              name: 'product-id',
              params: {
                id: productItem.id,
              },
            })
          "
        >
          <v-img contain width="800" height="200" :src="productItem.image_url">
            <template #placeholder>
              <v-skeleton-loader
                class="mx-auto"
                type="image@2"
              ></v-skeleton-loader>
            </template>
          </v-img>
          <v-card-text class="text--primary">
            <p class="text-h5 text--primary">{{ productItem.name }}</p>
            <div>{{ productItem.description.substring(0, 35) + '...' }}</div>
            <div>Category: {{ productItem.category }}</div>
            <div>
              {{ $formatMoney(productItem.price) }}
            </div>
            <div>Stock: {{ productItem.stock }}</div>
            <div>
              Rating: {{ productItem.reviews_aggregate.aggregate.avg.rating }}
            </div>
            <div>
              Total Review:
              {{ productItem.reviews_aggregate.aggregate.count }}
            </div>
          </v-card-text>
        </v-card>
        <div v-if="$apollo.queries.product.loading">
          Loading more product...
        </div>
        <v-card v-intersect="onIntersect" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { getProduct } from '~/graphql/product/queries'

const pageSize = 10

export default {
  name: 'ProductPage',
  apollo: {
    product: {
      prefetch: true,
      query: getProduct,
      variables() {
        return {
          limit: pageSize,
          offset: 0,
        }
      },
    },
  },
  computed: {
    page: {
      get() {
        return this.$store.getters['product/getPage']
      },
      set(value) {
        this.$store.dispatch('product/savePage', value)
      },
    },
    hasMore: {
      get() {
        return this.$store.getters['product/getHasMore']
      },
      set(value) {
        this.$store.dispatch('product/saveHasMore', value)
      },
    },
  },
  methods: {
    fetchMore() {
      this.page++
      this.$apollo.queries.product.fetchMore({
        variables: {
          limit: pageSize,
          offset: this.page * pageSize,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (fetchMoreResult.product.length < pageSize) this.hasMore = false
          return {
            product: [...previousResult.product, ...fetchMoreResult.product],
          }
        },
      })
    },
    onIntersect(entries, observer, isIntersecting) {
      if (isIntersecting && this.hasMore) this.fetchMore()
    },
  },
}
</script>