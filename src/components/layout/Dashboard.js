import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { signIn } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'
import Chats from '../chats/Chats'

class Dashboard extends Component {
    
    render(){
        //console.log(this.props)
        const { auth, profile } = this.props;
        if (!auth.uid) return <Redirect to='/signin' /> 
        return(
            <div className="home page">
                {/*<div className="row welcomeMsgInfo">T'as loupé -- messages et -- photos !
                </div>*/}
               
                <div className="row">
                    <div className="col s12">
                        <Chats author={profile} />
                    </div>

                </div>



            </div>
            
        );
    }
}

const mapStateToProps = (state) => {
    return{
      authError: state.auth.authError,
      auth: state.firebase.auth,
      profile: state.firebase.profile
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
      { collection: 'users', orderBy: ['pseudo', 'desc']}
    ])
  )(Dashboard)