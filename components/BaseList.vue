<template>
  <div>
    <v-list v-if="$auth.loggedIn && !$apollo.loading">
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="user.picture"></v-img>
        </v-list-item-avatar>
      </v-list-item>
      <v-list-group color="undefined">
        <template #activator>
          <v-list-item-content>
            <v-list-item-title class="text-h6">{{
              user.username
            }}</v-list-item-title>
            <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </template>
        <v-list-item :to="{ name: 'profile' }">
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="$auth.logout()">
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
    <v-divider></v-divider>
    <v-list>
      <div
        v-for="(item, index) in $auth.loggedIn
          ? itemsLoggedIn
          : itemsNotLoggedIn"
        :key="index"
      >
        <v-list-group
          v-if="index === 1"
          prepend-icon="mdi-view-dashboard"
          color="undefined"
          no-action
        >
          <template #activator>
            <v-list-item-title class="text-capitalize"
              >Category</v-list-item-title
            >
          </template>
          <v-list-item
            v-for="category in categoryName"
            :key="category"
            :to="{ name: 'category-name', params: { name: category } }"
          >
            <v-list-item-content>
              <v-list-item-title class="text-capitalize">
                {{ category }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item v-else :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-list>
  </div>
</template>

<script>
import { getUser } from '~/graphql/user/queries'

export default {
  name: 'BaseList',
  apollo: {
    user: {
      query: getUser,
      variables() {
        return { id: this.$auth.user.sub }
      },
      skip() {
        return !this.$auth.loggedIn
      },
    },
  },
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
          icon: 'mdi-bookmark',
          title: 'Saved',
          to: '/saved',
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
      categoryName: ['electronic', 'fashion', 'hobby', 'jewelry'],
    }
  },
}
</script>
