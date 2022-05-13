<template>
  <div>
    <v-card class="mx-auto my-4 el" max-width="300">
      <div class="px-4 py-4">
        <v-img
          contain
          max-width="800"
          max-height="200"
          :src="savedItem.product.image_url"
        />
      </div>
      <v-card-text class="text--primary">
        <div class="d-flex justify-space-between">
          <span class="text-h5 text--primary">{{
            savedItem.product.name
          }}</span>
          <v-btn color="primary" icon @click="deleteItem"
            ><v-icon>mdi-bookmark</v-icon></v-btn
          >
        </div>
        <div>{{ savedItem.product.description.substring(0, 35) + '...' }}</div>
        <div>Category: {{ savedItem.product.category }}</div>
        <div>
          {{ $formatMoney(savedItem.product.price) }}
        </div>
        <div>Stock: {{ savedItem.product.stock }}</div>
        <div>
          Rating: {{ savedItem.product.reviews_aggregate.aggregate.avg.rating }}
        </div>
      </v-card-text>
    </v-card>
  </div>
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
