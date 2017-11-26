import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { triggerThread, loadTweets } from '../actions/Thread';
import { triggerEditableTweet, triggerActivableTweet } from '../actions/Tweet';
import { triggerEditableComment } from '../actions/Comment';
import { getAllThreads, getActiveThread } from '../reducers/tweetsByThread';
import { getEditableTweet, getActiveTweet } from '../reducers/Tweets';
// import { getEditableComment } from '../reducers/Comments';
import { Tabs } from '../components/Tabs';


class ThreadTabs extends React.Component{
  componentDidMount(){
    this.props.firstLoadingTweets(this.props.activeThreadId)
  }


  render(){
    return(
      <Tabs
        tabs={this.props.tabs}
        activeThreadId={this.props.activeThreadId}
        editableTweet={this.props.editableTweet}
        activeTweet={this.props.activeTweet}
        handleClickTab={this.props.handleClickTab}
      />
    )
  }
}


function loadTweetsForThread(threadId){
  return (dispatch, getState) => {
    const threadName = getState().tweetsByThread[threadId].name
    const tweets = getState().entities.tweets.byId
    const listOfTweets = threadName === 'Wall' ? (Object.keys(tweets)) : (Object.keys(tweets).filter(id => tweets[id].author_id === 1))
    return dispatch(loadTweets(threadId, listOfTweets))
  }
}


function handleClickTab(id, activeThreadId, activeTweetId){
  if(activeTweetId){
    return (dispatch) => {
      dispatch(triggerThread(activeThreadId))
      dispatch(triggerThread(id))
      dispatch(triggerActivableTweet(activeTweetId))
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

function firstLoadingTweets(threadId){
  return (dispatch) => {
    dispatch(loadTweetsForThread(threadId))
  }
}



const mapStateToProps = (state) => {
  return {
    tabs: getAllThreads(state.tweetsByThread),
    activeThreadId: getActiveThread(state.tweetsByThread),
    editableTweet: getEditableTweet(state.entities.tweets),
    activeTweet: getActiveTweet(state.entities.tweets),
    // editableComment: getEditableComment(state.entities.comments.byId)
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    handleClickTab,
    firstLoadingTweets,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ThreadTabs)
