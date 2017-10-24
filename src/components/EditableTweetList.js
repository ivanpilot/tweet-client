import React from 'react';
import EditableTweet from './EditableTweet';
import '../styles/EditableTweetList.css';

class EditableTweetList extends React.Component {
  render(){
    const activeThreadId = this.props.activeThreadId
    const activeThread = this.props.threads.find((thread) => thread.id === activeThreadId)
    const editableTweets = activeThread.tweets.map((tweet, index) => (
      <div
        className='ui center aligned grid'
        key={index}
      >
        <EditableTweet
          key={index}
          tweet={tweet}
          handleTrashClick={this.props.handleTrashClick}
          onSubmitForm={this.props.onSubmitForm}
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
