const initState = {}

const chatsReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SEND_MESSAGE_SUCCESS':
      console.log('send message success');
      return state;
    case 'SEND_MESSAGE_ERROR':
      console.log('send message error');
      return state;
    default:
      return state;
  }
};

export default chatsReducer;