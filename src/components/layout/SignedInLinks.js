import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {
  return (
    <div>
      <ul className="right">
        <li><NavLink to='/'>HOME</NavLink></li>
        <li><NavLink to='/chats'>CHAT</NavLink></li>
        <li><NavLink to='/galleries'>PHOTO</NavLink></li>
        <li><NavLink to='/groups'>GROUPE</NavLink></li>
        <li><NavLink to='/profile'>PROFIL</NavLink></li>
        <li><button href="" className="logOutBtn" onClick={props.signOut}><i className="material-icons left">power_settings_new</i></button></li>
      </ul>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)