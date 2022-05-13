<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <div>SEARCH PRODUCT</div>
        <div v-if="$apollo.loading">Loading...</div>
        <div v-else>
          <v-card
            v-for="productItem in product"
            :key="productItem.id"
            class="mx-auto my-4 el"
            max-width="300"
            @click="
              $router.push({
                name: 'product-id',
                params: {
                  id: productItem.id,
                },
              })
            "
          >
            <v-img
              contain
              width="800"
              height="200"
              :src="productItem.image_url"
            >
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
                {{ $formatMoney(productItem.price) }}
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
        </div>
      </v-col>
    </v-row>
  </div>
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
