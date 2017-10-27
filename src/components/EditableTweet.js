import React from 'react';
import Tweet from './Tweet'
import MessageInput from './MessageInput'
import '../styles/EditableTweet.css'

class EditableTweet extends React.Component {

  render(){
    if(this.props.editableTweet.openForm){
      return(
        <div className='editable-tweet'>
          <MessageInput
            store={this.props.store}
            editableTweetId={this.props.editableTweet.id}
            tweet={this.props.editableTweet.tweet}
          />
        </div>
      )
    } else {
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
