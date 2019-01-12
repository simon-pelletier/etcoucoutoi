import React from 'react'

const UserSummary = ({user}) => {
  const date = user.dob.seconds * 1000
  //console.log(user)
        const dateFormat = new Intl.DateTimeFormat('fr-FR', 
            {
                timezone: 'UTC',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }
        ).format(date)

  return (
    <div className="userItem">
        <div className="card"></div>
        <div className="card-image">
          <div className="avatarUserListContainer" ><img className="avatarUserList" src={user.avatar} alt="avatar" /></div>
        </div>

        <div className="card-title">{user.pseudo}</div>
        <div className="card-action">{user.email}</div>
        <div className="card-action">{dateFormat}</div>
    
    </div>

  )
}

export default UserSummary
