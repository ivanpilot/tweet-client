import React from 'react';
import { offEditableTweetMode } from '../actions/EditableTweet';
import { openThread } from '../actions/Thread';
// import { store } from '../store'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tabs } from './Tabs';


// handleClickTab = (threadId) => (
//    {
//   offEditableTweetMode(),
//   openThread(threadId)
// })

const MapStateToTabsProps = (state) => {
  const tabs = state.threads.map(t => (
    {
      id: t.id,
      name: t.name,
      active: t.id === state.activeThreadId
    }
  ))

  return {
    tabs
  }
}

// const MapDispatchToTabsProps = (dispatch, threadId) => {
//   // debugger
//   return(
//     bindActionCreators({
//       offEditableTweetMode: offEditableTweetMode(),
//       openThread: openThread(threadId)
//     }, dispatch)
//   )
// }
const MapDispatchToTabsProps = (dispatch) => (
  {
    handleClickTab: (threadId) => (
      dispatch(offEditableTweetMode()),
      dispatch(openThread(threadId))
    )
  }
)

export const ThreadTabs = connect(MapStateToTabsProps, MapDispatchToTabsProps)(Tabs)

// class ThreadTabs extends React.Component {
//
//   componentDidMount(){
//     store.subscribe(() => this.forceUpdate())
//   }
//
//   handleClickTab = (threadId) => {
//     store.dispatch(offEditableTweetMode())
//     store.dispatch(openThread(threadId))
//   }
//
//   render(){
//     const state = store.getState()
//     const activeThreadId = state.activeThreadId
//     const tabs = state.threads.map(t => (
//       {
//         id: t.id,
//         name: t.name,
//         active: t.id === activeThreadId
//       }
//     ))
//
//     return(
//       <Tabs
//         tabs={tabs}
//         handleClickTab={this.handleClickTab}
//       />
//     )
//   }
// }
//
// export default ThreadTabs
