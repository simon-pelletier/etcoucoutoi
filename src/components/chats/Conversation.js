import React, { Component } from 'react'
import Message from './Message'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
//import notificationSound from '../../assets/notification.mp3'

class Conversation extends Component {

  /*constructor(props) {
    super(props)
    this.notificationSound = new Audio(notificationSound);
  }*/
  
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

  render(){

    let wayClass = 'msgOthers'

    const msgStateId = this.props.msgState
    let msgState = 'msg'

    let lastDay = 0

    const chat = this.props.chat
    const myClick = this.props.myClick
    //const msgState = this.props.msgState

    return (
      
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
            .map(response => {
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
            
            <Message conversation={chat} key={chat.id} way={wayClass} responseTo={responseTo} msgState={msgState} userInfos={this.getUserInfos(currentAuthor)} date={dateElt} myClick={myClick} />
          )

        })}

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