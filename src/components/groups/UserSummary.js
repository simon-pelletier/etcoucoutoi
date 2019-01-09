import React from 'react'

const UserSummary = ({user}) => {

  return (
    <div className="card horizontal z-depth-0 project-summary">
      
        <div className="card-image">
          <img className="avatarUserList" src={user.avatar} alt="avatar" />
        </div>

        <span className="card-title">{user.pseudo}</span>
        <span className="card-action">{user.email} - {user.dob}</span>
    
    </div>

  )
}

export default UserSummary
