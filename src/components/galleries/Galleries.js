import React, { Component } from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
//import { Redirect } from 'react-router-dom'
import ImageSummary from './ImageSummary'
import './galleries.scss'

class Galleries extends Component {

    render () {
        //const { auth/*, users*/ } = this.props

        //if (!auth.uid) return <Redirect to='/signin' /> 

        //const { messages } = this.props

        const { mainChat } = this.props

        return (
            <div className="page container galleriePage">

                <div className="gallerie-list" id="grid">

                { mainChat && mainChat
                    .filter(msg => { 
                        return msg.link !== null
                    })
                    .map(msg => {
                        return(
                            <ImageSummary msg={msg} key={msg.id} className="gridItem"/>
                        )
                    })
                
                }

                </div>

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
      users: state.firestore.ordered.users,
      mainChat: state.firestore.ordered.mainChat
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