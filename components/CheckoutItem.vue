<template>
  <v-card class="mx-auto pa-4" width="600" outlined>
    <v-list-item>
      <v-list-item-avatar tile size="150">
        <v-img contain :src="orderItem.product.image_url" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="text-h6 mb-4">
          {{ orderItem.product.name }}
        </v-list-item-title>
        <v-list-item-subtitle>
          <p>{{ orderItem.quantity }} item ({{ weightPerItem }})</p>
          <p class="font-weight-bold">
            {{ $formatMoney(orderItem.product.price) }}
          </p>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-card-actions>
      <span class="text-md-body-1 font-weight-bold">Subtotal</span>
      <v-spacer />
      <span class="text-md-body-1 font-weight-bold accent--text">{{
        pricePerItem
      }}</span>
    </v-card-actions>
  </v-card>
  <!-- <v-card-actions class="justify-end">
      <span class="text-xs text-md-body-2"
        >Stock: {{ orderItem.product.stock }}</span
      >
      <v-spacer />
      <v-btn color="grey" icon class="text-right" @click.prevent="deleteItem"
        ><v-icon>mdi-delete-outline</v-icon></v-btn
      >
      <v-btn
        color="primary"
        icon
        :disabled="quantity === 1 || quantity > orderItem.product.stock"
        @click.prevent="changeStock('decrement')"
        ><v-icon>mdi-minus</v-icon></v-btn
      >
      <v-text-field
        v-model.number="quantity"
        type="number"
        color="primary"
        class="input-quantity centered-input mt-n2"
        style="max-width: 120px"
        dense
        hide-details="auto"
        :rules="[numberRule]"
        @change="changeStock('input')"
      ></v-text-field>
      <v-btn
        color="primary"
        icon
        :disabled="quantity >= orderItem.product.stock"
        @click.prevent="changeStock('increment')"
        ><v-icon>mdi-plus</v-icon></v-btn
      >
    </v-card-actions> -->
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
    index: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      quantity: 1,
    }
  },
  computed: {
    weightPerItem() {
      return `${this.orderItem.quantity * this.orderItem.product.weight} g`
    },
    pricePerItem() {
      return this.$formatMoney(
        this.orderItem.quantity * this.orderItem.product.price
      )
    },
  },
  mounted() {
    this.quantity = this.orderItem.quantity
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