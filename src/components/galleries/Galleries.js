import React, { Component } from 'react'
import ImageSummary from './ImageSummary'
import { Redirect } from 'react-router-dom'
import './galleries.scss'
import Lightbox from 'react-image-lightbox'

class Galleries extends Component {

    constructor(props) {
        super(props);
        this.state = {
          photoIndex: 0,
          isOpen: false
        };

        this.images = []
        this.messages = []

      }

    state = {
        photoIndex: 0,
        isOpen: false
      }

    forceUpdateHandler(){
        console.log('🔺 WARNING : Force Update 🔺')
        this.forceUpdate()

    }

    getUserInfos = (author) => {

        const users = this.props.users
        
        if (users){
            return users
          .filter(user => {
            return user.authId === author
          }).map(user => {
            return (
              {
                pseudo: user.pseudo
              }
            )
          })
        }
      }

      imgZoom = (e, index) => {
        e.preventDefault()
        this.setState({ 
            isOpen: true,
            photoIndex: index
        })
      }

    componentDidUpdate() {
        window.scrollTo(0, window.innerHeight)
    }

    componentWillMount() {
        this.scrollToTop()
        window.scrollTo(0, window.innerHeight)
     }

    scrollToTop(event) {
        window.scrollTo(0, 0)
    }
    
    render () {

        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />

        const { photoIndex, isOpen } = this.state;
        const { mainChat } = this.props

        this.images = []
        this.messages = []

        return (
            <div className="container galleriePage" >
                
                <div className="gallerieDivTop" id='_top'></div>

                <div className="gallerie-list" id="grid" >

                
                { mainChat && mainChat
                    //.reverse()
                    .filter(msg => { 
                        return msg.link !== null
                    })
                    .map((msg, index) => {
                        this.images.push(msg.link)
                        this.messages.push(msg.message)
                        return(
                            <ImageSummary msg={msg} key={msg.id} user={this.getUserInfos(msg.author)} className="gridItem" onClick={(e) => this.imgZoom(e, index)}/>
                        ) 
                    })
                
                }

                </div>

                {isOpen && (
          <div>

            <Lightbox
              
              mainSrc={this.images[photoIndex]}

              imageTitle={this.messages[photoIndex]}
              imagePadding={0}
              nextSrc={this.images[(photoIndex + 1) % this.images.length]}
              prevSrc={this.images[(photoIndex + this.images.length - 1) % this.images.length]}
              onCloseRequest={() => this.setState({ isOpen: false })}
              onMovePrevRequest={() =>
                this.setState({
                  photoIndex: (photoIndex + this.images.length - 1) % this.images.length,
                })
              }
              onMoveNextRequest={() =>
                this.setState({
                  photoIndex: (photoIndex + 1) % this.images.length,
                })
              }
            />
          
          </div>
        )}

            </div>
        )
    }
}

export default Galleries