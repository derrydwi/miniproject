<template>
  <div>
    <v-card class="mx-auto my-4" max-width="300">
      <div class="text-right">
        <v-btn color="teal" icon class="text-right" @click="deleteItem"
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
          {{
            cartItem.product.price
              .toLocaleString('id-id', {
                style: 'currency',
                currency: 'IDR',
              })
              .slice(0, -3)
          }}
          <div>Quantity: {{ cartItem.quantity }}</div>
          <div>
            Price:
            {{
              (cartItem.product.price * cartItem.quantity)
                .toLocaleString('id-id', {
                  style: 'currency',
                  currency: 'IDR',
                })
                .slice(0, -3)
            }}
          </div>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="teal"
          icon
          @click="
            quantity--
            test()
          "
          ><v-icon>mdi-minus</v-icon></v-btn
        >
        <v-text-field
          v-model.number="quantity"
          type="number"
          class="input-quantity centered-input"
          label="Stock"
          solo
          hide-details="true"
          @keyup.enter="test"
        ></v-text-field>
        <v-btn
          color="teal"
          icon
          @click="
            quantity++
            test()
          "
          ><v-icon>mdi-plus</v-icon></v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { updateToCart, deleteItemFromCart } from '~/graphql/queries'

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
    }
  },
  mounted() {
    this.quantity = this.cartItem.quantity
  },
  methods: {
    test() {
      this.$apollo
        .mutate({
          mutation: updateToCart,
          variables: {
            id: this.cartItem.id,
            quantity: this.quantity,
          },
        })
        .then((result) => {
          // eslint-disable-next-line no-console
          console.log('resulte', result)
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log('errore', error)
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
        .then((result) => {
          // eslint-disable-next-line no-console
          console.log('result delete', result)
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log('error delete', error)
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