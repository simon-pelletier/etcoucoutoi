import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {
  return (
    <div>
      <ul className="right">
        <li><NavLink to='/galleries'><i className="material-icons menuIcon">photo</i></NavLink></li>
        <li><NavLink to='/groups'><i className="material-icons menuIcon">group</i></NavLink></li>
        <li><NavLink to='/profile'><i className="material-icons menuIcon">settings</i></NavLink></li>
        <li><div href="" onClick={props.signOut}><i className="material-icons menuIcon logOutBtn">cancel</i></div></li>
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