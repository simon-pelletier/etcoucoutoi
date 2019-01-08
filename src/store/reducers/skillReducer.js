const initState = {}

const skillReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_SKILL_SUCCESS':
      console.log('create Skill success');
      return state;
    case 'CREATE_SKILL_ERROR':
      console.log('create Skill error');
      return state;
    case 'UPDATE_SKILL_SUCCESS':
      console.log('update Skill success');
      return state;
    case 'UPDATE_SKILL_ERROR':
      console.log('update Skill error');
      return state;
    case 'REMOVE_SKILL_SUCCESS':
      console.log('remove Skill success');
      return state;
    case 'REMOVE_SKILL_ERROR':
      console.log('remove Skill error');
      return state;
    default:
      return state;
  }
};

export default skillReducer;