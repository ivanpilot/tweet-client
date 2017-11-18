import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { triggerThread } from '../actions/Thread';
import { triggerEditableTweet } from '../actions/Tweet';
import { triggerEditableComment } from '../actions/Comment';
import { getAllThreads, getActiveThread } from '../reducers/ThreadsById';
import { getEditableTweet } from '../reducers/Tweets';
import { getEditableComment } from '../reducers/CommentsById';
import { Tabs } from '../components/Tabs';

//can dispatch several action only because of redux-thunk
function handleClickTab(id, activeThreadId, editableTweetId, editableCommentId){
  if(editableTweetId && editableCommentId){
    return (dispatch) => {
      dispatch(triggerThread(activeThreadId))
      dispatch(triggerThread(id))
      dispatch(triggerEditableTweet(editableTweetId))
      dispatch(triggerEditableComment(editableCommentId))
    }
  } else if(editableTweetId) {
    return (dispatch) => {
      dispatch(triggerThread(activeThreadId))
      dispatch(triggerThread(id))
      dispatch(triggerEditableTweet(editableTweetId))
    }
  } else if(!editableTweetId && editableCommentId){
    return (dispatch) => {
      dispatch(triggerThread(activeThreadId))
      dispatch(triggerThread(id))
      dispatch(triggerEditableComment(editableCommentId))
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
    editableTweet: getEditableTweet(state.tweets),
    editableComment: getEditableComment(state.commentsById)
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
