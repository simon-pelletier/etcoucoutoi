import React from 'react'
import Message from './Message'

const Conversation = ({chat}) => {
  //console.log(chat)
  return (
    
    <div className="skillBlock row">

      { chat && chat
      /*.filter(skill => {
        if (cat === 'none'){
          return skill.rate === "0" || skill.rate === 0
        } else {
          return skill.category === cat && skill.rate > 0
        }
      })
      .sort(function(a, b){return 0.5 - Math.random()})*/
      .map(chat => {
        return (
            <Message conversation={chat} key={chat.id}/>
        )
      })}

    </div>
    
  )
}

export default Conversation