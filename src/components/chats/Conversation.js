//import React from 'react'
import React, { Component } from 'react'
import Message from './Message'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

//const Conversation = ({chat}) => {
class Conversation extends Component {

  getUserInfos = (author) => {
    const users = this.props.users
    
    return users
      .filter(user => {
        return user.authId === author
      }).map(user => {
        //console.log(user.pseudo)
        return (
          {
            pseudo: user.pseudo,
            avatar: user.avatar
          }
        )
      })
  
  }



  render(){

    //let lastAuthor = ''
    let wayClass = 'msgLeft'

    const chat = this.props.chat

    //console.log(this.props)

    return (
      
      <div className="row">

        { chat && chat
        .map(chat => {

          // Alternance Gauche et Droite par message selon l'auteur
          const currentAuthor = chat.author
          /*if (currentAuthor !== lastAuthor){
            lastAuthor = currentAuthor
            if (wayClass === 'msgLeft'){
              wayClass = 'msgRight'
            } else {
              wayClass = 'msgLeft'
            }
          } else {
            lastAuthor = currentAuthor
          }*/

          const auth = this.props.auth.uid

          if (auth === currentAuthor){
            wayClass = 'msgRight'
          } else {
            wayClass = 'msgLeft'
          }

          // Conversation rendu
          return (
            <Message conversation={chat} key={chat.id} way={wayClass} userInfos={this.getUserInfos(currentAuthor)} />
          )

        })}

      </div>
      
    )
  }
  
}

//export default Conversation

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