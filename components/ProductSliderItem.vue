<template>
  <v-card
    :to="{ name: 'product-id', params: { id: productItem.id } }"
    width="300"
    class="el ma-2 mb-md-5 mr-5"
  >
    <v-img
      :src="productItem.image_url"
      :alt="productItem.name"
      height="250"
      contain
    >
      <template #placeholder>
        <v-skeleton-loader class="mx-auto" type="image@2"></v-skeleton-loader>
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
      <div v-if="sold" class="d-flex">
        <div v-if="rating" class="d-flex">
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
          <span>{{ $rating(rating) }}</span>
          <v-divider vertical class="mx-2" />
        </div>
        <span>Sold {{ sold }}</span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ProductSliderItem',
  props: {
    productItem: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  computed: {
    rating() {
      return this.productItem.reviews_aggregate.aggregate.avg.rating
    },
    sold() {
      return this.productItem.order_items_aggregate.aggregate.count
    },
  },
}
</script>
