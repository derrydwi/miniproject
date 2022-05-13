<template>
  <v-card class="mx-auto pa-4" width="600" outlined>
    <v-list-item>
      <v-list-item-avatar tile size="150">
        <v-img contain :src="orderItem.product.image_url" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="text-h6 mb-4">
          {{ orderItem.product.name }}
        </v-list-item-title>
        <v-list-item-subtitle>
          <p>{{ orderItem.quantity }} item ({{ weightPerItem }})</p>
          <p class="font-weight-bold">
            {{ $currency(orderItem.product.price) }}
          </p>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-card-actions>
      <span class="text-md-body-1 font-weight-bold">Subtotal</span>
      <v-spacer />
      <span class="text-md-body-1 font-weight-bold accent--text">{{
        pricePerItem
      }}</span>
    </v-card-actions>
  </v-card>
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
  computed: {
    weightPerItem() {
      return `${this.orderItem.quantity * this.orderItem.product.weight} g`
    },
    pricePerItem() {
      return this.$currency(
        this.orderItem.quantity * this.orderItem.product.price
      )
    },
  },
  mounted() {
    this.quantity = this.orderItem.quantity
  },
}
</script>
