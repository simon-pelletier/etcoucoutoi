import React, { Component } from 'react'
import './chats.scss'
import Quote from './Quote'


class Message extends Component {

    /*handleSelect = (e) => {
        e.preventDefault()
        console.log(this.props.conversation.id)
    }*/

    render(){

        const conversation = this.props.conversation
        const responseMsgTest = this.props.responseTo
        let responseMsg = null
        if (responseMsgTest){
            responseMsg = responseMsgTest[0]
        }
        //console.log(responseMsg)
        const pseudo = this.props.userInfos[0].pseudo
        const avatar = this.props.userInfos[0].avatar

        const dateElt = this.props.date
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
        const monthsTab = ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre']

        let dateSplited = dateFormat.split('/')
        let day = dateSplited[0]
        let month = parseInt(dateSplited[1], 10)
        
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

                <div className={this.props.way + ' ' + this.props.msgState + " msgBlock left col s12 m8 l6"} >
                    <div className="msgOverlay" id={conversation.id} onClick={this.props.myClick}></div>
                    <i className="material-icons msgBulle">chat_bubble</i>

                   
                    {
                        conversation.responseTo !== null ? <div className="">{<Quote msg={responseMsg}/>}</div> : null
                    }

                    <span className="msgMessage col s12">{conversation.message}</span>
                    <span className="msgAuthor">{pseudo}</span>
                    <span className="msgDate">{hour + ':' + minute}</span>
                    <img className="msgAvatar" src={avatar} alt="" />

                </div>

            </div>
           
    
        )
    }
}

export default Message 
