import 'bootstrap/dist/css/bootstrap.min.css'
import 'mapbox-gl/dist/mapbox-gl.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initializeApp } from 'firebase/app'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN_KEY,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID_KEY,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET_KEY,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID_KEY,
  appId: import.meta.env.VITE_FIREBASE_APP_ID_KEY
}
initializeApp(firebaseConfig)

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)
app.mount('#app')
