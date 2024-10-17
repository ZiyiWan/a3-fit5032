import 'bootstrap/dist/css/bootstrap.min.css'
import 'mapbox-gl/dist/mapbox-gl.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initializeApp } from 'firebase/app'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
const firebaseConfig = {
  apiKey: 'AIzaSyDGLYYV9Dr8h8JyMnGiNPBbw_1VqyYhc_s',
  authDomain: 'week7-firebase-auth-pj.firebaseapp.com',
  projectId: 'week7-firebase-auth-pj',
  storageBucket: 'week7-firebase-auth-pj.appspot.com',
  messagingSenderId: '278610195284',
  appId: '1:278610195284:web:63d4edfb11b90072c68ec1'
}
initializeApp(firebaseConfig)

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)
app.mount('#app')
