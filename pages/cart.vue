<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div v-if="$auth.loggedIn">
        <div v-if="$apollo.loading">Loading...</div>
        <div v-else>
          <div>
            <p>Cart</p>
            <v-card
              v-for="cartItem in cart"
              :key="cartItem.id"
              class="mx-auto my-4"
              max-width="300"
            >
              <div class="px-4 py-4">
                <v-img
                  contain
                  max-width="800"
                  max-height="200"
                  :src="cartItem.product.image_url"
                />
              </div>
              <v-card-text class="text--primary">
                <p class="text-h5 text--primary">{{ cartItem.product.name }}</p>
                <div>
                  {{
                    cartItem.product.price
                      .toLocaleString('id-id', {
                        style: 'currency',
                        currency: 'IDR',
                      })
                      .slice(0, -3)
                  }}
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn color="teal" text>Add To Cart</v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Not Authorized</p>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { getCart } from '~/graphql/queries'

export default {
  name: 'CartPage',
  middleware: 'auth',
  apollo: {
    cart: {
      query: getCart,
    },
  },
}
</script>
