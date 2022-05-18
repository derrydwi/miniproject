<template>
  <v-app dark>
    <v-navigation-drawer v-model="isDrawer" app clipped>
      <SideBar />
    </v-navigation-drawer>
    <TheNavbar @drawer-toggle="drawerToggle" />
    <v-main>
      <Nuxt />
      <TheFooter />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      isDrawer: false,
    }
  },
  methods: {
    drawerToggle() {
      this.isDrawer = !this.isDrawer
    },
  },
}
</script>
