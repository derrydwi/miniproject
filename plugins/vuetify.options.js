import colors from 'vuetify/es5/util/colors'

export default function () {
  const dark = JSON.parse(localStorage.getItem('vuex')).theme.isDark
  return {
    theme: {
      dark,
      themes: {
        light: {
          primary: colors.deepPurple.darken2,
          bg: '#ffffff',
          surface: '#ffffff',
          accent: colors.deepPurple.darken2,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
        dark: {
          primary: colors.deepPurple.darken2,
          bg: '#0a0514',
          surface: '#130a24',
          accent: colors.deepPurple.lighten2,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  }
}
