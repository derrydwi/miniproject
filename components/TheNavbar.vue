<template>
  <v-app-bar app clipped-left height="70" class="el">
    <v-app-bar-nav-icon @click="$emit('drawer-toggle')" />
    <svg
      width="44"
      height="51"
      viewBox="0 0 44 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect y="2.90918" width="44" height="44" rx="5.73913" fill="#673AB7" />
      <path
        d="M19.1443 17.5627C18.7897 16.9095 18.2765 16.4149 17.6046 16.079C16.9514 15.7244 16.1769 15.5471 15.2811 15.5471C13.7321 15.5471 12.491 16.0603 11.5578 17.0868C10.6247 18.0946 10.1581 19.4476 10.1581 21.146C10.1581 22.9563 10.6434 24.3747 11.6138 25.4011C12.603 26.4089 13.956 26.9128 15.673 26.9128C16.8488 26.9128 17.8379 26.6142 18.6404 26.017C19.4616 25.4198 20.0588 24.5613 20.4321 23.4415H14.3573V19.9142H24.7712V24.3653C24.4166 25.5597 23.8101 26.6702 22.9516 27.6967C22.1117 28.7231 21.0386 29.5536 19.7322 30.1882C18.4258 30.8227 16.9514 31.14 15.3091 31.14C13.3682 31.14 11.6325 30.7201 10.1021 29.8802C8.59044 29.0217 7.40534 27.8366 6.54685 26.3249C5.70701 24.8132 5.2871 23.0869 5.2871 21.146C5.2871 19.205 5.70701 17.4787 6.54685 15.967C7.40534 14.4366 8.59044 13.2515 10.1021 12.4117C11.6138 11.5532 13.3402 11.124 15.2811 11.124C17.6326 11.124 19.6109 11.6932 21.2159 12.8316C22.8396 13.9701 23.9127 15.5471 24.4353 17.5627H19.1443Z"
        fill="white"
      />
      <path
        d="M28.2364 19.9016C30.308 19.9016 32.1183 20.3122 33.6673 21.1334C35.2163 21.9545 36.4107 23.1117 37.2506 24.6047C38.1091 26.0791 38.5383 27.7867 38.5383 29.7277C38.5383 31.65 38.1091 33.3576 37.2506 34.8506C36.4107 36.3437 35.207 37.5008 33.6393 38.322C32.0903 39.1431 30.2893 39.5537 28.2364 39.5537H20.8738V19.9016H28.2364ZM27.9284 35.4105C29.7387 35.4105 31.1478 34.916 32.1556 33.9268C33.1634 32.9377 33.6673 31.538 33.6673 29.7277C33.6673 27.9174 33.1634 26.5083 32.1556 25.5005C31.1478 24.4927 29.7387 23.9888 27.9284 23.9888H25.6609V35.4105H27.9284Z"
        fill="white"
      />
    </svg>
    <v-toolbar-title class="ms-3 text-h6 font-weight-bold"
      >Good Desire</v-toolbar-title
    >
    <v-spacer />
    <v-btn icon @click="isDark = !isDark">
      <v-icon v-text="darkModeIcon" />
    </v-btn>
    <v-badge
      v-if="$auth.loggedIn && cart && cart.length > 0"
      :content="cart.length"
      overlap
    >
      <v-btn icon :to="{ name: 'cart' }"><v-icon>mdi-cart</v-icon></v-btn>
    </v-badge>
    <v-btn v-else-if="$auth.loggedIn" icon :to="{ name: 'cart' }"
      ><v-icon>mdi-cart</v-icon></v-btn
    >
    <v-text-field
      v-if="isSearch || searchMode"
      v-model="query"
      label="Search"
      prepend-inner-icon="mdi-magnify"
      hide-details="auto"
      class="ms-2 me-4"
      style="max-width: 200px"
      color="accent"
      autofocus
      single-line
      clearable
      @blur="!query && searchToggle()"
      @keyup.enter="search"
    ></v-text-field>
    <v-btn v-else icon @click="searchToggle"
      ><v-icon>mdi-magnify</v-icon></v-btn
    >
    <v-btn
      v-if="!$auth.loggedIn"
      color="primary"
      class="ms-4"
      @click="$auth.loginWith('auth0', { params: { prompt: 'login' } })"
      >Login</v-btn
    >
  </v-app-bar>
</template>

<script>
import { getCart, subscriptionCart } from '~/graphql/cart/queries'

export default {
  name: 'TheNavbar',
  apollo: {
    cart: {
      query: getCart,
      subscribeToMore: {
        document: subscriptionCart,
        updateQuery: (_, { subscriptionData }) => {
          return { cart: subscriptionData.data.cart }
        },
      },
      skip() {
        return !this.$auth.loggedIn
      },
    },
  },
  data() {
    return {
      searchMode: false,
      queryInput: '',
    }
  },
  computed: {
    darkModeIcon() {
      return this.isDark ? 'mdi-brightness-2' : 'mdi-brightness-7'
    },
    isDark: {
      get() {
        return this.$store.getters['theme/getIsDark']
      },
      set(value) {
        this.$store.dispatch('theme/saveIsDark', value)
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      },
    },
    isSearch: {
      get() {
        return this.$route.query.q || this.searchMode
      },
      set(value) {
        this.searchMode = value
      },
    },
    query: {
      get() {
        return this.$route.query.q
      },
      set(value) {
        this.queryInput = value
      },
    },
  },
  methods: {
    searchToggle() {
      this.isSearch = !this.isSearch
    },
    search() {
      this.$router.push({
        name: 'search',
        query: {
          q: this.queryInput,
        },
      })
    },
  },
}
</script>
