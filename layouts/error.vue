<template>
  <v-app dark>
    <v-container class="text-center my-auto">
      <div v-if="error.statusCode === 404">
        <v-icon large class="mt-n3 mr-3">mdi-alert</v-icon
        ><span class="text-h5 text--primary" v-text="pageNotFound" />
        <p class="mt-6">The page you were looking for does not exist.</p>
      </div>
      <div v-else class="text-h5 mb-6" v-text="otherError" />
      <v-btn
        text
        outlined
        color="accent"
        @click="$router.push({ name: 'index' })"
      >
        Go to Home Page
      </v-btn>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>
