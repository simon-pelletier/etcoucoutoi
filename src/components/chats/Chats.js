import React, { Component } from 'react';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { sendMessage } from '../../store/actions/chatsActions'
import Conversation from './Conversation'

import { storage } from '../../config/fbConfig'

import classNames from 'classnames'
import Dropzone from 'react-dropzone'

import loading from '../../assets/loading.gif'

import notificationSound from '../../assets/notification.mp3'

class Chats extends Component {

    constructor(props) {
        super(props)
        this.audio = new Audio(notificationSound);
        this.handleChange = this.handleChange.bind(this);
    }

    state={
        message: '',
        author: '',
        link: null,
        responseTo: null,
        msgIsReady: false
    }



    componentDidMount() {
        this.forceUpdateHandler()
    }

    forceUpdateHandler(){
        console.log('🔺 WARNING : Force Update 🔺')
        this.forceUpdate()
        
    }
    
    messageSender = () => {
        
        if(this.state.msgIsReady){
            return (
                <button type="submit" className="btnSender" onClick={this.handleSubmit}><i className="material-icons senderIcon">send</i></button>
            )
        } else {
            return (
                <button type="submit" className="btnSenderDisabled" onClick={this.handleSubmit} disabled><i className="material-icons senderIcon">send</i></button>
            )
        }    
                                    
    }

    validateMessage = () => {
        if(this.state.message.length > 0 && this.state.link !== loading){
            this.setState({
                msgIsReady: true
            })
        } else {
            this.setState({
                msgIsReady: false
            })
        }
    }


    handleChange = (e) => {
        if(e.target.value.length <= 150 && e.target.id !== 'link'){
            this.setState({
                [e.target.id]: e.target.value,
                author: this.props.author.authId
              }, () => { this.validateMessage() })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if(this.state.message !== '' && this.state.message.length <= 150){
            this.props.sendMessage(this.state)
            this.setState({
                message: '',
                responseTo: null,
                link: null
            }, () => { this.validateMessage() })
            this.forceUpdateHandler()
        }
    }

    scrollToBottom() {
        const scrollHeight = this.messageList.scrollHeight
        const height = this.messageList.clientHeight
        const maxScrollTop = scrollHeight - height
        this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0
    }

    onClick = (e) => {
        e.preventDefault()
        
        if (this.state.responseTo === e.target.id){
            this.setState({
                responseTo: null
            })
        } else {
            this.setState({
                responseTo: e.target.id
            })
        }

    }

    cancelResponse = (e) => {
        this.setState({
            responseTo: null
        })
    }

    cancelLink = (e) => {
        this.setState({
            link: null
        })
    }

    getMessage = (id) => {
        const { mainChat } = this.props

        return mainChat
          .filter(msg => {
            return msg.id === id
          }).map(msg => {
            return (
              msg.message
            )
        })
    }

    getLink = () => {
        return (
            <div className="chatLinkContainer">
                <i className="material-icons cancelLink" onClick={this.cancelLink}>cancel</i>
                <div className="chatLinkPreview">
                    <img className="chatLinkPreviewImg" src={this.state.link} alt="NO LINK"/>
                    
                </div>
            </div>
        )
    }
      
    componentDidUpdate() {
        console.log('➰ NOTE : Component Did Update ➰')
        this.scrollToBottom();
        //this.audio.play()
    }

    guid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    

    onDrop = (acceptedFiles, rejectedFiles) => {
        const image = acceptedFiles[0]
        const randomName = this.guid();
        const uploadTask = storage.ref(`pictures/originals/${randomName}`).put(image)

        this.setState({
            link: loading//,
            //msgIsReady: false
        }, () => { this.validateMessage() })

        uploadTask.on('state_changed', 
        (snapshot) => {
          // progress
        }, 
        (error) => {
          // error
          console.log(error);
        }, 
        () => {
          //complete
          storage.ref('pictures/originals').child(randomName).getDownloadURL().then(url => {
            this.setState({
              link: url//,
              //msgIsReady: true
            }, () => { this.validateMessage() })
          })
        });
    }

    render () {
        
        const { mainChat } = this.props
        const maxMsgLength = 150
      
        return (

            <div className="chatPage row" >

                <div className=" conversation col s12" ref={(div) => {this.messageList = div;}} >
                    <Conversation chat={mainChat} myClick={this.onClick} msgState={this.state.responseTo} />
                </div>

                <div className="sender col s12" >
                    <div className="witnessResponse">
                        {
                            this.state.responseTo ? <span><i className="material-icons replyIcon">reply</i> {this.getMessage(this.state.responseTo)}<i className="material-icons cancelResponse" onClick={this.cancelResponse}>cancel</i> </span> : null
                        }
                    </div>

                    <form>
                        <div className="senderBlock">
                            {
                                this.state.link !== null ?
                                this.getLink() :
                                null
                            }

                            <div className="inputChat">
                                <input type="text" id='message' className="inputContactChat" value={this.state.message} onChange={this.handleChange} />
                                <span className="counterMsg" >{this.state.message.length + '/' + maxMsgLength} </span>
                            </div>

                            <div className="senderBlockButtons">
                                <Dropzone onDrop={this.onDrop}>
                                    {({getRootProps, getInputProps, isDragActive}) => {
                                    return (

                                        <div
                                        {...getRootProps()}
                                        className={classNames('dropzone btnChatImg', {'dropzone--isActive': isDragActive})}
                                        
                                        >
                                        <input {...getInputProps()} />
                                        { //accept="image/*"
                                            isDragActive ?
                                            <i className="material-icons senderIcon">photo</i> :
                                            <i className="material-icons senderIcon">photo</i>
                                        }
                                        </div>

                                    )
                                    }}
                                </Dropzone>

                                

                                {
                                    this.messageSender()
                                }

                                {/*
                                    this.state.msgIsReady ?
                                    <button type="submit" className="btnSender" onClick={this.handleSubmit}><i className="material-icons senderIcon">send</i></button> :
                                    <div className="btnSender btnDisabled" ><i className="material-icons senderIcon">send</i></div>
                                */}
                                
                            </div>

                        </div>
                    </form>

                </div>

            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return{
      mainChat: state.firestore.ordered.mainChat
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (creds) => dispatch(sendMessage(creds))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
      { collection: 'mainChat', orderBy: ['createdAt', 'asc']}
    ])
)(Chats)
