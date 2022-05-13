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
                Alamat: {{ orderItem.alamat }}, {{ orderItem.kota }},
                {{ orderItem.provinsi }}
              </div>
              <div>No Hp: {{ orderItem.no_hp }}</div>
              <div>Ongkos Kirim: {{ orderItem.shipping_price }}</div>
              <div>Total: {{ orderItem.total_price }}</div>
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
                <v-card-actions>
                  <v-btn color="teal" text>Add To Cart</v-btn>
                </v-card-actions>
              </div>
            </v-card>
          </div>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { getOrder } from '~/graphql/queries'

export default {
  name: 'OrderPage',
  middleware: 'auth',
  apollo: {
    order: {
      query: getOrder,
    },
  },
}
</script>
