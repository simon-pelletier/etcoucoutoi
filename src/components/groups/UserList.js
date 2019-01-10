import React from 'react'
import UserSummary from './UserSummary'
//import { Link } from 'react-router-dom'

const UserList = ({users, entry}) => {

  return (

    <div className="users-list" id="grid">
      { users && users.filter(user => { 
        return user.pseudo.toLowerCase().includes(entry.toLowerCase()) || user.email.toLowerCase().includes(entry.toLowerCase()) })
        .map(user => {
        return(
          <UserSummary user={user} key={user.id} className="gridItem"/>
        )
      })}

    </div>
  )
}

export default UserList