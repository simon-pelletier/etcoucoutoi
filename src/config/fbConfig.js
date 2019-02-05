import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

/**
|--------------------------------------------------
| Initialisation de Firebase - cf .env.local .env.production ou .env
|--------------------------------------------------
*/
var config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

const storage = firebase.storage();

export {
  storage, firebase as default
}