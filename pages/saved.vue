<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <BaseLoading v-if="$apollo.loading" />
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
