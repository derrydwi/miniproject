<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div v-if="$apollo.loading">Loading...</div>
      <div v-else>
        <div>
          <p>Order</p>
          <div>
            <OrderItem
              v-for="(orderItem, index) in order"
              :key="orderItem.id"
              :index="index"
              :order-item="orderItem"
            />
            <!-- <v-card
              v-for="orderItem in order"
              :key="orderItem.id"
              class="mx-auto my-4"
              max-width="300"
            >
              <div>
                {{
                  new Date(orderItem.created_at).toUTCString().substring(0, 22)
                }}
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
                  v-if="orderItem.status !== 'settlement'"
                  color="teal"
                  text
                  @click="pay(orderItem.id)"
                  ><v-icon class="mr-2">mdi-credit-card-outline</v-icon> Pay
                  Now</v-btn
                >
              </v-card-actions>
            </v-card> -->
          </div>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import {
  getOrder,
  subscriptionOrder,
  // updatePayOrder,
} from '~/graphql/order/queries'

export default {
  name: 'OrderPage',
  middleware: 'auth',
  // head: {
  //   script: [
  //     {
  //       src: 'https://app.sandbox.midtrans.com/snap/snap.js',
  //       'data-client-key': 'SB-Mid-client-JLNwUU1q9S-ilzd2',
  //     },
  //   ],
  // },
  apollo: {
    order: {
      query: getOrder,
      subscribeToMore: {
        document: subscriptionOrder,
        updateQuery: (_, { subscriptionData }) => {
          return { order: subscriptionData.data.order }
        },
      },
    },
  },
  // methods: {
  //   pay(orderId) {
  //     const body = {
  //       transaction_details: {
  //         order_id: orderId,
  //         gross_amount: 5000,
  //       },
  //       credit_card: {
  //         secure: true,
  //       },
  //       item_details: [
  //         {
  //           id: 'ITEM1',
  //           price: 5000,
  //           quantity: 1,
  //           name: 'Midtrans Bear',
  //           brand: 'Midtrans',
  //           category: 'Toys',
  //           merchant_name: 'Midtrans',
  //         },
  //       ],
  //       customer_details: {
  //         first_name: 'Johnn',
  //         last_name: 'Watsonn',
  //         email: 'test@example.com',
  //         phone: '+628123456',
  //         billing_address: {
  //           first_name: 'John',
  //           last_name: 'Watson',
  //           email: 'test@example.com',
  //           phone: '081 2233 44-55',
  //           address: 'Sudirman',
  //           city: 'Jakarta',
  //           postal_code: '12190',
  //           country_code: 'IDN',
  //         },
  //         shipping_address: {
  //           first_name: 'John',
  //           last_name: 'Watson',
  //           email: 'test@example.com',
  //           phone: '0 8128-75 7-9338',
  //           address: 'Sudirman',
  //           city: 'Jakarta',
  //           postal_code: '12190',
  //           country_code: 'IDN',
  //         },
  //       },
  //     }
  //     this.$axios
  //       .post('/api/pay', body)
  //       .then((result) => {
  //         // eslint-disable-next-line no-console
  //         console.log(result.data)
  //         window.snap.pay(result.data.transactionToken, {
  //           onSuccess(result) {
  //             // this.$showAlert({ text: 'Payment Success', icon: 'success' })
  //             alert('Payment Success')
  //             // eslint-disable-next-line no-console
  //             console.log(result)
  //           },
  //           onPending(result) {
  //             // this.$showAlert({ text: 'Wating your payment', icon: 'info' })
  //             alert('Wating your payment')
  //             // eslint-disable-next-line no-console
  //             console.log(result)
  //           },
  //           onError(result) {
  //             // this.$showAlert({ text: 'Payment Failed', icon: 'error' })
  //             alert('Payment Failed')
  //             // eslint-disable-next-line no-console
  //             console.log(result)
  //           },
  //           onClose() {
  //             // this.$showAlert({
  //             //   text: 'You closed the popup without finishing the payment',
  //             //   icon: 'info',
  //             // })
  //             alert('You closed the popup without finishing the payment')
  //           },
  //         })
  //       })
  //       .catch((error) => {
  //         // this.$showAlert({
  //         //   text: `Can't make payment. ${error.message}`,
  //         //   icon: 'error',
  //         // })
  //         alert(`Can't make payment. ${error.message}`)
  //       })
  //   },
  // },
}
</script>