import React from 'react'
import {offEditableTweetMode} from '../actions/EditableTweet'
import {openThread} from '../actions/Thread'

class ThreadTabs extends React.Component {
  render(){

    const activethreadId = this.props.activeThreadId
    const tabs = this.props.threads.map((thread, index) => (
      <a
        key={index}
        className={thread.id === activethreadId ? 'active item' : 'item'}
        onClick={() => {
          this.props.store.dispatch(offEditableTweetMode())
          this.props.store.dispatch(openThread(thread.id))
        }}
      >
        {thread.name}
      </a>
    ))

    return(
      <div className="ui tabular menu">
        {tabs}
      </div>
    )
  }
}

export default ThreadTabs
