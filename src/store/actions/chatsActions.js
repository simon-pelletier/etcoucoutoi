/**
|--------------------------------------------------
| Chat - Envoi de message
|--------------------------------------------------
*/
export const sendMessage = (message) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection('mainChat').add({
      message: message.message,
      author: message.author,
      link: message.link,
      responseTo: message.responseTo,
      linkThumb: message.linkThumb,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'SEND_MESSAGE_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'SEND_MESSAGE_ERROR' }, err);
    });
  }
};