import React from 'react'

class ThreadTabs extends React.Component {
  render(){

    const activethreadId = this.props.activeThreadId
    const tabs = this.props.threads.map((thread, index) => (
      <a className={thread.id === activethreadId ? 'active item' : 'item'}>
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
