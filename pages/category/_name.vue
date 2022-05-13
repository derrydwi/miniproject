<template>
  <BaseLoading v-if="$apollo.loading" />
  <v-container v-else>
    <v-row dense>
      <v-col cols="12" md="9" class="mx-auto">
        <h2
          class="my-2 text-capitalize text-center"
          v-text="$route.params.name"
        />
        <v-row class="my-3">
          <template v-for="productItem in product">
            <v-fade-transition :key="productItem.id">
              <v-col cols="12" md="6">
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
                  <v-card-title
                    class="text-md-body-1 mb-2"
                    v-text="productItem.name"
                  />
                  <v-card-subtitle
                    class="accent--text pb-3 font-weight-bold"
                    v-text="$currency(productItem.price)"
                  />
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
                    <p class="mb-0">
                      Sold
                      {{ productItem.order_items_aggregate.aggregate.count }}
                    </p>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-fade-transition>
          </template>
        </v-row>
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
  head() {
    return { title: this.$capitalize(this.$route.params.name) }
  },
}
</script>
