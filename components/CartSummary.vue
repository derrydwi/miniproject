<template>
  <div :style="$vuetify.breakpoint.mdAndUp && 'position: sticky; top: 22vh'">
    <v-card class="mx-auto pa-6 el">
      <p class="text-md-h6 font-weight-bold">Cart Summary</p>
      <div class="d-flex justify-space-between mb-4">
        <span>Number of Item</span>
        <span v-text="totalItem" />
      </div>
      <v-divider class="mb-4" />
      <div class="d-flex justify-space-between mb-5">
        <span class="text-md-body-1 font-weight-bold">Total Price</span>
        <span
          class="text-md-body-1 font-weight-bold"
          v-text="$currency(totalPrice)"
        />
      </div>
      <v-btn
        :disabled="!isValid"
        :to="{ name: 'checkout' }"
        color="primary"
        min-height="40"
        depressed
        block
        >Checkout ({{ totalItem }})</v-btn
      >
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'CartSummary',
  props: {
    isValid: {
      type: Boolean,
      default: false,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    totalItem: {
      type: Number,
      default: 0,
    },
  },
}
</script>
