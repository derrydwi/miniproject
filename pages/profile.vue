<template>
  <BaseLoading v-if="$apollo.loading" />
  <v-container v-else>
    <h2 class="mt-2 mb-5 text-center">Profile</h2>
    <v-card class="mx-auto mb-3 el" width="600">
      <v-img
        height="200"
        src="https://images.unsplash.com/photo-1557682250-33bd709cbe85?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=829&q=80"
      />
      <div class="d-flex justify-space-between mx-6">
        <v-img
          :src="user.picture"
          class="rounded-circle mb-4 mt-n13"
          max-width="100"
        />
        <v-dialog v-model="dialog" width="600px" persistent>
          <template #activator="{ on, attrs }">
            <v-btn
              color="accent"
              dark
              v-bind="attrs"
              outlined
              class="mt-4"
              v-on="on"
            >
              Edit Profile
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5 mb-4">Edit Profile</span>
            </v-card-title>
            <v-card-text>
              <v-text-field
                v-model="name"
                label="Name"
                hide-details="auto"
                color="accent"
                class="mx-auto"
                outlined
                @keyup.enter="updateName"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                text
                color="accent"
                class="mb-4 me-2"
                min-height="40"
                @click="dialog = false"
                >Close</v-btn
              >
              <v-btn
                depressed
                color="accent"
                class="mb-4 me-2"
                min-height="40"
                :disabled="!newName"
                @click="updateName"
                >Save</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <div class="mx-6">
        <p class="text-h6 mb-2 font-weight-bold">{{ user.username }}</p>
        <p class="">{{ user.email }}</p>
      </div>
      <v-card-subtitle class="my-0 pt-2 mx-2">
        <v-icon small class="me-2">mdi-calendar-blank</v-icon>
        <span class="mt-2 mb-2">Joined {{ $year(user.created_at) }}</span>
      </v-card-subtitle>
    </v-card>
  </v-container>
</template>

<script>
import {
  getUser,
  subscriptionUser,
  updateUserName,
} from '~/graphql/user/queries'

export default {
  name: 'ProfilePage',
  middleware: 'auth',
  apollo: {
    user: {
      query: getUser,
      variables() {
        return { id: this.$auth.user.sub }
      },
      subscribeToMore: {
        document: subscriptionUser,
        variables() {
          return { id: this.$auth.user.sub }
        },
        updateQuery: (_, { subscriptionData }) => {
          return { user: subscriptionData.data.user }
        },
      },
    },
  },
  data() {
    return {
      dialog: false,
      newName: '',
    }
  },
  computed: {
    name: {
      get() {
        return this.user.username
      },
      set(value) {
        this.newName = value
      },
    },
  },
  methods: {
    updateName() {
      if (!this.newName) return
      this.$apollo
        .mutate({
          mutation: updateUserName,
          variables: {
            id: this.$auth.user.sub,
            username: this.newName,
          },
        })
        .then(() => {
          this.$showAlert({ text: 'Name Updated', icon: 'success' })
        })
        .catch((error) => {
          this.$showAlert({
            text: `Can't update name. ${error.message}`,
            icon: 'error',
          })
        })
      this.dialog = false
    },
  },
}
</script>
