import React from 'react';
import MessageInput from './MessageInput'

class VerticalMenu extends React.Component {
  render(){
    return(
      <div className='ui secondary vertical menu centered grid'>
        <div className='ui header item'>
          Tweets
        </div>
        <div className="ui form">
          <div className="field">

              <MessageInput />

          </div>
        </div>
      </div>
    )
  }
}

export default VerticalMenu
