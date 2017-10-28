import React from 'react';
import EditableTweet from './EditableTweet';
import '../styles/EditableTweetList.css';

class EditableTweetList extends React.Component {

  render(){
    // debugger
    const activeThreadId = this.props.activeThreadId
    const activeThread = this.props.threads.find((thread) => thread.id === activeThreadId)
    const editableTweets = activeThread.editableTweets.map((editableTweet, index) => (
      <div
        className='ui center aligned grid'
        key={index}
      >
        <EditableTweet
          store={this.props.store}
          editableTweet={editableTweet}
          activeEditableTweetId={this.props.activeEditableTweetId}
        />
      </div>
    ))

    return(
      <div className='tweet-list'>
        {editableTweets}
      </div>
    )
  }
}

export default EditableTweetList;
