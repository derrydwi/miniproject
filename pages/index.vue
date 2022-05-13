<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-btn @click="$auth.loginWith('auth0', { params: { prompt: 'login' } })"
        >Login</v-btn
      >
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>
