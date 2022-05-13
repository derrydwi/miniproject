<template>
  <v-footer>
    <v-row justify="center" class="text-center" no-gutters>
      <span>&copy; Good Desire {{ year }}. All Rights Reserved.</span>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: 'TheFooter',
  computed: {
    year() {
      return new Date().getFullYear()
    },
  },
}
</script>
