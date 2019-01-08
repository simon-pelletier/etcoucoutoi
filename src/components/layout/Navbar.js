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
        <Link to='/' className="brand-logo left"><img className="logo" alt="logo" src="https://firebasestorage.googleapis.com/v0/b/simoncv-5e45f.appspot.com/o/images%2Flayout%2Flogo.png?alt=media&token=f7f34321-ad3f-41d8-8257-462a321ebc9a" /></Link>
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
