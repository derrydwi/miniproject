<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div v-if="$apollo.loading">Loading...</div>
      <div v-else>
        <div>
          <p>Order</p>
          <div>
            <v-card
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
                {{
                  orderItem.shipping_price
                    .toLocaleString('id-id', {
                      style: 'currency',
                      currency: 'IDR',
                    })
                    .slice(0, -3)
                }}
              </div>
              <div>
                Total:
                {{
                  orderItem.total_price
                    .toLocaleString('id-id', {
                      style: 'currency',
                      currency: 'IDR',
                    })
                    .slice(0, -3)
                }}
              </div>
              <div>Telah Dibayar: {{ orderItem.is_paid }}</div>
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
                    {{
                      item.product.price
                        .toLocaleString('id-id', {
                          style: 'currency',
                          currency: 'IDR',
                        })
                        .slice(0, -3)
                    }}
                  </div>
                  <div>Quantity: {{ item.quantity }}</div>
                  <div>
                    Price:
                    {{
                      item.price
                        .toLocaleString('id-id', {
                          style: 'currency',
                          currency: 'IDR',
                        })
                        .slice(0, -3)
                    }}
                  </div>
                </v-card-text>
              </div>
              <v-card-actions>
                <v-btn
                  v-if="!orderItem.is_paid"
                  color="teal"
                  text
                  @click="pay(orderItem.id)"
                  ><v-icon class="mr-2">mdi-credit-card-outline</v-icon> Pay
                  Now</v-btn
                >
              </v-card-actions>
            </v-card>
          </div>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { getOrder, subscriptionOrder, updatePayOrder } from '~/graphql/queries'

export default {
  name: 'OrderPage',
  middleware: 'auth',
  apollo: {
    order: {
      query: getOrder,
    },
    $subscribe: {
      order: {
        query: subscriptionOrder,
        result({ data }) {
          this.order = data.order
        },
      },
    },
  },
  methods: {
    pay(orderId) {
      this.$apollo
        .mutate({
          mutation: updatePayOrder,
          variables: {
            id: orderId,
            is_paid: true,
          },
        })
        .then((result) => {
          // eslint-disable-next-line no-console
          console.log('result pembayaran', result)
          // alert('Berhasil dibayar')
          this.$swal({
            toast: true,
            text: 'Pay Success',
            icon: 'success',
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            position: 'top-end',
          })
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log('error', error)
        })
    },
  },
}
</script>