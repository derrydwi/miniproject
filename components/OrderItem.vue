<template>
  <div>
    <!-- <v-card class="mx-auto my-4 el" max-width="300">
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
    </v-card> -->
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
  methods: {
    pay() {
      if (this.orderItem.transaction_token) {
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
        return
      }
      const body = {
        transaction_details: {
          order_id: this.orderItem.id,
          gross_amount: this.orderItem.total_price,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          first_name: this.$auth.user.nickname,
          email: this.$auth.user.email,
          phone: this.orderItem.no_hp,
          shipping_address: {
            first_name: this.$auth.user.nickname,
            email: this.$auth.user.email,
            phone: this.orderItem.no_hp,
            address: this.orderItem.alamat,
          },
        },
      }
      this.$axios
        .post('/api/pay', body)
        .then((result) => {
          // eslint-disable-next-line no-console
          console.log(result.data)
          window.snap.pay(result.data.transactionToken, {
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
        })
        .catch((error) => {
          alert(`Can't make payment. ${error.message}`)
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