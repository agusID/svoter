import * as firebase from 'firebase/app'
import 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyB33dEbf4_KpAWvqg3efOT6iFe4rwKuXk8",
  authDomain: "svelte-flappy-bird.firebaseapp.com",
  databaseURL: "https://svelte-flappy-bird.firebaseio.com",
  projectId: "svelte-flappy-bird",
  appId: "1:717567582978:web:2d5f652fe7680172"
}

firebase.initializeApp(firebaseConfig)

export const database = firebase.database()
