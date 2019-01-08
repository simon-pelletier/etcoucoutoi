export const createSkill = (skill) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    var newSkill = firestore.collection("skills").doc();
    var data = {
      id: newSkill.id,
      ...skill,
      createdAt: new Date()
    };
    newSkill.set(data);
  }
};

export const updateSkill = (skill) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('skills').doc(skill.id).update({
      ...skill
    }).then(() => {
      dispatch({ type: 'UPDATE_SKILL_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'UPDATE_SKILL_ERROR' }, err);
    });
  }
};

export const removeSkill = (skill, id) => {
  console.log(id)
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('skills').doc(skill.id).delete(
    ).then(() => {
      dispatch({ type: 'REMOVE_SKILL_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'REMOVE_SKILL_ERROR' }, err);
    });
  }
};