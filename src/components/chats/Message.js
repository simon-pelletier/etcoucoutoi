import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import './chats.scss'

class Message extends Component {

    getUsername = () => {
        //console.log(this.props)
        const users = this.props.users
        const author = this.props.conversation.author

        return(
            users && users
                .filter(user => {
                    return user.authId === author
                })
                .map(user => {
                    return (
                        user.pseudo
                    )
                })
        )
    }

    render(){
        const conversation = this.props.conversation
        //const counter = this.props.counter
        const date = conversation.createdAt.seconds * 1000
        const dateFormat = new Intl.DateTimeFormat('fr-FR', 
            {
                timezone: 'UTC',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit'
            }
        ).format(date)

        return (

            <div className={this.props.way}>
                <div className="msgMessage">{conversation.message}</div>
                <span className="msgAuthor">{this.getUsername(conversation.author)}</span> - <span className="msgDate">{dateFormat}</span>
                <hr/>
            </div>
    
        )
    }
}

const mapStateToProps = (state) => {
    return{
        users: state.firestore.ordered.users
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'users', orderBy: ['pseudo'] }
    ])
)(Message)