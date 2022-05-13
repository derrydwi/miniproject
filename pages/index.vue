<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div v-if="$auth.loggedIn">
        <div v-if="$apollo.loading">Loading...</div>
        <div v-else>
          <p>Token: {{ token }}</p>
          <!-- <pre>Order: <br> {{ order }}</pre>
          <br />
          <pre>Cart: <br> {{ cart }}</pre>
          <br />
          <pre>Product: <br> {{ product }}</pre>
          <br /> -->

          <div>
            <p>Order</p>
            <div>
              <v-card
                v-for="orderItem in order"
                :key="orderItem.id"
                class="mx-auto my-4"
                max-width="300"
              >
                <div>
                  Alamat: {{ orderItem.alamat }}, {{ orderItem.kota }},
                  {{ orderItem.provinsi }}
                </div>
                <div>No Hp: {{ orderItem.no_hp }}</div>
                <div>Ongkos Kirim: {{ orderItem.shipping_price }}</div>
                <div>Total: {{ orderItem.total_price }}</div>
                <div>Telah Dibayar: {{ orderItem.is_paid }}</div>
                <div
                  v-for="item in orderItem.order_items"
                  :key="item.id"
                  class="px-4 py-4"
                >
                  <v-img
                    contain
                    max-width="800"
                    max-height="200"
                    :src="item.product.image_url"
                  />
                  <v-card-text class="text--primary">
                    <p class="text-h5 text--primary">
                      {{ item.product.name }}
                    </p>
                    <div>
                      {{
                        item.product.price
                          .toLocaleString('id-id', {
                            style: 'currency',
                            currency: 'IDR',
                          })
                          .slice(0, -3)
                      }}
                    </div>
                    <div>Quantity: {{ item.quantity }}</div>
                    <div>
                      Price:
                      {{
                        item.price
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
                </div>
              </v-card>
            </div>
          </div>

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

          <div>PRODUCT</div>
          <v-card
            v-for="productItem in product"
            :key="productItem.id"
            class="mx-auto my-4"
            max-width="300"
          >
            <div class="px-4 py-4">
              <v-img
                contain
                max-width="800"
                max-height="200"
                :src="productItem.image_url"
              />
            </div>
            <v-card-text class="text--primary">
              <p class="text-h5 text--primary">{{ productItem.name }}</p>
              <div>{{ productItem.description.substring(0, 35) + '...' }}</div>
              <div>
                {{
                  productItem.price
                    .toLocaleString('id-id', {
                      style: 'currency',
                      currency: 'IDR',
                    })
                    .slice(0, -3)
                }}
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
            <v-card-actions>
              <v-btn color="teal" text>Add To Cart</v-btn>
            </v-card-actions>
          </v-card>
        </div>
        <p>
          Now that you're authenticated, maybe you should try going to our
          <nuxt-link to="/secret" class="link">super secret page</nuxt-link>!
        </p>
        <v-btn @click="$auth.logout()">Logout</v-btn>
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
      <pre>{{ $auth.user }}</pre>
      <v-card class="logo py-4 d-flex justify-center">
        <NuxtLogo />
        <VuetifyLogo />
      </v-card>
      <v-card>
        <v-card-title class="headline">
          Welcome to the Vuetify + Nuxt.js template
        </v-card-title>
        <v-card-text>
          <p>
            Vuetify is a progressive Material Design component framework for
            Vue.js. It was designed to empower developers to create amazing
            applications.
          </p>
          <p>
            For more information on Vuetify, check out the
            <a
              href="https://vuetifyjs.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              documentation </a
            >.
          </p>
          <p>
            If you have questions, please join the official
            <a
              href="https://chat.vuetifyjs.com/"
              target="_blank"
              rel="noopener noreferrer"
              title="chat"
            >
              discord </a
            >.
          </p>
          <p>
            Find a bug? Report it on the github
            <a
              href="https://github.com/vuetifyjs/vuetify/issues"
              target="_blank"
              rel="noopener noreferrer"
              title="contribute"
            >
              issue board </a
            >.
          </p>
          <p>
            Thank you for developing with Vuetify and I look forward to bringing
            more exciting features in the future.
          </p>
          <div class="text-xs-right">
            <em><small>&mdash; John Leider</small></em>
          </div>
          <hr class="my-3" />
          <a
            href="https://nuxtjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nuxt Documentation
          </a>
          <br />
          <a
            href="https://github.com/nuxt/nuxt.js"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nuxt GitHub
          </a>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="/inspire"> Continue </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { getProduct, getCart, getOrder } from '~/graphql/queries'

export default {
  name: 'IndexPage',
  apollo: {
    product: {
      query: getProduct,
      context() {
        return {
          headers: {
            Authorization: this.token,
          },
        }
      },
    },
    cart: {
      query: getCart,
      context() {
        return {
          headers: {
            Authorization: this.token,
          },
        }
      },
    },
    order: {
      query: getOrder,
      context() {
        return {
          headers: {
            Authorization: this.token,
          },
        }
      },
    },
  },
  computed: {
    token() {
      return localStorage.getItem('auth._token.auth0') || ''
    },
  },
}
</script>