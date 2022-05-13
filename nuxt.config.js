export default {
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Good Desire',
    title: 'good-desire',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@sweetalert2/theme-material-ui', '~/assets/main.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/persistedstate.js',
    '~/plugins/formatter.js',
    '~/plugins/swal.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    // https://google-fonts.nuxtjs.org/
    '@nuxtjs/google-fonts',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://auth.nuxtjs.org/
    '@nuxtjs/auth',
    // https://www.npmjs.com/package/@nuxtjs/apollo
    '@nuxtjs/apollo',
    // https://www.npmjs.com/package/vue-sweetalert2
    'vue-sweetalert2/nuxt/no-css',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    optionsPath: '~/plugins/vuetify.options.js',
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    defaultAssets: {
      font: {
        family: 'Open Sans',
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  auth: {
    redirect: {
      login: '/',
      logout: '/',
      home: '/',
      callback: '/callback',
    },
    strategies: {
      local: false,
      auth0: {
        domain: 'dev-rlo2p8gf.us.auth0.com',
        client_id: 'kmEQpIWwM9mzQRgK6OW5fuM6CsnlRwb9',
        audience: 'https://dev-rlo2p8gf.us.auth0.com/api/v2/',
      },
    },
  },

  apollo: {
    clientConfigs: {
      default: '~/plugins/apollo-config.js',
    },
    errorHandler: '~/plugins/apollo-error-handler.js',
  },

  googleFonts: {
    families: {
      'Open+Sans': true,
    },
  },

  serverMiddleware: {
    '/api': '~/api',
  },
}
