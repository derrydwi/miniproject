<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div v-if="$apollo.loading">Loading...</div>
      <div v-else>
        <div>
          <p>Saved</p>
          <SavedItem
            v-for="savedItem in saved"
            :key="savedItem.id"
            :saved-item="savedItem"
          />
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { getSaved, subscriptionSaved } from '~/graphql/saved/queries'

export default {
  name: 'SavedPage',
  middleware: 'auth',
  apollo: {
    saved: {
      query: getSaved,
      subscribeToMore: {
        document: subscriptionSaved,
        updateQuery: (_, { subscriptionData }) => {
          return { saved: subscriptionData.data.saved }
        },
      },
    },
  },
}
</script>