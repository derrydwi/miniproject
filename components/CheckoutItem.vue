<template>
  <div>
    <v-card class="mx-auto my-4 el" max-width="300">
      <div class="px-4 py-4">
        <v-img
          contain
          max-width="800"
          max-height="200"
          :src="orderItem.product.image_url"
        />
      </div>
      <v-card-text class="text--primary">
        <p>{{ index + 1 }}.</p>
        <p class="text-h5 text--primary">{{ orderItem.product.name }}</p>
        <div>
          <div class="d-flex justify-space-between">
            <div>
              {{ $formatMoney(orderItem.product.price) }}
            </div>
            <div>x{{ orderItem.quantity }}</div>
          </div>
          <div>
            Price:
            {{ $formatMoney(orderItem.product.price * orderItem.quantity) }}
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'CheckoutItem',
  props: {
    orderItem: {
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
    this.quantity = this.orderItem.quantity
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