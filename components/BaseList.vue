<template>
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
</template>

<script>
export default {
  name: 'BaseList',
  data() {
    return {
      itemsNotLoggedIn: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/',
        },
        {
          icon: 'mdi-view-grid',
          title: 'Category',
          to: '/category',
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
          icon: 'mdi-view-grid',
          title: 'Category',
          to: '/category',
        },
        {
          icon: 'mdi-bookmark',
          title: 'Saved',
          to: '/saved',
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
    }
  },
}
</script>
