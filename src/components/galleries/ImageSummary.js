import React, { Component } from 'react'
import Lightbox from 'react-image-lightbox'

class ImageSummary extends Component {

  constructor(props) {
    super(props);
 
    this.state = {
      //photoIndex: 0,
      isOpen: false,
    };
  }

  imgZoom = (e) => {
    e.preventDefault()
    this.setState({ isOpen: true })

  }

  render (){

    const { /*photoIndex,*/ isOpen } = this.state;

    const { msg, user } = this.props
    let userPseudo = null
    if (user){
      //console.log(user[0])
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
              <img className="gallerieImg" src={msg.linkThumb} alt="img" onClick={(e) => this.imgZoom(e)} />
            </div>

            <div className="titleImg">{msg.message}</div>
            <div className="card-action">{userPseudo} le {dateFormat}</div>

          </div>
        </div>

        {isOpen && (
          <div>
            
            {/*<div className="messageLightBox">{msg.message}</div>*/}
            <Lightbox
              
              mainSrc={msg.link}
              //toolbarButtons={[]}
              imageTitle={msg.message}
              imagePadding={0}
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
          
          </div>
        )}
    
    </div>

  )
}
  }
  

export default ImageSummary