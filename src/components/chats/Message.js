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

        const dateElt = this.props.date

        //console.log(this.props)

        const date = conversation.createdAt.seconds * 1000
        const dateFormat = new Intl.DateTimeFormat('fr-FR', 
            {
                timezone: 'UTC',
                year: '2-digit',
                month: '2-digit',
                day: '2-digit'
            }
        ).format(date)


        const dateObj = new Date(date)

        let hour = dateObj.getHours()
        let minute = dateObj.getMinutes()

        const monthsTab = [
            'janvier',
            'février',
            'mars',
            'avril',
            'mai',
            'juin',
            'juillet',
            'août',
            'septembre',
            'octobre',
            'novembre',
            'décembre'
        ]

        let dateSplited = dateFormat.split('/')
        let day = dateSplited[0]
        let month = parseInt(dateSplited[1], 10)
        //let year = dateSplited[2]
        //console.log(day + ' ' + month + ' ' + year)
        
        if(hour < 10){
            hour = '0' + hour
        }
        if(minute < 10){
            minute = '0' + minute
        }


        return (
            <div className="col s12">

                { 
                    dateElt !== null ? 
                    <div className="row"><div className="msgDateInfo col s4 m3 l2 left">{day + ' ' + monthsTab[month - 1]}</div></div>
                    : null 
                }
                <div className={this.props.way + " msgBlock left col s12 m8 l6"}>
                    <i className="material-icons msgBulle">chat_bubble</i>
                    <span className="msgMessage col s12">{conversation.message}</span>
                    <span className="msgAuthor">{pseudo}</span>
                    <span className="msgDate">{hour + ':' + minute}</span>
                    <img className="msgAvatar" src={avatar} alt="avatar" />
                 
                </div>
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