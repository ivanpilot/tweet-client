// import React from 'react';
import { offEditableTweetMode } from '../actions/EditableTweet';
import { openThread } from '../actions/Thread';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { allThreads, activeThread } from '../reducers/ThreadsById';
import { Tabs } from '../components/Tabs';

// const MapStateToTabsProps = (state) => {
//   const tabs = state.threads.map(t => (
//     {
//       id: t.id,
//       name: t.name,
//       active: t.id === state.activeThreadId
//     }
//   ))
//
//   return {
//     tabs
//   }
//
// }

const MapStateToProps = (state) => {
  // debugger
  return {
    tabs: allThreads(state.threadsById),
    activeThreadId: activeThread(state.threadsById)
  }
}

const MapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    handleClickTab: handleClickTab
  }, dispatch)
}

// function handleClickTab(id){
//   debugger
//   return {
//     type: 'TRIGGER_THREAD',
//     id: id
//   }
// }

function handleClickTab(id, activeThreadId){
  return (dispatch) => {
    dispatch({
      type: 'TRIGGER_THREAD',
      id: id
    })
    dispatch({
      type: 'TRIGGER_THREAD',
      id: activeThreadId
    })
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
// const MapDispatchToTabsProps = (dispatch) => (
//   {
//     handleClickTab: (threadId) => {
//       dispatch(offEditableTweetMode())
//       dispatch(openThread(threadId))
//     }
//   }
// )

export const ThreadTabs = connect (
  MapStateToProps,
  MapDispatchToProps
)(Tabs)

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
