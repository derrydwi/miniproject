<template>
  <v-container>
    <p>Profile Page</p>
    <BaseLoading v-if="$apollo.loading" />
    <div v-else>
      <img :src="user.picture" class="rounded-circle" />
      <p>Hi, {{ user.username }}!</p>
      <p>Email: {{ user.fullname }}</p>
    </div>
  </v-container>
</template>

<script>
import { getUser } from '~/graphql/user/queries'

export default {
  name: 'ProfilePage',
  middleware: 'auth',
  apollo: {
    user: {
      query: getUser,
      variables() {
        return { id: this.$auth.user.sub }
      },
    },
  },
}
</script>
