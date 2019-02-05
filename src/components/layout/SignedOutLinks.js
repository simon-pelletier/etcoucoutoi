import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedOutLinks = () => {
  return (
    <div>
      <ul className="right">
        <li className="liLink"><NavLink to='/signup' className="pageLink">S'INSCRIRE</NavLink></li>
        <li className="liLink"><NavLink to='/signin' className="pageLink">SE CONNECTER</NavLink></li>
      </ul>
    </div>
  )
}

export default SignedOutLinks