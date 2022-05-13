<template>
  <div :style="$vuetify.breakpoint.mdAndUp && 'position: sticky; top: 22vh'">
    <v-card class="mx-auto pa-6 el">
      <p class="text-md-body-1 font-weight-bold">Detail</p>
      <div class="d-flex justify-space-between mb-4">
        <span>Total Item</span>
        <span>{{ totalItem }}</span>
      </div>
      <div class="d-flex justify-space-between mb-4">
        <span>Total Weight</span>
        <span>{{ totalWeight }} g</span>
      </div>
      <v-divider class="mb-4" />
      <p class="text-md-body-1 font-weight-bold">Summary</p>
      <div class="d-flex justify-space-between mb-4">
        <span>Shipping Price</span>
        <span>{{ $formatMoney(courierService.price) }}</span>
      </div>
      <div class="d-flex justify-space-between mb-4">
        <span>Total Price</span>
        <span>{{ $formatMoney(totalPrice) }}</span>
      </div>
      <v-divider class="mb-4" />
      <div class="d-flex justify-space-between mb-5">
        <span class="text-md-h6 font-weight-bold accent--text">Total Bill</span>
        <span class="text-md-h6 font-weight-bold accent--text">{{
          $formatMoney(totalPrice + courierService.price)
        }}</span>
      </div>
      <v-btn
        color="primary"
        min-height="40"
        depressed
        block
        :disabled="!isValid"
        @click="$emit('make-order')"
        >Checkout</v-btn
      >
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CartSummary',
  props: {
    totalPrice: {
      type: Number,
      default: 0,
    },
    totalItem: {
      type: Number,
      default: 0,
    },
    totalWeight: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapGetters('checkout', {
      courierService: 'getCourierService',
      isValid: 'getIsValid',
    }),
  },
}
</script>