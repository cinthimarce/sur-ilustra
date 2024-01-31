import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

loadFonts()
const auth = getAuth()
const pinia = createPinia()
onAuthStateChanged(auth, ()=>{
  createApp(App)
  .use(router)
  .use(pinia)
  .use(vuetify)
  .mount('#app')
})



