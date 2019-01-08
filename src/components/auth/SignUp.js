import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signUp } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'

class SignUp extends Component {
  state = {
    pseudo: '',
    email: '',
    password: '',
    gpassword: '',
    gPassError: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.gpassword === process.env.REACT_APP_GENERAL_PASS){
      this.props.signUp(this.state)
    } else {
      this.setState({
        gPassError: 'Le mot de passe "Et Coucou Toi !" n\'est pas correct !'
      })
    }
  }
  
  render() {
    const { authError, auth } = this.props;
    if (auth.uid) return <Redirect to='/' /> 
    return (
      <div className="container signin">
        <form className="" onSubmit={this.handleSubmit}>

        <div className="row">
                        <div className="input-field col s6 offset-s3">
                        <i className="material-icons prefix">account_circle</i>
                        <input type="text" id='pseudo' className="inputContact" onChange={this.handleChange} />
                        <label htmlFor="pseudo" className='helperContact'>Votre pseudo</label>
                        </div>
          </div>
          
          <div className="row">
                        <div className="input-field col s6 offset-s3">
                        <i className="material-icons prefix">account_circle</i>
                        <input type="text" id='email' className="inputContact" onChange={this.handleChange} />
                        <label htmlFor="email" className='helperContact'>Votre email</label>
                        </div>
          </div>

                    <div className="row">
                        <div className="input-field col s6 offset-s3">
                        <i className="material-icons prefix">account_circle</i>
                        <input type="password" id='password' className="inputContact" onChange={this.handleChange} />
                        <label htmlFor="password" className='helperContact'>Votre mot de passe</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s6 offset-s3">
                        <i className="material-icons prefix">account_circle</i>
                        <input type="password" id='gpassword' className="inputContact" onChange={this.handleChange} />
                        <label htmlFor="gpassword" className='helperContact'>Le mot de passe 'EtCoucouToi!'</label>
                        </div>
                    </div>

        

          <div className="input-field col s12 center">
            <button className="btn domiB z-depth-0 center col s12">Login</button>
            <div className="center red-text">
              { authError ? <p>{authError}</p> : null }
              { this.state.gPassError ? <p>{this.state.gPassError}</p> : null }
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
    signUp: (creds) => dispatch(signUp(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
