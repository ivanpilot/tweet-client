import React from 'react';
import Tweet from './Tweet';
import '../styles/TweetList.css';

class TweetList extends React.Component {
  render(){
    const activeThreadId = this.props.activeThreadId
    const activeThread = this.props.threads.find((thread) => thread.id === activeThreadId)
    const tweets = activeThread.tweets

    return(
      <div className='tweet-list'>
      <div className='ui center aligned grid '>
        <Tweet tweets={tweets} />
      </div>
      </div>
    )
  }
}

export default TweetList;
