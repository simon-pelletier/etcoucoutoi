import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedOutLinks = () => {
  return (
    <div>
      <ul className="right">
        <li className="liLink"><NavLink to='/'className="pageLink">HOME</NavLink></li>
        <li className="liLink"><NavLink to='/cv' className="pageLink">CV</NavLink></li>
        <li className="liLink"><NavLink to='/contact' className="pageLink">CONTACT</NavLink></li>
      </ul>
    </div>
  )
}

export default SignedOutLinks