<template>
  <v-card class="mx-auto pa-4" width="600" outlined>
    <v-list-item>
      <v-list-item-avatar size="150" tile>
        <v-img contain :src="cartItem.product.image_url" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title
          class="text-h6 mb-4 pointer"
          @click="
            $router.push({
              name: 'product-id',
              params: { id: cartItem.product.id },
            })
          "
          v-text="cartItem.product.name"
        />
        <v-list-item-subtitle
          class="accent--text font-weight-bold"
          v-text="$currency(cartItem.product.price)"
        />
      </v-list-item-content>
    </v-list-item>
    <v-card-actions>
      <span class="text-md-body-2">Stock: {{ cartItem.product.stock }}</span>
      <v-spacer />
      <v-btn color="grey" icon class="text-right" @click.prevent="deleteItem"
        ><v-icon>mdi-delete-outline</v-icon></v-btn
      >
      <v-btn
        color="accent"
        icon
        :disabled="quantity === 1 || quantity > cartItem.product.stock"
        @click.prevent="changeStockHandler('decrement')"
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
        @change="changeStockHandler"
      ></v-text-field>
      <v-btn
        color="accent"
        icon
        :disabled="quantity >= cartItem.product.stock"
        @click.prevent="changeStockHandler('increment')"
        ><v-icon>mdi-plus</v-icon></v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import { updateToCart, deleteItemFromCart } from '~/graphql/cart/queries'

export default {
  name: 'CartItem',
  props: {
    cartItem: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      quantity: 1,
      timeout: 0,
      numberRule: (v) => {
        if (!isNaN(parseInt(v)) && v >= 1 && v <= this.cartItem.product.stock)
          return true
        return `Quantity has to be between 1 and ${this.cartItem.product.stock}`
      },
    }
  },
  watch: {
    cartItem() {
      this.quantity = this.cartItem.quantity
      if (this.cartItem.product.stock === 0) {
        this.deleteItem()
      }
    },
  },
  mounted() {
    this.quantity = this.cartItem.quantity
  },
  methods: {
    validateStock() {
      if (this.quantity < 1) {
        this.quantity = 1
      } else if (this.quantity > this.cartItem.product.stock) {
        this.quantity = this.cartItem.product.stock
      }
    },
    changeStockHandler(type) {
      if (type === 'decrement') {
        this.quantity--
      } else if (type === 'increment') {
        this.quantity++
      }
      this.validateStock()
      this.changeStock()
    },
    changeStock() {
      if (this.timeout) clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.$apollo
          .mutate({
            mutation: updateToCart,
            variables: {
              id: this.cartItem.id,
              quantity: this.quantity,
            },
          })
          .then(() => {
            this.$showAlert({ text: 'Quantity Updated', icon: 'success' })
          })
          .catch((error) => {
            this.$showAlert({
              text: `Can't update quantity. ${error.message}`,
              icon: 'error',
            })
          })
      }, 300)
    },
    deleteItem() {
      this.$apollo
        .mutate({
          mutation: deleteItemFromCart,
          variables: {
            id: this.cartItem.id,
          },
        })
        .then(() => {
          this.$showAlert({ text: 'Item Deleted', icon: 'success' })
        })
        .catch((error) => {
          this.$showAlert({
            text: `Can't delete item. ${error.message}`,
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
