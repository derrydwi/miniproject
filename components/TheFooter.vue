<template>
  <v-footer padless class="mt-4">
    <v-container>
      <v-card color="transparent" elevation="0" tile>
        <v-row justify="center" class="text-center my-4" no-gutters>
          <v-card-text class="py-2">
            <v-btn
              v-for="(contact, index) in contacts"
              :key="index"
              :href="contact.to"
              :aria-label="contact.name"
              target="_blank"
              icon
              class="pa-8"
            >
              <v-icon color="accent" size="30" v-text="contact.icon" />
            </v-btn>
          </v-card-text>
          <v-card-text class="py-2">
            <v-row justify="center" class="text-center" no-gutters>
              <v-col cols="12" md="8">
                <p style="line-height: 1.8">
                  Good Desire is a e-commerce platform in Southeast Asia to
                  offer fun, free, and trusted online buying and selling
                  transactions. Join to Good Desire and start shopping now!
                </p>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-text class="py-2">
            <span>&copy; Good Desire {{ year }}. All Rights Reserved.</span>
          </v-card-text>
        </v-row>
      </v-card>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: 'TheFooter',
  data() {
    return {
      contacts: [
        {
          name: 'email',
          to: 'mailto:gooddesire@gmail.com',
          icon: 'mdi-email-outline',
          text: 'gooddesire@gmail.com',
        },
        {
          name: 'whatsapp',
          to: 'https://wa.me/+6281396521265',
          icon: 'mdi-whatsapp',
          text: '+6281396521265',
        },
        {
          name: 'instagram',
          to: 'https://instagram.com/gooddesire',
          icon: 'mdi-instagram',
          text: '@gooddesire',
        },
      ],
    }
  },
  computed: {
    year() {
      return new Date().getFullYear()
    },
  },
}
</script>
