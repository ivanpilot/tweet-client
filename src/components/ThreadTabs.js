import React from 'react'

class ThreadTabs extends React.Component {
  render(){

    const activethreadId = this.props.activeThreadId
    const tabs = this.props.threads.map((thread, index) => (
      <a
        key={index}
        className={thread.id === activethreadId ? 'active item' : 'item'}
        onClick={() => {
          this.props.store.dispatch({
            type: 'CLOSE_ALL_FORMS',
          })
          this.props.store.dispatch({
            type: 'OPEN_THREAD',
            threadId: thread.id
          })
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
