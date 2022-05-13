<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in $auth.loggedIn ? itemsLoggedIn : itemsNotLoggedIn"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-text-field
        v-if="isSearch"
        v-model="query"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        hide-details="auto"
        style="max-width: 200px"
        color="teal"
        single-line
        clearable
        @blur="!query && searchToggle()"
        @keyup.enter="search"
      ></v-text-field>
      <v-btn v-else icon @click="searchToggle"
        ><v-icon>mdi-magnify</v-icon></v-btn
      >
      <v-btn icon @click="isDark = !isDark">
        <v-icon size="20">mdi-brightness-7</v-icon>
      </v-btn>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      itemsNotLoggedIn: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/',
        },
        {
          icon: 'mdi-note-text',
          title: 'Terms & Conditions',
          to: '/terms',
        },
        {
          icon: 'mdi-information',
          title: 'About Us',
          to: '/about',
        },
      ],
      itemsLoggedIn: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/',
        },
        {
          icon: 'mdi-cart',
          title: 'Cart',
          to: '/cart',
        },
        {
          icon: 'mdi-shopping',
          title: 'Order',
          to: '/order',
        },
        {
          icon: 'mdi-account',
          title: 'Profile',
          to: '/profile',
        },
        {
          icon: 'mdi-note-text',
          title: 'Terms & Conditions',
          to: '/terms',
        },
        {
          icon: 'mdi-information',
          title: 'About Us',
          to: '/about',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Good Desire',
      isSearch: true,
      query: '',
    }
  },
  computed: {
    isDark: {
      get() {
        return this.$store.getters['theme/getIsDark']
      },
      set() {
        this.$store.dispatch('theme/saveIsDark')
      },
    },
  },
  watch: {
    isDark: {
      handler(value) {
        this.$vuetify.theme.dark = value
      },
      immediate: true,
      deep: true,
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
          q: this.query,
        },
      })
    },
  },
}
</script>