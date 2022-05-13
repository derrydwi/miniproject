<template>
  <v-col cols="12" md="6">
    <v-card
      class="el"
      :to="{ name: 'product-id', params: { id: savedItem.product.id } }"
    >
      <v-img :src="savedItem.product.image_url" height="200" contain>
        <template #placeholder>
          <v-skeleton-loader class="mx-auto" type="image@2"></v-skeleton-loader>
        </template>
      </v-img>
      <v-card-title class="text-md-body-1 justify-space-between">
        <span
          :to="{ name: 'product-id', params: { id: savedItem.product.id } }"
          >{{ savedItem.product.name }}</span
        >
        <v-card-actions>
          <v-btn color="primary" icon v-on="on" @click.prevent="deleteItem"
            ><v-icon>mdi-bookmark</v-icon></v-btn
          >
        </v-card-actions>
      </v-card-title>
      <v-card-subtitle class="accent--text pb-3 font-weight-bold">
        {{ $formatMoney(savedItem.product.price) }}
      </v-card-subtitle>
      <v-card-text>
        <div class="d-flex mb-3">
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
            >{{ savedItem.product.reviews_aggregate.aggregate.avg.rating }} ({{
              savedItem.product.reviews_aggregate.aggregate.count
            }}
            Review)</span
          >
        </div>
        <div>
          Sold
          {{ savedItem.product.order_items_aggregate.aggregate.count }}
        </div>
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
