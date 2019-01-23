import React, { Component } from 'react'
import './chats.scss'
import Quote from './Quote'
//import Lightbox from 'react-image-lightbox'


class Message extends Component {

    /*getItemForScroll(){
        if(this.props.lastItem){
            return (
                <div className={end + ' col s12'} ref={(div) => { this._end = div; }} ></div>
            )
        } else {
            return(
                <div className=' col s12' ></div>
            )
        }    
    }*/

    /*constructor(props){
        super(props)

        this.lastItem = this.props.lastItem
    }*/


    render(){

        const conversation = this.props.conversation
        const responseMsgTest = this.props.responseTo
        let responseMsg = null
        if (responseMsgTest){
            responseMsg = responseMsgTest[0]
        }
        
        let pseudo = 'loading'
        let avatar = 'loading'
        if (this.props.userInfos[0]){
            pseudo = this.props.userInfos[0].pseudo
            avatar = this.props.userInfos[0].avatar
        }
        //const pseudo = this.props.userInfos[0].pseudo
        //const avatar = this.props.userInfos[0].avatar

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

        
        /*let refItem = 'msg'
        if(this.lastItem){
            refItem = '_end'
            console.log('scroll config')
        }*/

        

        return (
            
            <div className='col s12' id={ date } >
       
                { 
                    dateElt !== null ? 
                    <div className="row" id={ conversation.createdAt.seconds } ><div className="msgDateInfo col s4 m3 l2 left">{day + ' ' + monthsTab[month - 1]}</div></div>
                    : null 
                }

                <div className={this.props.way + ' ' + this.props.msgState + " msgBlock left col s12 m8 l6"} >

                
                    <div className="msgOverlay" id={conversation.id} onClick={this.props.myClick}></div>
                    <i className="material-icons msgBulle">chat_bubble</i>
                   
                    {
                        conversation.responseTo !== null ? <div className="">{<Quote msg={responseMsg}/>}</div> : null
                    }

                    {
                        conversation.link !== null ? <div className="msgLinkContainer" ><img className="msgLink" src={conversation.linkThumb} alt="" onClick={this.props.onClick} /*onClick={(e) => this.imgZoom(e)}*/ /></div> : null
                    }

                    <span className="msgMessage col s12">{conversation.message}</span>
                    
                    <span className="msgAuthor">{pseudo}</span>
                    <span className="msgDate">{hour + ':' + minute}</span>
                    <div className="msgAvatarContainer" ><img className="msgAvatar" src={avatar} alt="" /></div>

                </div>

                {/*
                    this.lastItem ? <div id='_end'></div> : null
                */}

            </div>
           
    
        )
    }
}

export default Message 
