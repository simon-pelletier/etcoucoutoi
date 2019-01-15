import React, { Component } from 'react'
import Message from './Message'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
//import notificationSound from '../../assets/notification.mp3'
import Lightbox from 'react-image-lightbox'

class Conversation extends Component {

  constructor(props) {
    super(props)
    
    //this.notificationSound = new Audio(notificationSound);
    this.state={
      photoIndex: 0,
      isOpen: false
    }

    this.images = []
    this.messages = []

  }

  state={
    photoIndex: 0,
    isOpen: false
  }
  
  getUserInfos = (author) => {
    const users = this.props.users
    
    return users
      .filter(user => {
        return user.authId === author
      }).map(user => {
        return (
          {
            pseudo: user.pseudo,
            avatar: user.avatar
          }
        )
      })
  
  }

  /*componentWillReceiveProps(nextProps) {
    //const users = nextProps.users;
    //this.notificationSound.volume = 1;
    //this.notificationSound.play()
    console.log('updatePROPS')
  }*/

  /*componentDidMount() {
    const { mainChat } = this.props
    if (mainChat){
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
    console.log(this.images)
  }*/

  /*forceUpdateHandler(){
    console.log('🔺 WARNING : Force Update 🔺')
    this.forceUpdate()
    console.log(this.images)
  }*/

  /*componentWillReceiveProps = () => {
      //console.log(this.props.mainChat)
      const { mainChat } = this.props
      if (mainChat){
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
      console.log(this.images)
      //console.log(this.images)
      console.log(this.props)
  }*/

  imgZoom = (e, index) => {
    e.preventDefault()
    //console.log('CLIC')
    this.setState({ 
        isOpen: true,
        photoIndex: index
    })
    //console.log(this.state.photoIndex)
    //console.log(this.images)
  }

  render(){

    let wayClass = 'msgOthers'

    const msgStateId = this.props.msgState
    let msgState = 'msg'

    let lastDay = 0

    const chat = this.props.chat
    const myClick = this.props.myClick

    const { photoIndex, isOpen } = this.state;
    //const msgState = this.props.msgState

    let indexMsgLink = -1

    this.images = []
    this.messages = []

    return (
      <div>
      <div className="row">

        { chat && chat
        .map(chat => {
          

          const currentAuthor = chat.author

          const responseToId = chat.responseTo
          
          let responseTo = null

          const date = chat.createdAt.seconds * 1000
          const dateFormat = new Intl.DateTimeFormat('fr-FR', 
              {
                  timezone: 'UTC',
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit'
              }
          ).format(date)

          let dateSplited = dateFormat.split('/')
          let day = dateSplited[0]

          let dateElt = ''

          if(lastDay !== day){
            dateElt = dateFormat
          } else {
            dateElt = null
          }
          lastDay = day

          const auth = this.props.auth.uid

          if(chat.link !== null){
            this.images.push(chat.link)
            this.messages.push(chat.message)
            //console.log(this.images)

            indexMsgLink++
            //console.log(indexMsgLink)
          }
          const index = indexMsgLink
          

          if (auth === currentAuthor){
            wayClass = 'msgUser'
          } else {
            wayClass = 'msgOthers'
          }

          if (msgStateId === chat.id){
            msgState = 'msgSelected'
          } else {
            msgState = 'msg'
          }

          if (responseToId !== null){
            //console.log(this.props.chat)
            const chatResponse = this.props.chat
            responseTo = chatResponse && chatResponse
            .filter(response => {
              return responseToId === response.id
            })
            .map((response) => {
              //let responseTab = [response.id, response.message, this.getUserInfos(response.author)]
              //console.log(response)
              let responseWithUser = [ response, this.getUserInfos(response.author) ]
              return responseWithUser
            })
          } else {
            responseTo = null
          }
          //console.log(responseTo)
          // Conversation rendu
          return (
            
            <Message conversation={chat} key={chat.id} way={wayClass} responseTo={responseTo} msgState={msgState} userInfos={this.getUserInfos(currentAuthor)} date={dateElt} myClick={myClick} onClick={(e) => this.imgZoom(e, index)}/>
          )

        })}

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
  return{
      auth: state.firebase.auth,
      users: state.firestore.ordered.users
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'users', orderBy: ['pseudo'] }
  ])
)(Conversation)