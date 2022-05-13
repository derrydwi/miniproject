import colors from 'vuetify/es5/util/colors'

export default function () {
  let dark
  if (localStorage.getItem('vuex')) {
    try {
      dark = JSON.parse(localStorage.getItem('vuex')).theme.isDark
    } catch (error) {
      dark = false
    }
  }
  return {
    theme: {
      dark,
      themes: {
        light: {
          primary: colors.deepPurple.darken2,
          accent: colors.deepPurple.darken2,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.darken2,
        },
        dark: {
          primary: colors.deepPurple.darken2,
          accent: colors.deepPurple.lighten2,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.darken1,
        },
      },
    },
  }
}
