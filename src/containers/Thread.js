import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tabs } from '../components/Tabs';
import { TweetContainer } from '../components/TweetContainer';
import { triggerThread, loadTweets } from '../actions/Thread';
import { triggerEditableTweet, triggerActivableTweet } from '../actions/Tweet';
import { getAllThreads, getActiveThread } from '../reducers/tweetsByThread';
import { getEditableTweet, getActiveTweet, getListOfTweetIds } from '../reducers/Tweets';
import { client } from '../client/Client';

class Thread extends React.Component{
  componentDidMount(){
    this.props.LoadingTweets(this.props.activeThreadId)
  }

  render(){
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
    const tweetIds = getState().entities.tweets.allIds

    const wallTweets = tweetIds
    const myTweets = tweetIds.filter(id => tweets[id].author_id === client.getCurrentUser().id) // replaced bu author_id === currentUser.id
    const listOfTweets = threadName === 'Wall' ? wallTweets : myTweets
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
    tweetsIds: getListOfTweetIds(state.entities.tweets)
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
