import React, { Component } from 'react'


class Quote extends Component {

    render(){

        const responseMsg = this.props.msg[0]
        const responseAuthor = this.props.msg[1][0]
        //console.log(responseAuthor)

        return (
            <div className="col s12 msgResponse">

                <div className="responseAuthor">
                <i className="material-icons replyIcon">reply</i> {responseAuthor.pseudo}
                </div>

                <div className="responseMessage">
                    {responseMsg.message}
                    <div className="quoteImgContainer"><img src={responseMsg.link} className="quoteImg" alt=""/></div>
                </div>

            </div>
           
    
        )
    }
}

export default Quote 
