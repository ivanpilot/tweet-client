import React from 'react';
import MessageInput from './MessageInput'
import '../styles/VerticalMenu.css'

class VerticalMenu extends React.Component {
  render(){
    return(
      <div className='vertical-menu'>
        <div className='ui header item center aligned'>
          Tweet
        </div>
        <MessageInput
          store={this.props.store}
          activeThreadId={this.props.activeThreadId}
        />
      </div>
    )
  }
}

export default VerticalMenu
