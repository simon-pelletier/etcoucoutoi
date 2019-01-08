import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'

class Dashboard extends Component {
    
    render(){
        const { authError, auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' /> 
        return(
            <div className="home page container">
                Ici la DASHBOARD
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
      auth: state.firebase.auth
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      signIn: (creds) => dispatch(signIn(creds))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
  