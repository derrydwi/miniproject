<template>
  <BaseLoading v-if="$apollo.loading" />
  <v-container v-else>
    <v-row justify="space-around">
      <v-col cols="12" md="11">
        <h4
          class="text-center text-md-h4 text-h5 font-weight-bold my-4"
          v-text="productDetail.name"
        />
        <div class="text-center mb-4">
          <div class="d-flex justify-center align-center mt-2">
            <v-rating
              class="mr-2"
              color="warning"
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
        <h5
          class="text-center text-md-h5 text-h6 font-weight-bold mb-4"
          v-text="$currency(productDetail.price)"
        />
      </v-col>
      <v-col cols="11" md="7">
        <div>
          <v-img
            :src="productDetail.image_url"
            width="100%"
            height="50vh"
            class="mb-8"
            contain
          >
            <template #placeholder>
              <v-skeleton-loader
                class="mx-auto"
                type="image@2"
              ></v-skeleton-loader>
            </template>
          </v-img>
          <p
            class="mt-5 mb-4"
            style="line-height: 1.8"
            v-text="productDetail.description"
          />
          <v-chip
            outlined
            label
            link
            :to="{
              name: 'category-name',
              params: { name: productDetail.category.toLowerCase() },
            }"
            v-text="productDetail.category"
          />
          <p class="mt-5 mb-4">
            {{
              !productDetail.stock
                ? 'Stok habis'
                : `Stock: ${productDetail.stock}`
            }}
          </p>
          <p class="mt-5 mb-4">Weight: {{ productDetail.weight }}</p>
        </div>
        <div class="mt-14">
          <div v-if="productDetail.reviews.length">
            <h5 class="text-md-h5 mb-4">Review</h5>
            <v-card
              v-for="review in productDetail.reviews"
              :key="review.id"
              class="rounded-lg el pa-6 mb-4"
            >
              <div class="d-flex justify-start align-center mb-4">
                <v-rating
                  color="warning"
                  background-color="grey lighten-1"
                  class="mr-4"
                  half-increments
                  length="5"
                  readonly
                  dense
                  size="20"
                  :value="review.rating"
                ></v-rating>
                <span v-text="$relativeTime(review.created_at)" />
              </div>
              <div class="d-flex justify-start align-center mb-4">
                <v-img
                  :src="review.user.picture"
                  max-width="30"
                  class="rounded-circle mr-2"
                />
                <span v-text="review.user.username" />
              </div>
              <p class="mb-0" v-text="review.comment" />
            </v-card>
          </div>
          <div v-else>
            <v-alert type="info" color="accent" text>No review yet</v-alert>
          </div>
          <div v-if="$auth.loggedIn && isBought && !isReviewed">
            <h6 class="text-md-h6 mb-4">Write Review</h6>
            <v-form
              ref="form"
              v-model="isValid"
              @submit.prevent="isValid && submitReview"
            >
              <v-rating
                v-model="rating"
                class="ml-n2 mb-4"
                color="warning"
                background-color="grey lighten-1"
              ></v-rating>
              <v-textarea
                v-model="reviewDescription"
                label="Review"
                color="primary"
                outlined
              ></v-textarea>
              <v-btn
                color="primary"
                text
                :disabled="!reviewDescription || !rating"
                @click="submitReview"
                ><v-icon class="mr-2">mdi-send</v-icon>Submit</v-btn
              >
            </v-form>
          </div>
          <div v-else-if="$auth.loggedIn && !isBought && !isReviewed">
            <v-alert type="info" color="accent" text
              >You can write a review after buying the product
            </v-alert>
          </div>
          <div v-else-if="!$auth.loggedIn">
            <v-alert type="info" color="accent" text
              >Login to review this product</v-alert
            >
          </div>
        </div>
      </v-col>
      <v-col cols="11" md="3">
        <div
          :style="$vuetify.breakpoint.mdAndUp && 'position: sticky; top: 25vh'"
        >
          <v-card outlined width="260" class="mb-8 mx-auto">
            <div class="d-flex justify-center align-center ma-6">
              <v-btn
                color="accent"
                icon
                :disabled="quantity === 1"
                @click="quantity--"
                ><v-icon>mdi-minus</v-icon></v-btn
              >
              <v-text-field
                v-model.number="quantity"
                type="number"
                color="accent"
                class="input-quantity centered-input mt-n2"
                style="max-width: 120px"
                dense
                hide-details="auto"
                :rules="[numberRule]"
              ></v-text-field>
              <v-btn
                color="accent"
                icon
                :disabled="quantity >= productDetail.stock"
                @click="quantity++"
                ><v-icon>mdi-plus</v-icon></v-btn
              >
            </div>
            <div class="text-center">
              <div class="ma-6">
                <span>Subtotal:</span>
                <span
                  class="font-weight-bold"
                  v-text="$currency(productDetail.price * quantity)"
                />
              </div>
              <v-btn
                class="mb-4"
                color="accent"
                min-width="180"
                depressed
                :disabled="
                  productDetail.stock === 0 || quantity > productDetail.stock
                "
                min-height="40"
                @click="addToCart"
                ><v-icon class="mr-2">mdi-cart</v-icon> Add To Cart</v-btn
              >
              <v-btn
                v-if="$auth.loggedIn"
                class="mb-8"
                color="accent"
                min-width="180"
                outlined
                @click="savedItemHandler"
                ><v-icon>{{
                  isSaved ? 'mdi-bookmark' : 'mdi-bookmark-outline'
                }}</v-icon
                >{{ isSaved ? 'Unsave' : 'Save' }}</v-btn
              >
            </div>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { insertToCart, updateToCart } from '~/graphql/cart/queries'
import { insertReview } from '~/graphql/review/queries'
import {
  getProductDetailGuest,
  getProductDetailUser,
  subscriptionProductDetail,
} from '~/graphql/productDetail/queries'
import { deleteSaved, insertSaved } from '~/graphql/saved/queries'

export default {
  name: 'DetailProductPage',
  apollo: {
    productDetail: {
      query() {
        return this.$auth.loggedIn
          ? getProductDetailUser
          : getProductDetailGuest
      },
      variables() {
        return { id: this.$route.params.id }
      },
      subscribeToMore: {
        document: subscriptionProductDetail,
        variables() {
          return { id: this.$route.params.id }
        },
        updateQuery: (_, { subscriptionData }) => {
          return {
            productDetail: subscriptionData.data.productDetail,
          }
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
      reviewDescription: '',
      numberRule: (v) => {
        if (!isNaN(parseInt(v)) && v >= 1 && v <= this.productDetail.stock)
          return true
        return `Quantity has to be between 1 and ${this.productDetail.stock}`
      },
    }
  },
  computed: {
    sameItem() {
      return this.productDetail.carts[0]
    },
    isBought() {
      return this.productDetail.order_items[0]
    },
    isSaved() {
      return this.productDetail.saveds[0]
    },
    isReviewed() {
      return this.productDetail.reviews.find(
        (x) => x.user.id === this.$auth.user.sub
      )
    },
  },
  methods: {
    async isLoginValidation() {
      if (!this.$auth.loggedIn) {
        this.$showAlert({
          text: "You're Not Logged In\nRedirecting...",
          icon: 'info',
          timer: 1000,
        })
        await this.$auth.loginWith('auth0', { params: { prompt: 'login' } })
      }
    },
    addToCart() {
      this.isLoginValidation()
      if (
        this.sameItem &&
        this.quantity + this.sameItem.quantity > this.productDetail.stock
      ) {
        this.$showAlert({
          text: `Quantity should not exceed the stock. Current quantity in cart is ${
            this.sameItem.quantity
          }. Max is ${this.productDetail.stock - this.sameItem.quantity}`,
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
            comment: this.reviewDescription,
          },
        })
        .then(() => {
          this.$showAlert({ text: 'Review Submitted', icon: 'success' })
        })
        .catch((error) => {
          this.$showAlert({
            text: `Can't submit the review. ${error.message}`,
            icon: 'error',
          })
        })
    },
    savedItemHandler() {
      this.$apollo
        .mutate({
          mutation: this.isSaved ? deleteSaved : insertSaved,
          variables: {
            ...(this.isSaved
              ? { id: this.isSaved.id }
              : { product_id: this.$route.params.id }),
          },
        })
        .then(() => {
          this.$showAlert({ text: 'Saved Product Updated', icon: 'success' })
        })
        .catch((error) => {
          this.$showAlert({
            text: `Can't update saved product. ${error.message}`,
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
