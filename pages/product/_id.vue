<template>
  <div>
    <div v-if="$apollo.loading">Loading...</div>
    <div v-else>
      <pre>isLogin: {{ $auth.loggedIn }}</pre>
      <pre>cart: {{ cart }}</pre>
      <v-row justify="center">
        <v-col cols="11" md="7">
          <h4 class="text-center text-md-h4 font-weight-bold my-4">
            {{ productDetail.name }}
          </h4>
          <div class="text-center mb-4">
            <div class="d-flex justify-center align-center mt-2">
              <v-rating
                class="mr-2"
                color="teal"
                background-color="grey lighten-1"
                half-increments
                length="5"
                readonly
                dense
                size="20"
                :value="productDetail.reviews_aggregate.aggregate.avg.rating"
              ></v-rating>
              <span
                >({{
                  productDetail.reviews_aggregate.aggregate.count
                }}
                Review)</span
              >
            </div>
          </div>
          <h5 class="text-center text-md-h5 font-weight-bold mb-4">
            {{
              productDetail.price
                .toLocaleString('id-id', {
                  style: 'currency',
                  currency: 'IDR',
                })
                .slice(0, -3)
            }}
          </h5>
          <v-img
            :src="productDetail.image_url"
            width="100%"
            height="50vh"
            class="el rounded-lg mb-8"
            contain
          >
            <template #placeholder>
              <v-skeleton-loader
                class="mx-auto"
                type="image@2"
              ></v-skeleton-loader>
            </template>
          </v-img>
          <p class="mt-5 mb-4">
            {{ productDetail.description }}
          </p>
          <p class="mt-5 mb-4">
            {{
              !productDetail.stock
                ? 'Stok habis'
                : `Stock: ${productDetail.stock}`
            }}
          </p>
          <p class="mt-5 mb-4">Weight: {{ productDetail.weight }}</p>
          <div class="d-flex justify-center align-center">
            <v-btn
              color="teal"
              icon
              :disabled="quantity === 1"
              @click="quantity--"
              ><v-icon>mdi-minus</v-icon></v-btn
            >
            <v-text-field
              v-model.number="quantity"
              type="number"
              color="teal"
              class="input-quantity centered-input mt-n2"
              dense
              hide-details="auto"
              :rules="[numberRule]"
            ></v-text-field>
            <v-btn
              color="teal"
              icon
              :disabled="quantity >= productDetail.stock"
              @click="quantity++"
              ><v-icon>mdi-plus</v-icon></v-btn
            >
          </div>
          <div class="text-center mb-8">
            <v-btn
              color="teal"
              text
              :disabled="
                productDetail.stock === 0 || quantity > productDetail.stock
              "
              @click="addToCart"
              ><v-icon class="mr-2">mdi-cart</v-icon> Add To Cart</v-btn
            >
          </div>
          <h5 class="text-md-h5 mb-4">Review</h5>
          <div v-for="review in productDetail.reviews" :key="review.id">
            <div class="d-flex justify-start align-center mb-4">
              <v-rating
                color="teal"
                background-color="grey lighten-1"
                class="mr-4"
                half-increments
                length="5"
                readonly
                dense
                size="20"
                :value="review.rating"
              ></v-rating>
              <span>
                {{ getRelativeTime(+new Date(review.created_at)) }}
              </span>
            </div>
            <div class="d-flex justify-start align-center mb-4">
              <!-- <v-avatar color="teal" size="35" class="mr-2">{{
            review.user.username.substr(0, 2).toUpperCase()
          }}</v-avatar> -->
              <v-img
                :src="review.user.picture"
                max-width="30"
                class="rounded-circle mr-2"
              />
              <span>{{ review.user.username }}</span>
            </div>
            <p class="mb-8">{{ review.comment }}</p>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import {
  getProductDetail,
  getCart,
  insertToCart,
  updateToCart,
  subscriptionCart,
} from '~/graphql/queries'

export default {
  name: 'DetailProductPage',
  apollo: {
    productDetail: {
      query: getProductDetail,
      variables() {
        return { id: this.$route.params.id }
      },
    },
    cart: {
      query: getCart,
      skip() {
        return !this.$auth.loggedIn
      },
    },
    $subscribe: {
      cart: {
        query: subscriptionCart,
        result({ data }) {
          this.cart = data.cart
        },
        skip() {
          return !this.$auth.loggedIn
        },
      },
    },
  },
  data() {
    return {
      quantity: 1,
      numberRule: (v) => {
        if (!isNaN(parseInt(v)) && v >= 1 && v <= this.productDetail.stock)
          return true
        return `Quantity has to be between 1 and ${this.productDetail.stock}`
      },
    }
  },
  computed: {
    sameItem() {
      return this.cart.find(
        (x) => x.product.id === parseInt(this.$route.params.id)
      )
    },
  },
  methods: {
    getRelativeTime(d1, d2 = new Date()) {
      const units = {
        year: 24 * 60 * 60 * 1000 * 365,
        month: (24 * 60 * 60 * 1000 * 365) / 12,
        day: 24 * 60 * 60 * 1000,
        hour: 60 * 60 * 1000,
        minute: 60 * 1000,
        second: 1000,
      }
      const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
      const elapsed = d1 - d2
      for (const u in units) {
        if (Math.abs(elapsed) > units[u] || u === 'second') {
          return rtf.format(Math.round(elapsed / units[u]), u)
        }
      }
    },
    isLoginValidation() {
      if (!this.$auth.loggedIn) {
        this.$swal({
          toast: true,
          text: "You're Not Logged In\nRedirecting...",
          icon: 'info',
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false,
          position: 'top-end',
        })
        this.$auth.loginWith('auth0', { params: { prompt: 'login' } })
      }
    },
    addToCart() {
      this.isLoginValidation()
      if (
        this.sameItem &&
        this.quantity + this.sameItem.quantity > this.sameItem.product.stock
      ) {
        this.$swal({
          toast: true,
          text: 'Kuantitas yang dipilih melebihi stok yang tersedia',
          icon: 'error',
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
          position: 'top-end',
        })
        return
      }
      this.$apollo
        .mutate({
          mutation: this.sameItem ? updateToCart : insertToCart,
          variables: {
            ...(this.sameItem && {
              id: this.sameItem.id,
              quantity: this.sameItem.quantity + this.quantity,
            }),
            ...(!this.sameItem && {
              product_id: this.$route.params.id,
              quantity: this.quantity,
            }),
          },
        })
        .then((result) => {
          // eslint-disable-next-line no-console
          console.log('result', result)
          // alert('Berhasil ditambahkan ke cart')
          this.$swal({
            toast: true,
            text: 'Cart Updated',
            icon: 'success',
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            position: 'top-end',
          })
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log('error', error)
        })
    },
  },
}
</script>

<style scoped>
.input-quantity >>> input[type='number'] {
  -moz-appearance: textfield;
}
.input-quantity >>> input::-webkit-outer-spin-button,
.input-quantity >>> input::-webkit-inner-spin-button {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.centered-input >>> input {
  text-align: center;
}
</style>