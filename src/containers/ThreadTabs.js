import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { triggerThread } from '../actions/Thread'
import { triggerEditable } from '../actions/Tweet'
import { getAllThreads, getActiveThread } from '../reducers/ThreadsById';
import { getEditableTweet } from '../reducers/TweetsById';
import { Tabs } from '../components/Tabs';

//can dispatch several action only because of redux-thunk
function handleClickTab(id, activeThreadId, editableId){
  if(editableId){
    return (dispatch) => {
      dispatch(triggerThread(activeThreadId))
      dispatch(triggerThread(id))
      dispatch(triggerEditable(editableId))
    }
  } else {
    return (dispatch) => {
      dispatch(triggerThread(activeThreadId))
      dispatch(triggerThread(id))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    tabs: getAllThreads(state.threadsById),
    activeThreadId: getActiveThread(state.threadsById),
    editableTweet: getEditableTweet(state.tweetsById)
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    handleClickTab,
  }, dispatch)
}

export const ThreadTabs = connect (
  mapStateToProps,
  mapDispatchToProps,
)(Tabs)
