import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {
  return (
    <div>
      <ul className="right">
        <li><NavLink to='/portfolio'>PORTFOLIO</NavLink></li>
        <li><NavLink to='/cv'>CV</NavLink></li>
        <li><NavLink to='/contact'>CONTACT</NavLink></li>
        <li><NavLink className="addBtn" to='/createFolio'><i className="material-icons left">add_circle_outline</i>Folio</NavLink></li>
        <li><NavLink className="addBtn" to='/createSkill'><i className="material-icons left">add_circle_outline</i>Skill</NavLink></li>
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
