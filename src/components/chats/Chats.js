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

import sendSound from '../../assets/send.wav'
//import deniedSound from '../../assets/denied.mp3'
import notificationSound from '../../assets/notification.mp3'

import AvatarEditor from 'react-avatar-editor'

class Chats extends Component {

    constructor(props) {
        super(props)
        this.state={
            message: '',
            author: '',
            link: null,
            responseTo: null,
            msgIsReady: false,
            linkThumb: null,
            linkPreview: null,
            file: null
        }
        
        this.notificationSound = new Audio(notificationSound);
        this.sendSound = new Audio(sendSound);
        this.handleChange = this.handleChange.bind(this);
        this.lastLogin = this.props.lastLogin

    }

    state={
        message: '',
        author: '',
        link: null,
        responseTo: null,
        msgIsReady: false,
        linkThumb: null,
        linkPreview: null,
        file: null
    }

    setEditorRef = (editor) => this.editor = editor

    handleSubmit = (e) => {
        e.preventDefault()
        if(this.state.linkPreview !== null && (this.state.message !== '' && this.state.message.length <= 150)){
            this.saveLink()

        } else {
            if(this.state.message !== '' && this.state.message.length <= 150){
                this.sendSound.volume = 0.3;
                this.sendSound.play()
                this.props.sendMessage(this.state)
                this.setState({
                    message: '',
                    responseTo: null,
                    link: null
                }, () => { 
                    this.validateMessage() 
                    this.forceUpdateHandler()
                })
                
            } 
        }
    }

    saveLink = () => {
        
        if (this.editor) {

            const canvasURL = this.editor.getImageScaledToCanvas().toDataURL();
            let imageURL;
              fetch(canvasURL)
              .then(res => res.blob())
              .then(blob => (this.setState({
                linkPreview: imageURL
                }, this.uploadLinkBlob(blob)))
              )
        }
    }

    uploadLink = (randomName) => {
        const uploadTask = storage.ref(`pictures/originals/${randomName}`).put(this.state.file)

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
                    link: url
                }, () => { this.submitAfterLinkIdLoaded()})
                
              })
            });
    }

    submitAfterLinkIdLoaded = () => {
        this.sendSound.volume = 0.3;
        this.sendSound.play()
        this.props.sendMessage(this.state)
        this.setState({
            message: '',
            responseTo: null,
            link: null,
            linkThumb: null,
            linkPreview: null,
            file: null
        }, () => { 
            this.validateMessage() 
            this.forceUpdateHandler()
        })
    }

    uploadLinkBlob = (blob) => {

        let blobFormat = blob.slice(0, blob.size, "image/jpeg")
        const randomName = this.guid();


        const uploadTaskPreview = storage.ref(`pictures/thumbs/${randomName}`).put(blobFormat)

        uploadTaskPreview.on('state_changed', 
            (snapshot) => {
              // progress
            }, 
            (error) => {
              // error
              console.log(error);
            }, 
            () => {
              //complete
              storage.ref('pictures/thumbs').child(randomName).getDownloadURL().then(url => {
                //console.log(url)
                this.setState({
                  linkThumb: url
                  //msgIsReady: true
                }, () => { this.uploadLink(randomName)})
                
              })
            });
    }

    getLink(){
        
        if (this.state.linkPreview !== null){
            return (
                <div>
                <i className="material-icons cancelLink" onClick={this.cancelLink}>cancel</i>
                <div className="chatLinkContainer">
                    
                    <AvatarEditor
                        ref={this.setEditorRef}
                        image={this.state.linkPreview}
                        width={150}
                        height={150}
                        border={0}
                        scale={1.5}
                    />
 
                </div>
                </div>
            )

        } else {
            return null
        }
    }


    onDrop = (acceptedFiles, rejectedFiles) => {

        const image = acceptedFiles[0]

        this.setState({
            linkPreview: image,
            file: acceptedFiles[0]
        })

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
            linkPreview: null
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
                                this.getLink()
                            }

                            <div className="inputChat">
                                <input type="text" id='message' className="inputContactChat" value={this.state.message} onChange={this.handleChange} />
                                <span className="counterMsg" >{this.state.message.length + '/' + maxMsgLength} </span>
                            </div>

                            <div className="senderBlockButtons">
                                <Dropzone 
                                    accept="image/jpeg, image/png"
                                    onDrop={this.onDrop}
                                    multiple={false}
                                >
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
