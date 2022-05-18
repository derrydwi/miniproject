<template>
  <v-col cols="12" md="4">
    <v-card
      :to="{ name: 'product-id', params: { id: productItem.id } }"
      class="el"
    >
      <v-img :src="productItem.image_url" height="200" contain>
        <template #placeholder>
          <v-skeleton-loader class="mx-auto" type="image@2"></v-skeleton-loader>
        </template>
      </v-img>
      <v-card-title class="text-md-body-1 font-weight-bold mb-2">{{
        productItem.name.length > 25
          ? productItem.name.substring(0, 25) + '...'
          : productItem.name
      }}</v-card-title>
      <v-card-subtitle
        class="accent--text pb-3 font-weight-bold"
        v-text="$currency(productItem.price)"
      />
      <v-card-text>
        <v-chip
          outlined
          label
          small
          class="ms-n1 mb-3"
          v-text="productItem.category"
        />
        <div v-if="ratingProduct.value" class="d-flex mb-3">
          <v-rating
            color="warning"
            background-color="grey lighten-1"
            class="ms-n1 me-1"
            length="1"
            readonly
            dense
            size="20"
            :value="1"
          ></v-rating>
          <span
            >{{ $rating(ratingProduct.value) }} ({{
              ratingProduct.count
            }}
            Review)</span
          >
        </div>
        <p v-else class="mb-3">No review yet</p>
        <div class="d-flex mb-2">
          <span>Stock {{ productItem.stock }}</span>
          <v-divider vertical class="mx-2" />
          <span v-if="sold">Sold {{ sold }}</span>
          <span v-else>Not sold yet</span>
        </div>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: 'SearchItem',
  props: {
    productItem: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  computed: {
    ratingProduct() {
      return {
        value: this.productItem.reviews_aggregate.aggregate.avg.rating,
        count: this.productItem.reviews_aggregate.aggregate.count,
      }
    },
    sold() {
      return this.productItem.order_items_aggregate.aggregate.count
    },
  },
}
</script>
