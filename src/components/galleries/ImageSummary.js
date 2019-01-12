import React from 'react'

const ImageSummary = ({msg}) => {
  //const date = user.dob.seconds * 1000
  //console.log(user)
        /*const dateFormat = new Intl.DateTimeFormat('fr-FR', 
            {
                timezone: 'UTC',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }
        ).format(date)*/

    //console.log(msg)

  return (
    <div className="imageItem">
        <div className="card"></div>
        <div className="card-image">
          <img className="gallerieImg" src={msg.link} alt="img" />
        </div>

        {/*
        <div className="card-title">{user.pseudo}</div>
        <div className="card-action">{user.email}</div>
        <div className="card-action">{dateFormat}</div>
        */}
    
    </div>

  )
}

export default ImageSummary
