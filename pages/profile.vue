<template>
  <div>
    <p>Profile Page</p>
    <div v-if="$apollo.loading">Loading...</div>
    <div v-else>
      <img :src="user.picture" />
      <p>Hi {{ user.username }}!</p>
      <p>Email {{ user.fullname }}!</p>
    </div>
  </div>
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
