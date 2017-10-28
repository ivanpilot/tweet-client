import React from 'react';
import Tweet from './Tweet'
import MessageInput from './MessageInput'
import '../styles/EditableTweet.css'

class EditableTweet extends React.Component {

  render(){
    // debugger
    // if(this.props.editableTweet.openForm){
    if(this.props.editableTweet.id === this.props.activeEditableTweetId){
      // debugger
      return(
        <div className='editable-tweet'>
          <MessageInput
            store={this.props.store}
            editableTweetId={this.props.editableTweet.id}
            tweet={this.props.editableTweet.tweet}
            activeEditableTweetId={this.props.activeEditableTweetId}
          />
        </div>
      )
    } else {
      // debugger
      return(
        <div className='editable-tweet'>
          <Tweet
            store={this.props.store}
            editableTweetId={this.props.editableTweet.id}
            tweet={this.props.editableTweet.tweet}
          />
        </div>
      )
    }
  }
}

export default EditableTweet
