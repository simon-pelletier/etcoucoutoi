import React, { Component } from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

class Galleries extends Component {

    render () {
        return (
            <div className="page container galleriePage">
                GALLERIES COMP
            </div>
        )
    }
}

//export default Galleries;

const mapStateToProps = (state) => {
    // console.log(state);
    return {
      //projects: state.firestore.ordered.projects,
      auth: state.firebase.auth,
      users: state.firestore.ordered.users
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      //updateProfile: (user) => dispatch(updateProfile(user))
    }
}
  
  export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
      { collection: 'mainChat', orderBy: ['createdAt', 'asc']},
      { collection: 'users', orderBy: ['pseudo', 'desc'] }
    ])
)(Galleries)