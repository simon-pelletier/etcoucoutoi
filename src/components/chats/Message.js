import React, { Component } from 'react'
/*import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'*/
import './chats.scss'


class Message extends Component {

    /*
    getUsername = () => {

        return(

                this.props.conversation.pseudo
        )
    }
    */

    render(){
        //console.log(this.props)
        const conversation = this.props.conversation
        const pseudo = this.props.userInfos[0].pseudo
        const avatar = this.props.userInfos[0].avatar

        //console.log(this.props)

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

                <span className="msgMessage">{conversation.message}</span>

                <span className="msgAuthor">{pseudo}</span> - <span className="msgDate">{dateFormat}</span>
                <img className="msgAvatar" src={avatar} alt="avatar" />
                <hr/>
            </div>
    
        )
    }
}

export default Message

/*
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
*/