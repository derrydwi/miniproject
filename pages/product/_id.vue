<template>
  <div>
    <div v-if="$apollo.loading">Loading...</div>
    <div v-else>
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
            {{ $formatMoney(productDetail.price) }}
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
          <div v-if="productDetail.reviews.length">
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
                  {{ $relativeTime(review.created_at) }}
                </span>
              </div>
              <div class="d-flex justify-start align-center mb-4">
                <v-img
                  :src="review.user.picture"
                  max-width="30"
                  class="rounded-circle mr-2"
                />
                <span>{{ review.user.username }}</span>
              </div>
              <p class="mb-8">{{ review.comment }}</p>
            </div>
          </div>
          <div v-else>
            <v-alert type="info" color="teal" text>No review yet</v-alert>
          </div>
          <div v-if="$auth.loggedIn && !isReviewed">
            <h6 class="text-md-h6 mb-4">Write Review</h6>
            <v-form
              ref="form"
              v-model="isValid"
              @submit.prevent="isValid && submitReview"
            >
              <v-rating
                v-model="rating"
                class="ml-n2 mb-4"
                color="teal"
                background-color="grey lighten-1"
              ></v-rating>
              <v-textarea
                v-model="reviewDesc"
                label="Review"
                color="teal"
                outlined
              ></v-textarea>
              <v-btn
                color="teal"
                text
                :disabled="!reviewDesc || !rating"
                @click="submitReview"
                ><v-icon class="mr-2">mdi-send</v-icon>Submit</v-btn
              >
            </v-form>
          </div>
          <div v-else-if="$auth.loggedIn && isReviewed">
            <v-alert type="info" color="teal" text
              >You're already review this product</v-alert
            >
          </div>
          <div v-else-if="!$auth.loggedIn">
            <v-alert type="info" color="teal" text
              >Login to review this product</v-alert
            >
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
  insertReview,
  getOrder,
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
    order: {
      query: getOrder,
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
      isValid: false,
      rating: 0,
      reviewDesc: '',
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
    isReviewed() {
      return this.productDetail.reviews.find(
        (x) => x.user.id === this.$auth.user.sub
      )
    },
  },
  methods: {
    isLoginValidation() {
      if (!this.$auth.loggedIn) {
        this.$showAlert({
          text: "You're Not Logged In\nRedirecting...",
          icon: 'info',
          timer: 1000,
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
        this.$showAlert({
          text: 'Quantity should not exceed the stock',
          icon: 'error',
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
        .then(() => {
          this.$showAlert({ text: 'Cart Updated', icon: 'success' })
        })
        .catch((error) => {
          this.$showAlert({
            text: `Can't add produt to cart. ${error.message}`,
            icon: 'error',
          })
        })
    },
    submitReview() {
      this.$apollo
        .mutate({
          mutation: insertReview,
          variables: {
            product_id: this.$route.params.id,
            rating: this.rating,
            comment: this.reviewDesc,
          },
        })
        .then(() => {
          this.$apollo.queries.productDetail.refetch()
          this.$showAlert({ text: 'Review Submitted', icon: 'success' })
        })
        .catch((error) => {
          this.$showAlert({
            text: `Can't submit the review. ${error.message}`,
            icon: 'error',
          })
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