<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <div>CATEGORY PRODUCT</div>
        <div v-if="$apollo.loading">Loading...</div>
        <div v-else>
          <v-btn
            v-for="category in categoryName"
            :key="category"
            :to="{ name: 'category-name', params: { name: category } }"
            >{{ category }}</v-btn
          >
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
  </v-container>
</template>

<script>
import { getAllProduct, getProductByCategory } from '~/graphql/product/queries'
export default {
  name: 'CategoryPage',
  apollo: {
    product: {
      query() {
        return this.$route.params.name ? getProductByCategory : getAllProduct
      },
      variables() {
        return (
          this.$route.params.name && { _ilike: `%${this.$route.params.name}%` }
        )
      },
    },
  },
  data() {
    return {
      categoryName: ['electronic', 'fashion', 'hobby', 'jewelry'],
    }
  },
}
</script>
