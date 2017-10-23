import React from 'react';
import TweetList from './TweetList'
import ThreadTabs from './ThreadTabs'

class TweetContainer extends React.Component {
  render(){
    return (
      <div className="ui center aligned">
        <ThreadTabs
          activeThreadId={this.props.activeThreadId}
          threads={this.props.threads}
        />
        <TweetList
          activeThreadId={this.props.activeThreadId}
          threads={this.props.threads}
        />
      </div>
    )
  }
}

export default TweetContainer
