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
    <!-- <template #placeholder>
      <v-row class="fill-height" justify="center" align="center">
        <v-progress-circular
          :size="150"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </v-row>
    </template> -->
    <v-carousel-item v-for="productItem in latestProduct" :key="productItem.id">
      <!-- <v-img height="100vh" :src="productItem.image_url" contain> -->
      <v-container :class="$vuetify.breakpoint.mdAndUp && 'fill-height'">
        <v-row dense align="center">
          <v-col cols="12" md="7" class="order-1 order-md-0">
            <!-- <div
              class="
                pa-md-10 pa-5
                rounded-lg
                black--text
                text-center text-md-left
              "
              style="background-color: rgba(255, 255, 255, 0.8)"
            > -->
            <v-card
              class="pa-md-10 pa-5 rounded-lg"
              elevation="0"
              color="transparent"
            >
              <h2 class="text-md-h3 text-h5">
                {{ productItem.name }}
              </h2>
              <p
                class="
                  text-md-h5 text-subtitle-1
                  deep-purple--text
                  text--lighten-1
                  mt-5
                "
              >
                {{ $formatMoney(productItem.price) }}
              </p>
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
export default {
  apollo: {
    latestProduct: {
      query: getLatestProduct,
      variables() {
        return { limit: 5 }
      },
      error() {
        this.$apollo.queries.product.refetch()
      },
    },
  },
}
</script>
