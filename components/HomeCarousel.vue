<template>
  <v-carousel
    cycle
    hide-delimiters
    height="90vh"
    class="mb-4"
    :show-arrows="$vuetify.breakpoint.mdAndUp"
  >
    <template #prev="{ attrs, on }">
      <v-btn v-bind="attrs" color="transparent" fab depressed v-on="on">
        <v-icon size="20">mdi-arrow-left</v-icon>
      </v-btn>
    </template>
    <template #next="{ attrs, on }">
      <v-btn v-bind="attrs" color="transparent" fab depressed v-on="on">
        <v-icon size="20">mdi-arrow-right</v-icon>
      </v-btn>
    </template>
    <v-carousel-item v-for="productItem in latestProduct" :key="productItem.id">
      <v-container :class="$vuetify.breakpoint.mdAndUp && 'fill-height'">
        <v-row dense align="center">
          <v-col cols="12" md="7" class="order-1 order-md-0">
            <v-card
              class="pa-md-10 pa-5 rounded-lg"
              elevation="0"
              color="transparent"
            >
              <h2 class="text-md-h3 text-h5" v-text="productItem.name" />
              <p
                class="text-md-h5 text-subtitle-1 accent--text mt-5"
                v-text="$currency(productItem.price)"
              />
              <p class="text-md-body-2 mb-7" style="line-height: 1.8">
                {{ productItem.description.substring(0, 140) + '...' }}
              </p>
              <v-btn
                depressed
                nuxt
                :to="{ name: 'product-id', params: { id: productItem.id } }"
                color="primary"
                class="text-capitalize"
                min-height="40"
                >Check It Out</v-btn
              >
            </v-card>
          </v-col>
          <v-col cols="12" md="5">
            <v-img :src="productItem.image_url" class="mx-md-8 my-md-0 my-10">
              <template #placeholder>
                <v-skeleton-loader
                  class="mx-auto"
                  type="image@2"
                ></v-skeleton-loader>
              </template>
            </v-img>
          </v-col>
        </v-row>
      </v-container>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import { getLatestProduct } from '~/graphql/product/queries'

const limit = 5

export default {
  apollo: {
    latestProduct: {
      query: getLatestProduct,
      variables() {
        return { limit }
      },
      error() {
        this.$apollo.queries.latestProduct.refetch()
      },
    },
  },
}
</script>
