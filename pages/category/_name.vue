<template>
  <BaseLoading v-if="$apollo.loading" />
  <v-container v-else>
    <v-row dense>
      <v-col cols="12" md="9" class="mx-auto">
        <h2
          class="my-2 text-capitalize text-center"
          v-text="$route.params.name"
        />
        <v-row class="my-3">
          <template v-for="productItem in product">
            <v-fade-transition :key="productItem.id">
              <CategoryItem :product-item="productItem" />
            </v-fade-transition>
          </template>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getAllProduct, getProductByCategory } from '~/graphql/product/queries'

export default {
  name: 'CategoryPage',
  apollo: {
    product: {
      query() {
        return this.$route.params.name ? getProductByCategory : getAllProduct
      },
      variables() {
        return (
          this.$route.params.name && { _ilike: `%${this.$route.params.name}%` }
        )
      },
    },
  },
  head() {
    return { title: this.$capitalize(this.$route.params.name) }
  },
}
</script>
