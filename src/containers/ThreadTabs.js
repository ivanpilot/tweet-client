import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { triggerThread } from '../actions/Thread';
import { triggerEditableTweet } from '../actions/Tweet';
import { triggerEditableComment } from '../actions/Comment';
import { getAllThreads, getActiveThread } from '../reducers/tweetsByThread';
import { getEditableTweet } from '../reducers/Tweets';
import { getEditableComment } from '../reducers/Comments';
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
  } else if(editableCommentId){
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
    tabs: getAllThreads(state.tweetsByThread),
    activeThreadId: getActiveThread(state.tweetsByThread),
    editableTweet: getEditableTweet(state.entities.tweets),
    editableComment: getEditableComment(state.entities.comments.byId)
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
