import React from 'react';
import EditableTweetList from './EditableTweetList'
import ThreadTabs from './ThreadTabs'

class TweetContainer extends React.Component {
  render(){
    return (
      <div className="ui center aligned">
        <ThreadTabs
          store={this.props.store}
          activeThreadId={this.props.activeThreadId}
          activeEditableTweetId={this.props.activeEditableTweetId}
          threads={this.props.threads}
        />
        <EditableTweetList
          store={this.props.store}
          activeThreadId={this.props.activeThreadId}
          activeEditableTweetId={this.props.activeEditableTweetId}
          threads={this.props.threads}
        />
      </div>
    )
  }
}

export default TweetContainer
