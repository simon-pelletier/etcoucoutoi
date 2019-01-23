import React, { Component } from 'react'


class Quote extends Component {

    render(){

        let responseMsg = ''
        let responseAuthor = ''
        let author = ''
        let linkThumb = ''
        let link = ''
        let message = ''

        if (this.props.msg[0]){
            responseMsg = this.props.msg[0]
            responseAuthor = this.props.msg[1][0]
            if (this.props.msg[1][0]){
                author = responseAuthor.pseudo
            }
            linkThumb = responseMsg.linkThumb
            link = responseMsg.link
            message = responseMsg.message
        }

        return (
            <div className="col s12 msgResponse">

                <div className="responseAuthor">
                <i className="material-icons replyIcon">reply</i> {author}
                </div>

                <div className="responseMessageContainer">
                    <div className="responseMessage">{message}</div>
                    {
                        link !== null ? <div className="quoteImgContainer"><img src={linkThumb} className="quoteImg" alt=""/></div> : null
                    }
                    
                </div>

            </div>

        )
    }
}

export default Quote 
