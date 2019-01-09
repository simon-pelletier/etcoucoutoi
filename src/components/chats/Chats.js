import React, { Component } from 'react';
//import moment from 'moment'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { sendMessage } from '../../store/actions/chatsActions'
import Conversation from './Conversation'

class Chats extends Component {

    state={
        message: '',
        author: ''
    }

    handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value,
          author: this.props.author.authId
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        //console.log(this.props.author.authId)
        /*this.setState({
            author: this.props.author.authId
        })*/
        this.props.sendMessage(this.state);
        this.setState({
            message: ''
        })
    }

    scrollToBottom() {
        const scrollHeight = this.messageList.scrollHeight;
        const height = this.messageList.clientHeight;
        const maxScrollTop = scrollHeight - height;
        this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
      
    componentDidUpdate() {
        this.scrollToBottom();
    }

    render () {

        const { mainChat } = this.props;
      
        return (
            <div className="page container">
                <div className="row conversation" ref={(div) => {this.messageList = div;}}>
                    <Conversation chat={mainChat} />
                </div>

                <div className="row sender">
                <form>
                    <div className="input-field col s8 offset-s2">
                        <input type="text" id='message' className="inputContact" value={this.state.message} onChange={this.handleChange} />
                    </div>
                    
                    <div className="input-field col s2 center">
                        <button type="submit" className="btn domiB z-depth-0 center col s12" onClick={this.handleSubmit}>SEND</button>
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
