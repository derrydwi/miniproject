<template>
  <v-col cols="12" md="6">
    <v-card
      class="el"
      :to="{ name: 'product-id', params: { id: savedItem.product.id } }"
    >
      <v-img
        :src="savedItem.product.image_url"
        :alt="savedItem.product.name"
        height="200"
        contain
      >
        <template #placeholder>
          <v-skeleton-loader class="mx-auto" type="image@2"></v-skeleton-loader>
        </template>
      </v-img>
      <v-card-title class="text-md-body-1 justify-space-between">
        <span
          :to="{ name: 'product-id', params: { id: savedItem.product.id } }"
          v-text="savedItem.product.name"
        />
        <v-card-actions class="me-n3">
          <v-btn color="accent" icon @click.prevent="deleteItem"
            ><v-icon>mdi-bookmark</v-icon></v-btn
          >
        </v-card-actions>
      </v-card-title>
      <v-card-subtitle
        class="accent--text pb-3 font-weight-bold"
        v-text="$currency(savedItem.product.price)"
      />
      <v-card-text>
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
        <p v-if="sold" class="mb-0">Sold {{ sold }}</p>
        <p v-else class="mb-0">Not sold yet</p>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import { deleteSaved } from '~/graphql/saved/queries'

export default {
  name: 'SavedItem',
  props: {
    savedItem: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  computed: {
    ratingProduct() {
      return {
        value: this.savedItem.product.reviews_aggregate.aggregate.avg.rating,
        count: this.savedItem.product.reviews_aggregate.aggregate.count,
      }
    },
    sold() {
      return this.savedItem.product.order_items_aggregate.aggregate.count
    },
  },
  methods: {
    deleteItem() {
      this.$apollo
        .mutate({
          mutation: deleteSaved,
          variables: {
            id: this.savedItem.id,
          },
        })
        .then(() => {
          this.$showAlert({ text: 'Saved Product Deleted', icon: 'success' })
        })
        .catch((error) => {
          this.$showAlert({
            text: `Can't delete saved product. ${error.message}`,
            icon: 'error',
          })
        })
    },
  },
}
</script>
