import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { sendMessage } from '../../store/actions/chatsActions'
import { storage } from '../../config/fbConfig'
import classNames from 'classnames'
import Dropzone from 'react-dropzone'
import loading from '../../assets/loading.gif'
import sendSound from '../../assets/send.wav'
import notificationSound from '../../assets/notification.mp3'
import AvatarEditor from 'react-avatar-editor'
import ReactDOM from 'react-dom'
import Conversation from './Conversation'

class Chats extends Component {

    constructor(props) {
        super(props)
        this.state = {
            message: '',
            author: '',
            link: null,
            responseTo: null,
            msgIsReady: false,
            linkThumb: null,
            linkPreview: null,
            file: null,
            loading: false
        }
        this.notificationSound = new Audio(notificationSound);
        this.sendSound = new Audio(sendSound);
        this.handleChange = this.handleChange.bind(this);
        this.lastLogin = this.props.lastLogin
        this.loadingGif = loading;
        this.scrollToLastItem = this.scrollToLastItem.bind(this)
    }

    state = {
        message: '',
        author: '',
        link: null,
        responseTo: null,
        msgIsReady: false,
        linkThumb: null,
        linkPreview: null,
        file: null,
        loading: false
    }

    setEditorRef = (editor) => this.editor = editor

    /**
    |--------------------------------------------------
    | Vérifie la conformité d'un message pour proposer l'envoi
    |--------------------------------------------------
    */
    validateMessage = () => {
        if (this.state.message.length > 0 && this.state.link !== loading) {
            this.setState({
                msgIsReady: true
            })
        } else {
            this.setState({
                msgIsReady: false
            })
        }
    }

    /**
    |--------------------------------------------------
    | Changements de states
    |--------------------------------------------------
    */
    handleChange = (e) => {
        if (e.target.value.length <= 150 && e.target.id !== 'link') {
            this.setState({
                [e.target.id]: e.target.value,
                author: this.props.author.authId
            }, () => { this.validateMessage() })
        }
    }

    /**
    |--------------------------------------------------
    | Lors de l'envoi d'un message
    |--------------------------------------------------
    */
    handleSubmit = (e) => {
        e.preventDefault()
        if (this.state.linkPreview !== null && (this.state.message !== '' && this.state.message.length <= 150)) {
            this.saveLink()
            this.setState({
                loading: true
            })
        } else {
            if (this.state.message !== '' && this.state.message.length <= 150) {
                this.sendSound.volume = 0.3;
                this.sendSound.play()
                this.props.sendMessage(this.state)
                this.setState({
                    message: '',
                    responseTo: null,
                    link: null
                }, () => {
                    this.validateMessage()
                })

            }
        }
    }

    /**
    |--------------------------------------------------
    | Création du'n blob lors de l'envoi d'une image
    |--------------------------------------------------
    */
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

    /**
    |--------------------------------------------------
    | Envoi de l'image blob sur Firestore
    |--------------------------------------------------
    */
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
                    this.setState({
                        linkThumb: url
                    }, () => { this.uploadLink(randomName) })

                })
            });
    }

    /**
    |--------------------------------------------------
    | Envoi de l'image originale dur Firestore
    |--------------------------------------------------
    */
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
                    }, () => { this.submitAfterLinkIdLoaded() })

                })
            });
    }

    /**
    |--------------------------------------------------
    | Fin de l'upload d'image et d'envoi de message
    |--------------------------------------------------
    */
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
            file: null,
            loading: false
        }, () => {
            this.validateMessage()
        })
    }

    /**
    |--------------------------------------------------
    | Affichage de l'AvatarEditor si une image est chargée
    |--------------------------------------------------
    */
    getLink() {
        if (this.state.linkPreview !== null) {
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

    /**
    |--------------------------------------------------
    | Au drop sur la zone picto Image
    |--------------------------------------------------
    */
    onDrop = (acceptedFiles, rejectedFiles) => {
        const image = acceptedFiles[0]
        this.setState({
            linkPreview: image,
            file: acceptedFiles[0]
        })

    }

    /**
    |--------------------------------------------------
    | Activation du bouton d'envoi de message si le message est validé
    |--------------------------------------------------
    */
    messageSender = () => {
        if (this.state.msgIsReady) {
            return (
                <button type="submit" className="btnSender" onClick={this.handleSubmit}><i className="material-icons senderIcon">send</i></button>
            )
        } else {
            return (
                <button type="submit" className="btnSenderDisabled" onClick={this.handleSubmit} disabled><i className="material-icons senderIcon">send</i></button>
            )
        }
    }

    /**
    |--------------------------------------------------
    | Au clic sur un message pour ajouter une citation
    |--------------------------------------------------
    */
    onClick = (e) => {
        e.preventDefault()
        if (this.state.responseTo === e.target.id) {
            this.setState({
                responseTo: null
            })
        } else {
            this.setState({
                responseTo: e.target.id
            })
        }
    }

    /**
    |--------------------------------------------------
    | Annuler l'ajout de citation
    |--------------------------------------------------
    */
    cancelResponse = (e) => {
        this.setState({
            responseTo: null
        })
    }

    /**
    |--------------------------------------------------
    | Annuler l'envoi d'image
    |--------------------------------------------------
    */
    cancelLink = (e) => {
        this.setState({
            linkPreview: null
        })
    }

    /**
    |--------------------------------------------------
    | Récupère un message via son Id
    |--------------------------------------------------
    */
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

    /**
    |--------------------------------------------------
    | Pour différents cycles de vie -> scroll To Last Item
    |--------------------------------------------------
    */
    componentWillReceiveProps(nextProps) {
        this.scrollToLastItemNoAnim()
    }

    componentDidUpdate() {
        this.scrollToLastItemNoAnim()
    }

    componentDidMount() {
        this.scrollToLastItemNoAnim()
    }

    clickToBottom = () => {
        this.scrollToLastItem()
    }

    /**
    |--------------------------------------------------
    | Animation du scroll
    |--------------------------------------------------
    */
    scrollFromToIn(from, destination, duration) {
        let y = from + destination;
        let baseY = (from + y) * 0.5;
        let difference = from - baseY;
        let startTime = performance.now();

        function step() {
            let normalizedTime = (performance.now() - startTime) / duration;
            if (normalizedTime > 1) normalizedTime = 1;

            window.scrollTo(0, baseY + difference * Math.cos(normalizedTime * Math.PI));
            if (normalizedTime < 1) window.requestAnimationFrame(step);
        }
        window.requestAnimationFrame(step);
    }

    /**
    |--------------------------------------------------
    | Scroll au dernier élément de chat avec une animation
    |--------------------------------------------------
    */
    scrollToLastItem(event) {
        const endNode = ReactDOM.findDOMNode(this)
        let child = null
        if (endNode instanceof HTMLElement) {
            child = endNode.querySelector('#_end');
        }
        if (child instanceof HTMLElement) {
            let initialY = window.pageYOffset || document.documentElement.scrollTop
            this.scrollFromToIn(initialY, child.offsetTop, 500)
        }
    }

    /**
    |--------------------------------------------------
    | Scroll au dernier élément du chat sans animation
    |--------------------------------------------------
    */
    scrollToLastItemNoAnim(event) {
        const endNode = ReactDOM.findDOMNode(this)
        let child = null
        if (endNode instanceof HTMLElement) {
            child = endNode.querySelector('#_end');
        }
        if (child instanceof HTMLElement) {
            window.scrollTo(0, child.offsetTop)
        }
    }

    /**
    |--------------------------------------------------
    | Génère des noms d'images
    |--------------------------------------------------
    */
    guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    render() {
        const { mainChat } = this.props
        const maxMsgLength = 150
        return (

            <div className="chatPage" >

                {
                    this.state.loading === true ?
                        <div className="loading">
                            <img className="loadingGif" src={this.loadingGif} alt="LOADING" />
                        </div>
                        : null
                }

                <div className="witnessResponse row">
                    {
                        this.state.responseTo ? <span><i className="material-icons replyIcon">reply</i> {this.getMessage(this.state.responseTo)}<i className="material-icons cancelResponse" onClick={this.cancelResponse}>cancel</i> </span> : null
                    }
                </div>

                <button type="submit" className="btnToBottom" onClick={this.clickToBottom}><i className="material-icons btnToBottomIcon">arrow_downward</i></button>



                <div className=" conversation col s12 m10">
                    <Conversation chat={mainChat} myClick={this.onClick} msgState={this.state.responseTo} />
                    <div id='_end'></div>
                </div>

                <div className="sender" >

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
                                    {({ getRootProps, getInputProps, isDragActive }) => {
                                        return (

                                            <div
                                                {...getRootProps()}
                                                className={classNames('dropzone btnChatImg', { 'dropzone--isActive': isDragActive })}

                                            >
                                                <input {...getInputProps()} />
                                                {
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
    return {
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
        { collection: 'mainChat', orderBy: ['createdAt', 'asc'] }
    ])
)(Chats)
