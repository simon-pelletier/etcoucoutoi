import React, { Component } from 'react'


class Quote extends Component {

    render(){

        const responseMsg = this.props.msg[0]
        const responseAuthor = this.props.msg[1][0]

        return (
            <div className="col s12 msgResponse">

                <div className="responseAuthor">
                <i className="material-icons replyIcon">reply</i> {responseAuthor.pseudo}
                </div>

                <div className="responseMessageContainer">
                    <div className="responseMessage">{responseMsg.message}</div>
                    {
                        responseMsg.link !== null ? <div className="quoteImgContainer"><img src={responseMsg.linkThumb} className="quoteImg" alt=""/></div> : null
                    }
                    
                </div>

            </div>
           
    
        )
    }
}

export default Quote 
