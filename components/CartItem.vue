<template>
  <v-card class="mx-auto pa-4" width="600" outlined>
    <v-list-item>
      <v-list-item-avatar tile size="150">
        <v-img contain :src="cartItem.product.image_url" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="text-h6 mb-4">
          {{ cartItem.product.name }}
        </v-list-item-title>
        <v-list-item-subtitle class="accent--text font-weight-bold">{{
          $formatMoney(cartItem.product.price)
        }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-card-actions>
      <span class="text-md-body-2">Stock: {{ cartItem.product.stock }}</span>
      <v-spacer />
      <v-btn color="grey" icon class="text-right" @click.prevent="deleteItem"
        ><v-icon>mdi-delete-outline</v-icon></v-btn
      >
      <v-btn
        color="primary"
        icon
        :disabled="quantity === 1 || quantity > cartItem.product.stock"
        @click.prevent="changeStock('decrement')"
        ><v-icon>mdi-minus</v-icon></v-btn
      >
      <v-text-field
        v-model.number="quantity"
        type="number"
        color="primary"
        class="input-quantity centered-input mt-n2"
        style="max-width: 120px"
        dense
        hide-details="auto"
        :rules="[numberRule]"
        @change="changeStock('input')"
      ></v-text-field>
      <v-btn
        color="primary"
        icon
        :disabled="quantity >= cartItem.product.stock"
        @click.prevent="changeStock('increment')"
        ><v-icon>mdi-plus</v-icon></v-btn
      >
    </v-card-actions>
  </v-card>

  <!-- <v-card
      class="mx-auto my-4 el"
      max-width="300"
      :to="{ name: 'product-id', params: { id: cartItem.product.id } }"
    >
      <div class="text-right">
        <v-btn
          color="primary"
          icon
          class="text-right"
          @click.prevent="deleteItem"
          ><v-icon>mdi-delete-outline</v-icon></v-btn
        >
      </div>
      <div class="px-4 py-4">
        <v-img
          contain
          max-width="800"
          max-height="200"
          :src="cartItem.product.image_url"
        />
      </div>
      <v-card-text class="text--primary">
        <p>{{ index + 1 }}.</p>
        <p class="text-h5 text--primary">{{ cartItem.product.name }}</p>
        <div>
          {{ $formatMoney(cartItem.product.price) }}
          <div>Stock: {{ cartItem.product.stock }}</div>
          <div>Quantity: {{ cartItem.quantity }}</div>
          <div>
            Price:
            {{ $formatMoney(cartItem.product.price * cartItem.quantity) }}
          </div>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          icon
          :disabled="quantity === 1 || quantity > cartItem.product.stock"
          @click.prevent="changeStock('decrement')"
          ><v-icon>mdi-minus</v-icon></v-btn
        >
        <v-text-field
          v-model.number="quantity"
          type="number"
          color="primary"
          class="input-quantity centered-input mt-n2"
          dense
          hide-details="auto"
          :rules="[numberRule]"
          @change="changeStock('input')"
        ></v-text-field>
        <v-btn
          color="primary"
          icon
          :disabled="quantity >= cartItem.product.stock"
          @click.prevent="changeStock('increment')"
          ><v-icon>mdi-plus</v-icon></v-btn
        >
      </v-card-actions>
    </v-card> -->
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
    index: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      quantity: 1,
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
    changeStock(type) {
      this.validateStock()
      this.$apollo
        .mutate({
          mutation: updateToCart,
          variables: {
            id: this.cartItem.id,
            ...(type === 'decrement' && { quantity: this.quantity - 1 }),
            ...(type === 'increment' && { quantity: this.quantity + 1 }),
            ...(type === 'input' && { quantity: this.quantity }),
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