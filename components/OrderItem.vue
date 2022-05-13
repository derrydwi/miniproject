<template>
  <v-card class="mx-auto pa-4 mb-4" width="800" outlined>
    <v-container>
      <v-row>
        <v-col cols="6" align="left" class="px-md-0">
          <span class="me-4" v-text="$dateTime(orderItem.created_at)" />
        </v-col>
        <v-col cols="6" align="right" class="px-md-0">
          <span v-text="$inv(orderItem.created_at, orderItem.id)" />
          <v-chip
            :color="statusColor"
            label
            small
            class="ms-4 text-capitalize"
            v-text="orderItem.status"
          />
        </v-col>
      </v-row>
    </v-container>
    <v-list-item
      v-for="item in orderItem.order_items"
      :key="item.id"
      class="mb-4"
    >
      <v-list-item-avatar tile size="150">
        <v-img :src="item.product.image_url" contain>
          <template #placeholder>
            <v-skeleton-loader
              class="mx-auto"
              type="image@2"
            ></v-skeleton-loader>
          </template>
        </v-img>
      </v-list-item-avatar>
      <v-list-item-content class="ms-4">
        <v-list-item-title
          class="text-h6 mb-4 pointer"
          @click="
            $router.push({
              name: 'product-id',
              params: { id: item.product.id },
            })
          "
          v-text="item.product.name"
        />
        <v-list-item-subtitle class="d-flex justify-space-between">
          <span>
            {{ item.quantity }} item x {{ $currency(item.product.price) }}
          </span>
          <span
            class="font-weight-bold"
            v-text="$currency(item.product.price * item.quantity)"
          />
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-card-actions>
      <v-spacer />
      <span class="text-md-body-1 font-weight-bold me-4">Total Bill : </span>
      <span
        class="text-md-body-1 font-weight-bold accent--text"
        v-text="$currency(orderItem.total_price)"
      />
    </v-card-actions>
    <v-card-actions class="justify-end">
      <v-dialog v-model="dialog" width="600px">
        <template #activator="{ on, attrs }">
          <v-btn color="accent" dark v-bind="attrs" text v-on="on">
            Detail
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5 mb-2">Order Detail</span>
          </v-card-title>
          <v-card-text>
            <p class="text-md-body-1 font-weight-bold">Status</p>
            <v-timeline class="mb-4">
              <v-timeline-item small>
                <template #opposite>
                  <span
                    class="text-start"
                    v-text="$dateTime(orderItem.created_at)"
                  />
                </template>
                <div class="py-4 font-weight-bold accent--text">
                  Order Received
                </div>
              </v-timeline-item>
              <v-timeline-item v-if="orderItem.status !== 'PENDING'" small>
                <div class="py-4 font-weight-bold text-right accent--text">
                  {{
                    orderItem.status === 'SUCCESS'
                      ? 'Payment Received'
                      : 'Payment Canceled'
                  }}
                </div>
                <template #opposite>
                  <span v-text="$dateTime(orderItem.updated_at)" />
                </template>
              </v-timeline-item>
            </v-timeline>
            <v-divider class="mb-4" />
            <p class="text-md-body-1 font-weight-bold">Item Detail</p>
            <div class="d-flex justify-space-between mb-4">
              <span>Total Item</span>
              <span class="text-right">{{ totalItem }} item</span>
            </div>
            <div class="d-flex justify-space-between mb-4">
              <span>Total Weight</span>
              <span class="text-right">{{ totalWeight }} g</span>
            </div>
            <v-divider class="mb-4" />
            <p class="text-md-body-1 font-weight-bold">Shipping Detail</p>
            <div class="d-flex justify-space-between mb-4">
              <span>Name</span>
              <span class="text-right" v-text="orderItem.nama" />
            </div>
            <div class="d-flex justify-space-between mb-4">
              <span>Address</span>
              <span class="text-right ps-8" v-text="orderItem.alamat" />
            </div>
            <div class="d-flex justify-space-between mb-4">
              <span>Phone Number</span>
              <span class="text-right" v-text="orderItem.no_hp" />
            </div>
            <v-divider class="mb-4" />
            <p class="text-md-body-1 font-weight-bold">Summary</p>
            <div class="d-flex justify-space-between mb-4">
              <span>Shipping Price</span>
              <span
                class="text-right"
                v-text="$currency(orderItem.shipping_price)"
              />
            </div>
            <div class="d-flex justify-space-between mb-4">
              <span>Total Price</span>
              <span class="text-right" v-text="$currency(totalItemPrice)" />
            </div>
            <v-divider class="mb-4" />
            <div class="d-flex justify-space-between">
              <span class="text-md-h6 font-weight-bold accent--text"
                >Total Bill</span
              >
              <span
                class="text-md-h6 font-weight-bold accent--text text-right"
                v-text="$currency(orderItem.total_price)"
              />
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="accent" text class="mb-4" @click="dialog = false"
              >Close</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-btn
        v-if="orderItem.status !== 'SUCCESS'"
        class="ms-4"
        color="accent"
        depressed
        @click="pay"
        ><v-icon class="mr-2">mdi-credit-card-outline</v-icon>Pay Now</v-btn
      >
    </v-card-actions>
  </v-card>
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
  },
  data() {
    return {
      dialog: false,
    }
  },
  head() {
    return {
      script: [
        {
          src: 'https://app.sandbox.midtrans.com/snap/snap.js',
          'data-client-key': this.$config.midtransClientKey,
        },
      ],
    }
  },
  computed: {
    statusColor() {
      switch (this.orderItem.status) {
        case 'PENDING':
          return 'secondary'
        case 'SUCCESS':
          return 'success'
        case 'CANCEL':
          return 'error'
        default:
          return 'secondary'
      }
    },
    totalItem() {
      const itemQuantity = this.orderItem.order_items.map(
        (item) => item.quantity
      )
      const totalItem = itemQuantity.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        0
      )
      return totalItem
    },
    totalItemPrice() {
      const pricePerItem = this.orderItem.order_items.map(
        (item) => item.product.price * item.quantity
      )
      const totalPrice = pricePerItem.reduce(
        (prev, current) => prev + current,
        0
      )
      return totalPrice
    },
    totalWeight() {
      const weightPerItem = this.orderItem.order_items.map(
        (item) => item.product.weight * item.quantity
      )
      const totalWeight = weightPerItem.reduce(
        (prev, current) => prev + current,
        0
      )
      return totalWeight
    },
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
