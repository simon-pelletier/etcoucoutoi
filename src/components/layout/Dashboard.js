import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { signIn } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'
import Chats from '../chats/Chats'
//import Galleries from '../galleries/Galleries'
//import Groups from '../groups/Groups'

class Dashboard extends Component {
    
    /*getUser = () => {
        console.log(this.props)
        return(
            <div>USER</div>
        )
    }*/
    

    render(){
        console.log(this.props)
        const { authError, auth, profile } = this.props;
        if (!auth.uid) return <Redirect to='/signin' /> 
        return(
            <div className="home page container">
                <div className="row welcomeMsg">Et Coucou {profile.pseudo} !</div>
                <div className="row welcomeMsgInfo">T'as loupé -- messages et -- photos !
                </div>
               
                <div className="row">
                    <div className="col s12">
                        <Chats />
                    </div>

                </div>

                <div className="row">
                    
                    
                </div>
                <div className="center red-text">
                    { authError ? <p>{authError}</p> : null }
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
  
  //export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

  export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
      { collection: 'users', orderBy: ['pseudo', 'desc']}
    ])
  )(Dashboard)