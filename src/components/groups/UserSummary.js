import React from 'react'

const UserSummary = ({user}) => {

  return (
    <div className="userItem">
        <div className="card"></div>
        <div className="card-image">
          <img className="avatarUserList" src={user.avatar} alt="avatar" />
        </div>

        <div className="card-title">{user.pseudo}</div>
        <div className="card-action">{user.email}</div>
        <div className="card-action">{user.dob}</div>
    
    </div>

  )
}

export default UserSummary
