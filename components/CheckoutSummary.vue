<template>
  <div :style="$vuetify.breakpoint.mdAndUp && 'position: sticky; top: 22vh'">
    <v-card class="mx-auto pa-6 el">
      <p class="text-md-body-1 font-weight-bold">Detail</p>
      <div class="d-flex justify-space-between mb-4">
        <span>Total Item</span>
        <span v-text="totalItem" />
      </div>
      <div class="d-flex justify-space-between mb-4">
        <span>Total Weight</span>
        <span>{{ totalWeight }} g</span>
      </div>
      <v-divider class="mb-4" />
      <p class="text-md-body-1 font-weight-bold">Summary</p>
      <div class="d-flex justify-space-between mb-4">
        <span>Shipping Price</span>
        <span v-text="$currency(courierService.price)" />
      </div>
      <div class="d-flex justify-space-between mb-4">
        <span>Total Price</span>
        <span v-text="$currency(totalPrice)" />
      </div>
      <v-divider class="mb-4" />
      <div class="d-flex justify-space-between mb-5">
        <span class="text-md-h6 font-weight-bold accent--text">Total Bill</span>
        <span
          class="text-md-h6 font-weight-bold accent--text"
          v-text="$currency(totalBill)"
        />
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
    totalBill: {
      type: Number,
      default: 0,
    },
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
