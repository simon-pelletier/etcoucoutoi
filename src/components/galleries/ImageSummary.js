//import React from 'react'
import React, { Component } from 'react'
import Lightbox from 'react-image-lightbox'


//const ImageSummary = ({msg, user}) => {
class ImageSummary extends Component {

  constructor(props) {
    super(props);
 
    this.state = {
      //photoIndex: 0,
      isOpen: false,
    };
  }

  imgZoom = (e, img) => {
    e.preventDefault()
    //console.log(img)
    this.setState({ isOpen: true })

  }

  render (){

    const { /*photoIndex,*/ isOpen } = this.state;


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
    const { msg, user } = this.props
    let userPseudo = null
    if (user){
      //console.log(user[0])
      userPseudo = user[0].pseudo
    }

    //console.log(msg)
    //const date = new Date(msg.createdAt.seconds*1000)
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
              <img className="gallerieImg" src={msg.link} alt="img"  onClick={(e) => this.imgZoom(e, msg.link)}/>
            </div>

            <div className="titleImg">{msg.message}</div>
            <div className="card-action">{userPseudo} le {dateFormat}</div>
            
          
          </div>
        </div>

        {/*
        <div className="card-title">{user.pseudo}</div>
        <div className="card-action">{user.email}</div>
        <div className="card-action">{dateFormat}</div>
        */}

        {isOpen && (
          <Lightbox
            mainSrc={msg.link}
            //nextSrc={images[(photoIndex + 1) % images.length]}
            //prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => this.setState({ isOpen: false })}
            /*onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + images.length - 1) % images.length,
              })
            }*/
            /*onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % images.length,
              })
            }*/
          />
        )}
    
    </div>

  )
}
  }
  

export default ImageSummary
/*export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'mainChat', orderBy: ['createdAt', 'asc']},
      { collection: 'users', orderBy: ['pseudo', 'desc'] }
    ])
)(Galleries)*/