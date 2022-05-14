<template>
  <v-row justify="space-around">
    <v-col cols="12" md="11">
      <v-skeleton-loader
        class="mx-auto mt-4 mb-6"
        max-width="400"
        type="text"
      ></v-skeleton-loader>
      <v-skeleton-loader
        class="mx-auto mb-6"
        max-width="300"
        type="text"
      ></v-skeleton-loader>
      <v-skeleton-loader
        class="mx-auto mb-6"
        max-width="200"
        type="text"
      ></v-skeleton-loader>
    </v-col>
    <v-col cols="11" md="7">
      <div>
        <v-skeleton-loader
          class="mx-auto mb-6"
          type="image@2"
        ></v-skeleton-loader>
        <v-skeleton-loader
          class="mx-auto mb-6"
          type="sentences, paragraph"
        ></v-skeleton-loader>
        <v-skeleton-loader
          class="mb-6"
          width="200"
          type="heading"
        ></v-skeleton-loader>
        <v-skeleton-loader
          class="mb-6"
          width="50"
          type="text"
        ></v-skeleton-loader>
        <v-skeleton-loader
          class="mb-6"
          width="60"
          type="text"
        ></v-skeleton-loader>
      </div>
      <v-skeleton-loader class="mb-10" type="chip"></v-skeleton-loader>
      <v-skeleton-loader width="200" type="text"></v-skeleton-loader>
      <div class="d-flex align-center">
        <v-skeleton-loader class="mb-2 me-4" type="avatar"></v-skeleton-loader>
        <v-skeleton-loader width="200" type="text"></v-skeleton-loader>
      </div>
      <v-skeleton-loader class="mb-6" type="sentences"></v-skeleton-loader>
    </v-col>
    <v-col cols="11" md="3">
      <div
        :style="$vuetify.breakpoint.mdAndUp && 'position: sticky; top: 25vh'"
      >
        <v-skeleton-loader class="mb-6" type="image"></v-skeleton-loader>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'DetailLoading',
}
</script>
