<template>
  <v-card class="mx-auto pa-4" width="600" outlined>
    <v-list-item>
      <v-list-item-avatar tile size="150">
        <v-img contain :src="orderItem.product.image_url" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title
          class="text-h6 mb-4"
          v-text="orderItem.product.name"
        />
        <v-list-item-subtitle>
          <p>{{ orderItem.quantity }} item ({{ weightPerItem }} g)</p>
          <p
            class="font-weight-bold"
            v-text="$currency(orderItem.product.price)"
          />
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-card-actions>
      <span class="text-md-body-1 font-weight-bold">Subtotal</span>
      <v-spacer />
      <span
        class="text-md-body-1 font-weight-bold accent--text"
        v-text="pricePerItem"
      />
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
  },
  computed: {
    weightPerItem() {
      return this.orderItem.quantity * this.orderItem.product.weight
    },
    pricePerItem() {
      return this.$currency(
        this.orderItem.quantity * this.orderItem.product.price
      )
    },
  },
}
</script>
