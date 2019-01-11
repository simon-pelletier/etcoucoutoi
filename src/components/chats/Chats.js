import React, { Component } from 'react';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { sendMessage } from '../../store/actions/chatsActions'
import Conversation from './Conversation'

class Chats extends Component {

    state={
        message: '',
        author: '',
        //pseudo: '',
        link: null,
        responseTo: null
    }

    handleChange = (e) => {
        if(e.target.value.length <= 150){
            this.setState({
                [e.target.id]: e.target.value,
                author: this.props.author.authId
                //pseudo: this.props.author.pseudo
              })
        }
        
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if(this.state.message !== '' && this.state.message.length < 150){
            this.props.sendMessage(this.state)
            this.setState({
                message: '',
                responseTo: null
            })
        }
        //console.log(this.props.author.authId)
        /*this.setState({
            author: this.props.author.authId
        })*/
        
    }

    scrollToBottom() {
        const scrollHeight = this.messageList.scrollHeight;
        const height = this.messageList.clientHeight;
        const maxScrollTop = scrollHeight - height;
        this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
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

    getMessage = (id) => {
        const { mainChat } = this.props
        //const message = 
        
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
        this.scrollToBottom();
    }

    render () {

        const { mainChat } = this.props
        const maxMsgLength = 150
      
        return (

            <div className="chatPage row">

                <div className=" conversation col s12" ref={(div) => {this.messageList = div;}}>
                    <Conversation chat={mainChat} myClick={this.onClick} msgState={this.state.responseTo} />
                </div>

                <div className="sender col s12">
                    <div className="witnessResponse">{
                        this.state.responseTo ? <span><i className="material-icons">reply</i> {this.getMessage(this.state.responseTo)}</span> : null
                        }</div>
                    <form>
                        <div className="input-field">
                            <input type="text" id='message' className="inputContact" value={this.state.message} onChange={this.handleChange} />
                            <span className="counterMsg" >{this.state.message.length + '/' + maxMsgLength} </span>
                            <button type="submit" className="btn domiB z-depth-0 center" onClick={this.handleSubmit}><i className="material-icons">send</i></button>
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
