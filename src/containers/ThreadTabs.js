import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { triggerThread, loadTweets } from '../actions/Thread';
import { triggerEditableTweet } from '../actions/Tweet';
import { triggerEditableComment } from '../actions/Comment';
import { getAllThreads, getActiveThread } from '../reducers/tweetsByThread';
import { getEditableTweet } from '../reducers/Tweets';
import { getEditableComment } from '../reducers/Comments';
import { Tabs } from '../components/Tabs';

function loadTweetsForThread(threadId){
  return (dispatch, getState) => {
    const threadName = getState().tweetsByThread[threadId].name
    const tweets = getState().entities.tweets.byId
    // debugger
    const listOfTweets = threadName === 'Wall' ? (Object.keys(tweets)) : (Object.keys(tweets).filter(id => tweets[id].author_id === 1))
    // const tweets = getState().entities.tweets.byId
    // const listOfTweets = Object.keys(tweets).filter(id => tweets[id].author_id === '1' )
    // return dispatch(loadTweets(threadId, listOfTweets))
    return dispatch(loadTweets(threadId, listOfTweets))
  }
}


//can dispatch several action only because of redux-thunk
function handleClickTab(id, activeThreadId, editableTweetId, editableCommentId){
  if(editableTweetId && editableCommentId){
    return (dispatch) => {
      dispatch(triggerThread(activeThreadId))
      dispatch(triggerThread(id))
      dispatch(triggerEditableTweet(editableTweetId))
      dispatch(triggerEditableComment(editableCommentId))
      dispatch(loadTweetsForThread(id))
    }
  } else if(editableTweetId) {
    return (dispatch) => {
      dispatch(triggerThread(activeThreadId))
      dispatch(triggerThread(id))
      dispatch(triggerEditableTweet(editableTweetId))
      dispatch(loadTweetsForThread(id))
    }
  } else if(editableCommentId){
    return (dispatch) => {
      dispatch(triggerThread(activeThreadId))
      dispatch(triggerThread(id))
      dispatch(triggerEditableComment(editableCommentId))
      dispatch(loadTweetsForThread(id))
    }
  } else {
    return (dispatch) => {
      dispatch(triggerThread(activeThreadId))
      dispatch(triggerThread(id))
      dispatch(loadTweetsForThread(id))
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
