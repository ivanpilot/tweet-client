import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { triggerThread } from '../actions/Thread'
import { allThreads, activeThread } from '../reducers/ThreadsById';
import { Tabs } from '../components/Tabs';

const mapStateToProps = (state) => {
  return {
    tabs: allThreads(state.threadsById),
    activeThreadId: activeThread(state.threadsById)
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    handleClickTab,
  }, dispatch)
}

//can dispatch several action only because of redux-thunk
function handleClickTab(id, activeThreadId){
  return (dispatch) => {
    dispatch(triggerThread(activeThreadId))
    dispatch(triggerThread(id))
  }
}

export const ThreadTabs = connect (
  mapStateToProps,
  mapDispatchToProps,
)(Tabs)
