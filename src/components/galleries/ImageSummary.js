import React, { Component } from 'react'

class ImageSummary extends Component {

  render() {

    const { msg, user } = this.props
    let userPseudo = null
    if (user) {
      userPseudo = user[0].pseudo
    }

    const date = msg.createdAt.seconds * 1000
    const dateFormat = new Intl.DateTimeFormat('fr-FR',
      {
        timezone: 'UTC',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }
    ).format(date)

    return (
      <div className="imageItem">
        <div className="card">
          <div className="card-image imgBlock">
            <div className="gallerieImgContainer">
              <img className="gallerieImg" src={msg.linkThumb} alt="img" onClick={this.props.onClick} />
            </div>
            <div className="titleImg">{msg.message}</div>
            <div className="card-action">{userPseudo} le {dateFormat}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default ImageSummary