import colors from 'vuetify/es5/util/colors'

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
  plugins: ['~/plugins/formatter.js', '~/plugins/swal.js'],

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
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    defaultAssets: {
      font: {
        family: 'Open Sans',
      },
    },
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
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
        domain: 'dev-r13ssmnc.us.auth0.com',
        client_id: 'zolkpMupBjXNYFnwmYET3JoKjKmNN00F',
        audience: 'hasura',
      },
    },
  },

  apollo: {
    clientConfigs: {
      default: '~/plugins/apollo-config.js',
      // default: {
      //   httpEndpoint: 'https://capital-airedale-21.hasura.app/v1/graphql',
      //   wsEndpoint: 'wss://capital-airedale-21.hasura.app/v1/graphql',
      //   tokenName: 'auth._token.auth0',
      // httpLinkOptions: {
      //   headers: {
      //     'x-hasura-default-role': 'anonymous',
      //   },
      // },
      // },
      // },
      // authenticationType: '',
    },
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
