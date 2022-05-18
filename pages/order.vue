<template>
  <v-container style="min-height: 90vh">
    <v-row dense>
      <v-col cols="12" md="9" class="mx-auto">
        <h2 class="mt-2 mb-7 text-center">Order</h2>
        <v-row class="my-3">
          <template v-for="orderItem in order">
            <v-fade-transition :key="orderItem.id">
              <OrderItem :order-item="orderItem" />
            </v-fade-transition>
          </template>
        </v-row>
      </v-col>
    </v-row>
    <BaseLoading v-if="$apollo.queries.order.loading" />
    <v-card
      v-intersect="onIntersect"
      height="50"
      color="transparent"
      elevation="0"
    />
  </v-container>
</template>

<script>
import { getOrder, subscriptionOrder } from '~/graphql/order/queries'

const limit = 5

export default {
  name: 'OrderPage',
  middleware: 'auth',
  apollo: {
    order: {
      query: getOrder,
      variables() {
        return {
          limit,
          offset: 0,
        }
      },
      subscribeToMore: {
        document: subscriptionOrder,
        variables() {
          return {
            limit,
            offset: 0,
          }
        },
        updateQuery: (_, { subscriptionData }) => {
          return { order: subscriptionData.data.order }
        },
      },
    },
  },
  head: {
    title: 'Order',
  },
  computed: {
    page: {
      get() {
        return this.$store.getters['order/getPage']
      },
      set(value) {
        this.$store.dispatch('order/savePage', value)
      },
    },
    hasMore: {
      get() {
        return this.$store.getters['order/getHasMore']
      },
      set(value) {
        this.$store.dispatch('order/saveHasMore', value)
      },
    },
  },
  methods: {
    fetchMore() {
      this.page++
      this.$apollo.queries.order.fetchMore({
        variables: {
          limit,
          offset: this.page * limit,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (fetchMoreResult.order.length < limit) this.hasMore = false
          return {
            order: [...previousResult.order, ...fetchMoreResult.order],
          }
        },
        error() {
          this.$apollo.queries.order.refetch()
        },
      })
    },
    onIntersect(entries, observer, isIntersecting) {
      if (isIntersecting && this.hasMore) this.fetchMore()
    },
  },
}
</script>
