import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

class Message extends Component {

    getUsername = () => {
        //console.log(this.props)
        const users = this.props.users
        const author = this.props.conversation.author

        return(
            <div>
                { users && users
                .filter(user => {
                    if (user.authId === author){
                        return user
                    } else {
                        return null
                    }
                })
                .map(user => {
                    return (
                        <div key={this.props.conversation.id}>{user.pseudo}</div>
                    )
                })}
            </div>
        )
    }

    render(){
    //console.log(this.props)  
    const conversation = this.props.conversation
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

    //WHERE
    //this.props.users.authId
    //CORRESPOND à 
    //this.props.conversation.author
    //FIND
    //this.props.users.pseudo
    //this.props.users.avatar

    return (
        
        <div>
            <div className="msgMessage">{conversation.message}</div>
            <div className="msgAuthor">{this.getUsername(conversation.author)}</div>
            <div className="msgDate">{dateFormat}</div>
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