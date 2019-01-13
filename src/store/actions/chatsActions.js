export const sendMessage = (message) => {
    return (dispatch, getState, {getFirestore}) => {
      const firestore = getFirestore();
      firestore.collection('mainChat').add({
        message: message.message,
        author: message.author,
        link: message.link,
        responseTo: message.responseTo,
        createdAt: new Date()
      }).then(() => {
        dispatch({ type: 'SEND_MESSAGE_SUCCESS' });
      }).catch(err => {
        dispatch({ type: 'SEND_MESSAGE_ERROR' }, err);
      });
    }
  };

  /*
  export const updateFolio = (folio) => {
    return (dispatch, getState, {getFirestore}) => {
      const firestore = getFirestore();
      firestore.collection('folios').doc(folio.id).update({
        ...folio
      }).then(() => {
        dispatch({ type: 'UPDATE_FOLIO_SUCCESS' });
      }).catch(err => {
        dispatch({ type: 'UPDATE_FOLIO_ERROR' }, err);
      });
    }
  };
  
  export const removeFolio = (folio) => {
    return (dispatch, getState, {getFirestore}) => {
      const firestore = getFirestore();
      firestore.collection('folios').doc(folio.id).delete(
      ).then(() => {
        dispatch({ type: 'REMOVE_FOLIO_SUCCESS' });
      }).catch(err => {
        dispatch({ type: 'REMOVE_FOLIO_ERROR' }, err);
      });
    }
  };*/