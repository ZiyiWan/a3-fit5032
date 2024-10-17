import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDGLYYV9Dr8h8JyMnGiNPBbw_1VqyYhc_s',
  authDomain: 'week7-firebase-auth-pj.firebaseapp.com',
  projectId: 'week7-firebase-auth-pj',
  storageBucket: 'week7-firebase-auth-pj.appspot.com',
  messagingSenderId: '278610195284',
  appId: '1:278610195284:web:63d4edfb11b90072c68ec1'
}
initializeApp(firebaseConfig)
const db = getFirestore(initializeApp(firebaseConfig))
export default db
