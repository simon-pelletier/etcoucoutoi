import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'

const Navbar = (props) => {
  const { auth, profile } = props;
  const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />;

  return (
    <nav className="nav-wrapper">
      <div className="container">
        <Link to='/' className="left"><img className="logo" alt="logo" src="https://firebasestorage.googleapis.com/v0/b/etcoucoutoi.appspot.com/o/assets%2Flogo.png?alt=media&token=6057aa34-63e6-4b33-8b4d-1604c2d145a0" /></Link>
        {links}
      </div>
    </nav>
  )
}

const mapStateToProps = (state) => {
  return{
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

export default connect(mapStateToProps)(Navbar)
