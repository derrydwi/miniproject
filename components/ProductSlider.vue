<template>
  <div>
    <h2
      class="ms-8 mb-md-12 mb-4 text-capitalize font-weight-regular"
      v-text="category"
    />
    <v-slide-group :show-arrows="$vuetify.breakpoint.mdAndUp" class="mb-16">
      <v-slide-item v-for="productItem in product" :key="productItem.id">
        <ProductSliderItem :product-item="productItem" />
      </v-slide-item>
    </v-slide-group>
  </div>
</template>

<script>
import { getProductByCategory } from '~/graphql/product/queries'

export default {
  props: {
    category: {
      type: String,
      default: '',
    },
  },
  apollo: {
    product: {
      query: getProductByCategory,
      variables() {
        return { _ilike: `%${this.category}%` }
      },
      error() {
        this.$apollo.queries.product.refetch()
      },
    },
  },
}
</script>
