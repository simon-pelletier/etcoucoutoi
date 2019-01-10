import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'

class SignIn extends Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state)
  }
  
  render() {
    const { authError, auth } = this.props;
    if (auth.uid) return <Redirect to='/' /> 
    return (
      <div className="container logPage">
        <form className="" onSubmit={this.handleSubmit}>

          <div className="row">
                        <div className="input-field col s6 offset-s3">
                        <i className="material-icons prefix">person</i>
                        <input type="text" id='email' className="inputContact" onChange={this.handleChange} />
                        <label htmlFor="email" className='helperContact'>Ton e-mail</label>
                        </div>
          </div>

                    <div className="row">
                        <div className="input-field col s6 offset-s3">
                        <i className="material-icons prefix">vpn_key</i>
                        <input type="password" id='password' className="inputContact" onChange={this.handleChange} />
                        <label htmlFor="password" className='helperContact'>Ton mot de passe</label>
                        </div>
                    </div>

        

          <div className="input-field col s12 center">
            <button className="btn domiB z-depth-0 center col s12">Se connecter</button>
            <div className="center red-text">
              { authError ? <p>{authError}</p> : null }
            </div>
          </div>
        </form>
      </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
