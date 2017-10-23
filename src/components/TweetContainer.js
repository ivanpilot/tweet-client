import React from 'react';
import TweetList from './TweetList'
import ThreadTabs from './ThreadTabs'

class TweetContainer extends React.Component {
  render(){
    return (
      <div className="ui center aligned">
        <ThreadTabs />
        <TweetList />
      </div>
    )
  }
}

export default TweetContainer
