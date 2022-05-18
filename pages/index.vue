<template>
  <div>
    <HomeCarousel />
    <v-container :class="$vuetify.breakpoint.mdAndDown && 'pa-0'">
      <div v-for="category in categories" :key="category">
        <ProductSlider :category="category" />
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'ProductPage',
  head: {
    title: 'Home',
  },
  computed: {
    categories() {
      return this.$store.getters['category/getCategories']
    },
  },
}
</script>
