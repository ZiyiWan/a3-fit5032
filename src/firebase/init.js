import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN_KEY,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID_KEY,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET_KEY,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID_KEY,
  appId: import.meta.env.VITE_FIREBASE_APP_ID_KEY
}
initializeApp(firebaseConfig)
const db = getFirestore(initializeApp(firebaseConfig))
export default db
