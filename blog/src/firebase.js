import Firebase from 'firebase'

export const FirebaseApp = Firebase.initializeApp({
  apiKey: 'AIzaSyC17mIsDkk38TZGnI9mBjzFIoCu904snn0',
  authDomain: 'vue2napratica.firebaseapp.com',
  databaseURL: 'https://vue2napratica.firebaseio.com',
  projectId: 'vue2napratica',
  storageBucket: 'vue2napratica.appspot.com',
  messagingSenderId: '779719236528'
})
export const db = FirebaseApp.database()
export const githubProvider = FirebaseApp.auth.GithubAuthProvider()
