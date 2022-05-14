<template>
  <div>
    <HomeCarousel />
    <v-container :class="$vuetify.breakpoint.mdAndDown && 'pa-0'">
      <div v-for="category in categoryName" :key="category">
        <ProductSlider :category="category" />
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'ProductPage',
  data() {
    return {
      categoryName: ['electronic', 'fashion', 'hobby', 'jewelry'],
    }
  },
  head: {
    title: 'Home',
  },
}
</script>
