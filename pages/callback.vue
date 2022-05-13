<template>
  <v-row class="fill-height" justify="center" align="center">
    <v-progress-circular
      :size="25"
      color="accent"
      class="me-4"
      indeterminate
    ></v-progress-circular>
    <h3 class="text-center font-weight-regular">Signing in...</h3>
  </v-row>
</template>

<script>
export default {
  name: 'CallbackPage',
  head: {
    title: 'Signing in',
  },
}
</script>
