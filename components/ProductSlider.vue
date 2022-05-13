<template>
  <div>
    <BaseLoading v-if="$apollo.loading" />
    <h2
      class="ms-8 mb-md-12 mb-4 text-capitalize font-weight-regular"
      v-text="category"
    />
    <v-slide-group :show-arrows="$vuetify.breakpoint.mdAndUp" class="mb-16">
      <v-slide-item v-for="productItem in product" :key="productItem.id">
        <v-card
          :to="{ name: 'product-id', params: { id: productItem.id } }"
          width="300"
          class="el ma-2 mb-md-5 mr-5"
        >
          <v-img :src="productItem.image_url" height="250" contain>
            <template #placeholder>
              <v-skeleton-loader
                class="mx-auto"
                type="image@2"
              ></v-skeleton-loader>
            </template>
          </v-img>
          <v-card-title class="text-md-body-1 mb-2">{{
            productItem.name.length > 30
              ? productItem.name.substring(0, 30) + '...'
              : productItem.name
          }}</v-card-title>
          <v-card-subtitle
            class="accent--text pb-3 font-weight-bold"
            v-text="$currency(productItem.price)"
          />
          <v-card-text>
            <div class="d-flex">
              <v-rating
                color="warning"
                background-color="grey lighten-1"
                class="mr-1"
                length="1"
                readonly
                dense
                size="20"
                :value="1"
              ></v-rating>
              <span
                >{{
                  $rating(productItem.reviews_aggregate.aggregate.avg.rating)
                }}
                | Sold
                {{ productItem.order_items_aggregate.aggregate.count }}</span
              >
            </div>
          </v-card-text>
        </v-card>
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
