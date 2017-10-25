import React from 'react';
import EditableTweetList from './EditableTweetList'
import ThreadTabs from './ThreadTabs'

class TweetContainer extends React.Component {
  render(){
    return (
      <div className="ui center aligned">
        <ThreadTabs
          activeThreadId={this.props.activeThreadId}
          threads={this.props.threads}
          onTabClick={this.props.onTabClick}
        />
        <EditableTweetList
          store={this.props.store}
          activeThreadId={this.props.activeThreadId}
          threads={this.props.threads}
          handleTrashClick={this.props.handleTrashClick}
          onSubmitForm={this.props.onSubmitForm}
        />
      </div>
    )
  }
}

export default TweetContainer
