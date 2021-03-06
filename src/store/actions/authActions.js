/**
|--------------------------------------------------
| Auth - Connexion
|--------------------------------------------------
*/
export const signIn = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then(() => {
      dispatch({ type: 'LOGIN_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'LOGIN_ERROR', err });
    });

  }
}

/**
|--------------------------------------------------
| Auth - Inscription
|--------------------------------------------------
*/
export const signUp = (newUser) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase.auth().createUserWithEmailAndPassword(
      newUser.email,
      newUser.password
    ).then(resp => {
      return firestore.collection('users').doc(resp.user.uid).set({
        authId: resp.user.uid,
        email: newUser.email,
        pseudo: newUser.pseudo,
        avatar: 'https://firebasestorage.googleapis.com/v0/b/etcoucoutoi.appspot.com/o/assets%2Fprofil.jpg?alt=media&token=7b89255a-e7df-4964-b027-892bc2330224',
        dob: { seconds: 0 }
      });
    }).then(() => {
      dispatch({ type: 'SIGNUP_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'SIGNUP_ERROR', err });
    });
  }
}

/**
|--------------------------------------------------
| Auth - Déconexion
|--------------------------------------------------
*/
export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase.auth().signOut().then(() => {
      dispatch({ type: 'SIGNOUT_SUCCESS' })
    });
  }
}

/**
|--------------------------------------------------
| Mise à jour du profil utilisateur
|--------------------------------------------------
*/
export const updateProfile = (user) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection('users').doc(user.authId).update({
      email: user.email,
      pseudo: user.pseudo,
      avatar: user.avatar,
      dob: user.dob
    }).then(() => {
      dispatch({ type: 'UPDATE_PROFIL_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'UPDATE_PROFIL_ERROR' }, err);
    });
  }
}
