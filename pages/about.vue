<template>
  <v-container>
    <h2 class="my-2 mb-7 text-capitalize text-center">About Us</h2>
    <div class="text-center">
      <svg
        width="106"
        height="122"
        viewBox="0 0 106 122"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          y="7.00781"
          width="106"
          height="106"
          rx="13.8261"
          fill="#673AB7"
        />
        <path
          d="M46.1206 41.6283C45.2664 40.0546 44.03 38.8632 42.4114 38.0539C40.8377 37.1996 38.9719 36.7725 36.8138 36.7725C33.082 36.7725 30.0921 38.0089 27.8441 40.4818C25.596 42.9096 24.472 46.1693 24.472 50.2607C24.472 54.6219 25.641 58.0389 27.979 60.5118C30.3619 62.9397 33.6215 64.1536 37.7579 64.1536C40.5905 64.1536 42.9734 63.4342 44.9067 61.9955C46.885 60.5567 48.3237 58.4885 49.2229 55.7909H34.5882V47.2933H59.6763V58.0165C58.822 60.8939 57.3608 63.5691 55.2926 66.0419C53.2694 68.5148 50.6841 70.5155 47.5369 72.0442C44.3896 73.5729 40.8377 74.3372 36.8812 74.3372C32.2053 74.3372 28.0239 73.3256 24.3371 71.3024C20.6953 69.2342 17.8403 66.3792 15.7721 62.7373C13.7489 59.0955 12.7373 54.9366 12.7373 50.2607C12.7373 45.5848 13.7489 41.4259 15.7721 37.7841C17.8403 34.0973 20.6953 31.2423 24.3371 29.2191C27.979 27.1509 32.1378 26.1168 36.8138 26.1168C42.4788 26.1168 47.2446 27.4881 51.1113 30.2307C55.0229 32.9733 57.6081 36.7725 58.867 41.6283H46.1206Z"
          fill="white"
        />
        <path
          d="M68.0238 47.2638C73.0145 47.2638 77.3757 48.2529 81.1074 50.2312C84.8392 52.2094 87.7166 54.997 89.7399 58.5939C91.8081 62.1458 92.8422 66.2597 92.8422 70.9356C92.8422 75.5665 91.8081 79.6805 89.7399 83.2773C87.7166 86.8742 84.8167 89.6617 81.04 91.64C77.3082 93.6183 72.9695 94.6074 68.0238 94.6074H50.2868V47.2638H68.0238ZM67.282 84.6261C71.6432 84.6261 75.0377 83.4347 77.4656 81.0518C79.8935 78.6688 81.1074 75.2968 81.1074 70.9356C81.1074 66.5744 79.8935 63.1799 77.4656 60.752C75.0377 58.3241 71.6432 57.1102 67.282 57.1102H61.8192V84.6261H67.282Z"
          fill="white"
        />
      </svg>
    </div>
    <p class="text-h6 mt-6">Description</p>
    <p>
      Good Desire is a e-commerce application that is able to connect sellers
      and buyers efficiently and easily.
    </p>
    <p class="text-h6 mt-7">Contact</p>
    <div v-for="(contact, index) in contacts" :key="index">
      <v-btn :href="contact.to" target="_blank" icon class="pa-8">
        <v-icon color="accent" large v-text="contact.icon" />
      </v-btn>
      <span class="ms-2" v-text="contact.text" />
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'AboutPage',
  data() {
    return {
      contacts: [
        {
          to: 'mailto:gooddesire@gmail.com',
          icon: 'mdi-email-outline',
          text: 'gooddesire@gmail.com',
        },
        {
          to: 'https://wa.me/+6281396521265',
          icon: 'mdi-whatsapp',
          text: '+6281396521265',
        },
        {
          to: 'https://instagram.com/gooddesire',
          icon: 'mdi-instagram',
          text: '@gooddesire',
        },
      ],
    }
  },
  head: {
    title: 'About Us',
  },
}
</script>
