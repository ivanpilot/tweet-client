import React from 'react'
import {offEditableTweetMode} from '../actions/EditableTweet'
import {openThread} from '../actions/Thread'
import {store} from '../store'
import {Tabs} from './Tabs'

class ThreadTabs extends React.Component {

  componentDidMount(){
    store.subscribe(() => this.forceUpdate())
  }

  handleClickTab = (threadId) => {
    store.dispatch(offEditableTweetMode())
    store.dispatch(openThread(threadId))
  }

  render(){
    const state = store.getState()
    const activeThreadId = state.activeThreadId
    const tabs = state.threads.map(t => (
      {
        id: t.id,
        name: t.name,
        active: t.id === activeThreadId
      }
    ))

    return(
      <Tabs
        tabs={tabs}
        handleClickTab={this.handleClickTab}
      />
    )
  }
}

export default ThreadTabs
