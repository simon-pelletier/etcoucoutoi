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
        <Link to='/' className="left"><img className="logo" alt="logo" src="https://firebasestorage.googleapis.com/v0/b/etcoucoutoi.appspot.com/o/assets%2Fetcoucoutoi_logo.png?alt=media&token=698782b3-cdd3-4c7d-9ced-a49d2f0a3c03" /></Link>
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
