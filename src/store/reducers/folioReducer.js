const initState = {}

const folioReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_FOLIO_SUCCESS':
      console.log('create folio success');
      return state;
    case 'CREATE_FOLIO_ERROR':
      console.log('create folio error');
      return state;
    case 'UPDATE_FOLIO_SUCCESS':
      console.log('update folio success');
      return state;
    case 'UPDATE_FOLIO_ERROR':
      console.log('update folio error');
      return state;
    case 'REMOVE_FOLIO_SUCCESS':
      console.log('remove folio success');
      return state;
    case 'REMOVE_FOLIO_ERROR':
      console.log('remove folio error');
      return state;
    default:
      return state;
  }
};

export default folioReducer;