<template>
  <BaseLoading v-if="$apollo.loading" />
  <v-container v-else>
    <v-row dense>
      <v-col md="9" class="mx-auto">
        <h1 class="my-2 text-capitalize text-center">
          Result of "{{ $route.query.q }}"
        </h1>
        <v-row class="my-3">
          <template v-for="productItem in product">
            <v-fade-transition :key="productItem.id">
              <v-col cols="12" md="4">
                <v-card
                  :to="{ name: 'product-id', params: { id: productItem.id } }"
                  class="el"
                >
                  <v-img :src="productItem.image_url" height="200" contain>
                    <template #placeholder>
                      <v-skeleton-loader
                        class="mx-auto"
                        type="image@2"
                      ></v-skeleton-loader>
                    </template>
                  </v-img>
                  <v-card-title class="text-md-body-1 font-weight-bold mb-2">{{
                    productItem.name
                  }}</v-card-title>
                  <v-card-subtitle class="accent--text pb-3 font-weight-bold">
                    {{ $currency(productItem.price) }}
                  </v-card-subtitle>
                  <v-card-text>
                    <v-chip outlined label small class="ms-n1 mb-3">
                      {{ productItem.category }}
                    </v-chip>
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
                        >{{
                          $rating(
                            productItem.reviews_aggregate.aggregate.avg.rating
                          )
                        }}
                        ({{
                          productItem.reviews_aggregate.aggregate.count
                        }}
                        Review)</span
                      >
                    </div>
                    <div class="mb-3">
                      Stock
                      {{ productItem.stock }} | Sold
                      {{ productItem.order_items_aggregate.aggregate.count }}
                    </div>
                  </v-card-text>
                  <!-- <v-card-text>
                      <v-chip
                        v-for="(t, i) in productItemtags"
                        :key="`prod${productItemid}-${i}`"
                        x-small
                        label
                        outlined
                        class="mr-1"
                      >
                        {{ t }}
                      </v-chip>
                    </v-card-text> -->
                </v-card>
              </v-col>
            </v-fade-transition>
          </template>
        </v-row>
      </v-col>
    </v-row>
    <!-- <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <div>Result of "{{ $route.query.q }}"</div>
        <v-card
          v-for="productItem in product"
          :key="productItem.id"
          class="mx-auto my-4 el"
          max-width="300"
          :to="{
            name: 'product-id',
            params: {
              id: productItem.id,
            },
          }"
        >
          <v-img contain width="800" height="200" :src="productItem.image_url">
            <template #placeholder>
              <v-skeleton-loader
                class="mx-auto"
                type="image@2"
              ></v-skeleton-loader>
            </template>
          </v-img>
          <v-card-text class="text--primary">
            <p class="text-h5 text--primary">{{ productItem.name }}</p>
            <div>{{ productItem.description.substring(0, 35) + '...' }}</div>
            <div>
              {{ $currency(productItem.price) }}
            </div>
            <div>Stock: {{ productItem.stock }}</div>
            <div>
              Rating: {{ productItem.reviews_aggregate.aggregate.avg.rating }}
            </div>
            <div>
              Total Review:
              {{ productItem.reviews_aggregate.aggregate.count }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row> -->
  </v-container>
</template>

<script>
import { getProductByName } from '~/graphql/product/queries'

export default {
  name: 'SearchPage',
  apollo: {
    product: {
      prefetch: true,
      query: getProductByName,
      variables() {
        return { _ilike: `%${this.$route.query.q}%` }
      },
    },
  },
}
</script>
