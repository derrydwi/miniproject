<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <div v-if="$auth.loggedIn">
          <div v-if="$apollo.loading">Loading...</div>
          <div v-else>
            <p>Token: {{ $auth.getToken('auth0') }}</p>
          </div>
          <p>
            Now that you're authenticated, maybe you should try going to our
            <nuxt-link to="/secret" class="link">super secret page</nuxt-link>!
          </p>
          <v-btn @click="$auth.logout()">Logout</v-btn>
          <v-btn :to="{ name: 'cart' }">Cart</v-btn>
          <v-btn :to="{ name: 'order' }">Order</v-btn>
          <v-btn :to="{ name: 'profile' }">Profile</v-btn>
        </div>
        <div v-else>
          <v-btn
            @click="$auth.loginWith('auth0', { params: { prompt: 'login' } })"
            >Login</v-btn
          >
          <p>
            You're not authenticated yet. Maybe you want to
            <a class="link" @click="$auth.login()">sign in</a> and see what
            happens?
          </p>
        </div>
        <div>PRODUCT</div>
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
          <!-- <div class="px-4 py-4"> -->
          <v-img contain width="800" height="200" :src="productItem.image_url">
            <template #placeholder>
              <v-skeleton-loader
                class="mx-auto"
                type="image@2"
              ></v-skeleton-loader>
            </template>
          </v-img>
          <!-- </div> -->
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
        <pre>{{ $auth.user }}</pre>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {
  getProduct,
  getCart,
  subscriptionProduct,
  subscriptionCart,
  getOrder,
  subscriptionOrder,
} from '~/graphql/queries'

export default {
  name: 'ProductPage',
  apollo: {
    product: {
      prefetch: true,
      query: getProduct,
    },
    cart: {
      query: getCart,
      skip() {
        return !this.$auth.loggedIn
      },
    },
    order: {
      query: getOrder,
      skip() {
        return !this.$auth.loggedIn
      },
    },
    $subscribe: {
      product: {
        query: subscriptionProduct,
        result({ data }) {
          this.product = data.product
        },
        skip() {
          return !this.$auth.loggedIn
        },
      },
      cart: {
        query: subscriptionCart,
        result({ data }) {
          this.cart = data.cart
        },
        skip() {
          return !this.$auth.loggedIn
        },
      },
      order: {
        query: subscriptionOrder,
        result({ data }) {
          this.order = data.order
        },
        skip() {
          return !this.$auth.loggedIn
        },
      },
    },
  },
}
</script>
