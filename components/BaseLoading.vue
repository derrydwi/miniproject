<template>
  <v-card height="70vh" elevation="0" outlined color="transparent">
    <v-layout align-center fill-height>
      <v-progress-circular
        indeterminate
        color="primary"
        class="mx-auto"
        :size="50"
      ></v-progress-circular>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: 'BaseLoading',
}
</script>
