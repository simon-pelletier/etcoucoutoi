import React from 'react'

const Message = ({conversation}) => {
  //console.log(skills)
    return (
        
        <div>
            <div className="">{conversation.message}</div>
            <div className="">From : {conversation.author}</div>
            <div className="">At : {conversation.createdAt.seconds}</div>
        </div>
        


    )
}

export default Message