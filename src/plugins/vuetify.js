// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import '@fortawesome/fontawesome-free/css/all.css'
import { aliases, fa } from 'vuetify/iconsets/fa'
import { mdi } from 'vuetify/iconsets/mdi'

// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#E3F26D',
          secondary:'#E4F2C4',
          tertiary: '#E6E6E6',
          quinary: '#F7F7F7',
          senary: '#8AA49B',
          septenary: '#315467',
          octonary: '#D9DEE4',
          nonary: '#FFFFFF',
          denary: '#000000',
          undenary: '#fcb050',
          duodenary: '#557067'
        }
      },
    },
  },
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa,
      mdi,
    }
  }
})
