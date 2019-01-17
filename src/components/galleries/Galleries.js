import React, { Component } from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import ImageSummary from './ImageSummary'
import { Redirect } from 'react-router-dom'
import './galleries.scss'
import Lightbox from 'react-image-lightbox'
import ReactDOM from 'react-dom';

class Galleries extends Component {

    constructor(props) {
        super(props);
        this.state = {
          photoIndex: 0,
          isOpen: false
        };
        //console.log(props)
        this.images = []
        this.messages = []

        
        this.scrollToTop = this.scrollToTop.bind(this)
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this)
      }

    

    state = {
        gallerie: '',
        photoIndex: 0,
        isOpen: false
      }

    componentDidMount() {
        const { mainChat } = this.props
        if (mainChat){
            this.images = []
            this.messages = []
            mainChat && mainChat
            .filter(msg => { 
                return msg.link !== null
            })
            .map(msg => {
                this.images.push(msg.link)
                this.messages.push(msg.message)
                return null
            })
        }

        //this.forceUpdateHandler()
        //console.log(this.images)
    }

    forceUpdateHandler(){
        console.log('🔺 WARNING : Force Update 🔺')
        this.forceUpdate()
        
    }

    componentWillReceiveProps = () => {
        //console.log(this.props.mainChat)
        const { mainChat } = this.props
        
        if (mainChat){
            this.images = []
            this.messages = []
            mainChat && mainChat
            .filter(msg => { 
                return msg.link !== null
            })
            .map(msg => {
                this.images.push(msg.link)
                this.messages.push(msg.message)
                return null
            })
        }
        //console.log(this.images)
        //console.log(this.images)
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
        //console.log(this.images)
      }

    componentWillReceiveProps(nextProps){
        console.log('➰ NOTE : Component Will Receive Props ➰')
        this.scrollToTop()
    }
      
    componentDidUpdate() {
        this.scrollToTop()
    }

    componentWillMount() {
        console.log('Component WILL MOUNT!')
        this.forceUpdateHandler()
        this.scrollToTop()
     }

     componentWillUpdate(nextProps, nextState) {
        console.log('Component WILL UPDATE!');
     }
 
     componentWillUnmount() {
        console.log('Component WILL UNMOUNT!')
     }
    

    scrollToTop(event) {
        const startNode = ReactDOM.findDOMNode(this)
        let child = null
        if(startNode instanceof HTMLElement){
            child = startNode.querySelector('#_top');
        }
        
        if (child){
            window.scrollTo(0, child.offsetTop - 200)
            console.log('SCROLL TOP')
        } else {
            console.log('pas SCROLL TOP')
        }
      }
    

    render () {

        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />

        const { photoIndex, isOpen } = this.state;
        const { mainChat } = this.props
        

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
                        return(
                            <ImageSummary msg={msg} key={msg.id} user={this.getUserInfos(msg.author)} className="gridItem" onClick={(e) => this.imgZoom(e, index)}/>
                        ) 
                    })
                
                }

                </div>

                {isOpen && (
          <div>
            
            {/*<div className="messageLightBox">{msg.message}</div>*/}
            <Lightbox
              
              mainSrc={this.images[photoIndex]}
              //toolbarButtons={[]}
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

const mapStateToProps = (state) => {
    return {
      auth: state.firebase.auth,
      users: state.firestore.ordered.users,
      mainChat: state.firestore.ordered.mainChat
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'users', orderBy: ['pseudo', 'desc'] }
    ])
)(Galleries)