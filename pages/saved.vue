<template>
  <BaseLoading v-if="$apollo.loading" />
  <v-container v-else>
    <h2 class="my-2 mb-7 text-capitalize text-center">Saved</h2>
    <v-row v-if="saved.length" dense>
      <v-col cols="12" md="9" class="mx-auto">
        <v-row class="my-3">
          <template v-for="savedItem in saved">
            <v-fade-transition :key="savedItem.id">
              <SavedItem :saved-item="savedItem" />
            </v-fade-transition>
          </template>
        </v-row>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12" md="6" class="mx-auto mt-4">
        <v-alert type="info" color="accent" text>Saved is empty</v-alert>
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
