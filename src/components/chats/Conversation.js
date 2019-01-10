import React from 'react'
import Message from './Message'

const Conversation = ({chat}) => {

  let lastAuthor = ''
  let wayClass = 'msgLeft'

  return (
    
    <div className="row">

      { chat && chat
      .map(chat => {

        const currentAuthor = chat.author

        if (currentAuthor !== lastAuthor){
          lastAuthor = currentAuthor
          if (wayClass === 'msgLeft'){
            wayClass = 'msgRight'
          } else {
            wayClass = 'msgLeft'
          }
        } else {
          lastAuthor = currentAuthor
        }
        return (
          <Message conversation={chat} key={chat.id} way={wayClass}/>
        )

      })}

    </div>
    
  )
}

export default Conversation