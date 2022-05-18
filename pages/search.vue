<template>
  <BaseLoading v-if="$apollo.loading" />
  <v-container v-else>
    <v-row dense>
      <v-col md="9" class="mx-auto">
        <h1 class="my-2 text-center">Result of "{{ $route.query.q }}"</h1>
        <v-row v-if="product.length" class="my-3">
          <template v-for="productItem in product">
            <v-fade-transition :key="productItem.id">
              <SearchItem :product-item="productItem" />
            </v-fade-transition>
          </template>
        </v-row>
        <v-row v-else dense>
          <v-col cols="12" md="6" class="mx-auto mt-4">
            <v-alert type="info" color="accent" text>Product not found</v-alert>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getProductByName } from '~/graphql/product/queries'

export default {
  name: 'SearchPage',
  apollo: {
    product: {
      query: getProductByName,
      variables() {
        return { _ilike: `%${this.$route.query.q}%` }
      },
    },
  },
  head() {
    return { title: this.$route.query.q }
  },
}
</script>
