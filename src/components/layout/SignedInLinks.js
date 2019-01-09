import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {
  return (
    <div>
      <ul className="right">
        <li><NavLink to='/galleries'>PHOTOS</NavLink></li>
        <li><NavLink to='/groups'>LA TROUPE</NavLink></li>
        <li><NavLink to='/profile'>MOI</NavLink></li>
        <li><div href="" className="logOutBtn" onClick={props.signOut}><i className="material-icons">power_settings_new</i></div></li>
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