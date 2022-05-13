<template>
  <div>
    <v-card class="mx-auto my-4 el" max-width="300">
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
          <div>Stock: {{ cartItem.product.stock }}</div>
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
          :disabled="quantity === 1 || quantity > cartItem.product.stock"
          @click="changeStock('decrement')"
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
          @change="changeStock('input')"
        ></v-text-field>
        <v-btn
          color="teal"
          icon
          :disabled="quantity >= cartItem.product.stock"
          @click="changeStock('increment')"
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
      // this.changeStock('input')
    },
  },
  mounted() {
    this.quantity = this.cartItem.quantity
  },
  methods: {
    validateStock() {
      if (this.quantity < 1) {
        // alert(`Minimum pembelian produk 1 item`)
        this.quantity = 1
        // alert('Quantity setted to min')
      } else if (this.quantity > this.cartItem.product.stock) {
        // alert(
        //   `Maksimal pembelian produk ${this.cartItem.product.name} ${this.cartItem.product.stock} item`
        // )
        this.quantity = this.cartItem.product.stock
        // alert('Quantity setted to max')
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
        .then((result) => {
          // eslint-disable-next-line no-console
          console.log('resulte', result)
          this.$swal({
            toast: true,
            text: 'Quantity Updated',
            icon: 'success',
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            position: 'top-end',
          })
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
          this.$swal({
            toast: true,
            text: 'Item Deleted',
            icon: 'success',
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            position: 'top-end',
          })
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