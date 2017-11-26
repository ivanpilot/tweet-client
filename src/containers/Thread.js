import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tabs } from '../components/Tabs';
import { TweetContainer } from '../components/TweetContainer';
import { triggerThread, loadTweets } from '../actions/Thread';
import { triggerEditableTweet, triggerActivableTweet } from '../actions/Tweet';
import { triggerEditableComment } from '../actions/Comment';
import { getAllThreads, getActiveThread } from '../reducers/tweetsByThread';
import { getEditableTweet, getActiveTweet } from '../reducers/Tweets';
// import { getEditableComment } from '../reducers/Comments';



class Thread extends React.Component{
  componentDidMount(){
    this.props.LoadingTweets(this.props.activeThreadId)
  }

  // componentDidUpdate(){
  //   debugger
  //   loadTweetsForThread(this.props.activeThreadId)
  // }
  // componentWillReceiveProps(nextProps){
  //   // debugger
  //   if(nextProps.active)
  //   this.props.LoadingTweets(this.props.activeThreadId)
  // }



  render(){
    // debugger
    return(
      <div>
        <Tabs
          tabs={this.props.tabs}
          activeThreadId={this.props.activeThreadId}
          editableTweet={this.props.editableTweet}
          activeTweet={this.props.activeTweet}
          handleClickTab={this.props.handleClickTab}
        />
        <TweetContainer
          activeTweet={this.props.activeTweet}
        />
      </div>
    )
  }
}


function loadTweetsForThread(threadId){
  return (dispatch, getState) => {
    const threadName = getState().tweetsByThread[threadId].name
    const tweets = getState().entities.tweets.byId
    const tempTweets = getState().workInProgress.tweetsWIP.allIds
    const wallTweets = Object.keys(tweets).concat(tempTweets)
    const myTweets = Object.keys(tweets).filter(id => tweets[id].author_id === 1).concat(tempTweets)
    const listOfTweets = threadName === 'Wall' ? wallTweets : myTweets
    // debugger
    // const listOfTweets = threadName === 'Wall' ? (Object.keys(tweets)) : (Object.keys(tweets).filter(id => tweets[id].author_id === 1))
    return dispatch(loadTweets(threadId, listOfTweets))
  }
}


function handleClickTab(id, activeThreadId, activeTweetId, editableTweet){
  if(activeTweetId && editableTweet){
    return (dispatch) => {
      dispatch(triggerThread(activeThreadId))
      dispatch(triggerThread(id))
      dispatch(triggerActivableTweet(activeTweetId))
      dispatch(triggerEditableTweet(editableTweet))
      dispatch(loadTweetsForThread(id))
    }
  } else if(activeTweetId){
    return (dispatch) => {
      dispatch(triggerThread(activeThreadId))
      dispatch(triggerThread(id))
      dispatch(triggerActivableTweet(activeTweetId))
      dispatch(loadTweetsForThread(id))
    }
  } else if(!activeTweetId && editableTweet){
    return (dispatch) => {
      dispatch(triggerThread(activeThreadId))
      dispatch(triggerThread(id))
      dispatch(triggerEditableTweet(editableTweet))
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

function LoadingTweets(threadId){
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
    LoadingTweets,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Thread)
