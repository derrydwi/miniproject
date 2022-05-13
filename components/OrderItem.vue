<template>
  <div>
    <v-card class="mx-auto my-4" max-width="300">
      <div>
        {{ new Date(orderItem.created_at).toUTCString().substring(0, 22) }}
      </div>
      <div>Alamat: {{ orderItem.alamat }}</div>
      <div>No Hp: {{ orderItem.no_hp }}</div>
      <div>
        Ongkos Kirim:
        {{ $formatMoney(orderItem.shipping_price) }}
      </div>
      <div>
        Total:
        {{ $formatMoney(orderItem.total_price) }}
      </div>
      <div>Telah Dibayar: {{ orderItem.status }}</div>
      <div
        v-for="item in orderItem.order_items"
        :key="item.id"
        class="px-4 py-4"
      >
        <v-img
          contain
          max-width="800"
          max-height="200"
          :src="item.product.image_url"
        />
        <v-card-text class="text--primary">
          <p class="text-h5 text--primary">
            {{ item.product.name }}
          </p>
          <div>
            {{ $formatMoney(item.product.price) }}
          </div>
          <div>Quantity: {{ item.quantity }}</div>
          <div>
            Price:
            {{ $formatMoney(item.price) }}
          </div>
        </v-card-text>
      </div>
      <v-card-actions>
        <v-btn
          v-if="orderItem.status !== 'SUCCESS'"
          color="teal"
          text
          @click="pay"
          ><v-icon class="mr-2">mdi-credit-card-outline</v-icon> Pay Now</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'OrderItem',
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
  head: {
    script: [
      {
        src: 'https://app.sandbox.midtrans.com/snap/snap.js',
        'data-client-key': 'SB-Mid-client-JLNwUU1q9S-ilzd2',
      },
    ],
  },
  methods: {
    pay() {
      window.snap.pay(this.orderItem.transaction_token, {
        onSuccess() {
          history.back()
        },
        onPending() {
          history.back()
        },
        onError() {
          history.back()
        },
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