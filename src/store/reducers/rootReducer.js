import authReducer from './authReducer'
import chatsReducer from './chatsReducer'
//import folioReducer from './folioReducer'
//import skillReducer from './skillReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase'


const rootReducer = combineReducers({
  mainChat: chatsReducer,
  auth: authReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer