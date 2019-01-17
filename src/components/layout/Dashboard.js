import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { signIn } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'
import Chats from '../chats/Chats'
import Galleries from '../galleries/Galleries'

class Dashboard extends Component {
    
    render(){
        //console.log(this.props)
        const { auth, profile, mainChat, users } = this.props;
        //console.log(auth.lastLoginAt)
        //console.log(profile)
        if (!auth.uid) return <Redirect to='/signin' /> 

        
        if(window.location.href.includes('galleries')){
            return(
                
                    <div className="row">
                        <div className="col s12">
                            <Galleries auth={auth} users={users} mainChat={mainChat} />
                            
                        </div>
                    </div>
               
            );
        } else {
            return(
                <div className="home page">
                    <div className="row">
                        <div className="col s12">
                            <Chats author={profile} lastLogin={auth.lastLoginAt}/>
                        </div>
                    </div>
                </div>
            );
        }

        
    }
}

const mapStateToProps = (state) => {
    return{
      authError: state.auth.authError,
      auth: state.firebase.auth,
      profile: state.firebase.profile,
      users: state.firestore.ordered.users,
      mainChat: state.firestore.ordered.mainChat
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      signIn: (creds) => dispatch(signIn(creds))
    }
  }

  export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
      { collection: 'users', orderBy: ['pseudo', 'desc']},
      { collection: 'mainChat', orderBy: ['createdAt', 'asc']}
    ])
  )(Dashboard)