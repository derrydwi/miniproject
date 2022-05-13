<template>
  <BaseLoading v-if="$apollo.loading" />
  <v-container v-else>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <p>Saved</p>
        <SavedItem
          v-for="savedItem in saved"
          :key="savedItem.id"
          :saved-item="savedItem"
        />
      </v-col>
    </v-row>
  </v-container>
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
