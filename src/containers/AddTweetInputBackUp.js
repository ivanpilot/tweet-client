import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getEditableTweet, getActiveTweet } from '../reducers/Tweets';
import { getActiveThread } from '../reducers/tweetsByThread';
import { addTweet, triggerEditableTweet, createTweet, eraseTweet } from '../actions/Tweet';
import { loadTweets, loadTweet } from '../actions/Thread';
import FormTweet from '../components/FormTweet';
import { apiTweet } from '../client/ApiTweet';
import { DisplayError } from '../components/DisplayError';
import { fetchTweetsFailure } from '../actions/Error';


class AddTweetInput extends React.Component {

  // handleSubmitForm = (tweet, editableId, activeId) => {
  //   this.props.onSubmitForm(tweet, editableId, activeId)
  // }

  render(){
    return(
      <FormTweet
        editableTweet={this.props.editableTweet}
        activeTweet={this.props.activableTweet}
        onSubmitForm={this.props.onSubmitForm}
      />
    )
  }
}

// the only good way to put it
function persistTweet(tweet){
  return (dispatch, getState) => {
    return apiTweet.createTweet(tweet)
    .then(
      response => {apiTweet.fetchTweetByReactId(tweet.id)
        .then(
          response => {swapOldTweetForNewTweet(dispatch, getState, response)},
          error => {fetchFailure(dispatch, error)}
        )
      },
      error => {fetchFailure(dispatch, error)}
    )
    // .then(
    //   response => {swapOldTweetForNewTweet(dispatch, getState, response)},
    //   error => {fetchFailure(error)}
    // )
  }
}

function swapOldTweetForNewTweet(dispatch, getState, tweets){
  tweets.map(tweet => {
    const tempTweet = getState().workInProgress.tweetsWIP.byId[tweet.react_id]
    const activeThreadId = getActiveThread(getState().tweetsByThread)
    if(tempTweet){
      dispatch(addTweet(tweet))
      dispatch(eraseTweet(tweet.react_id))
      dispatch(loadTweet(activeThreadId, tweet.id))
    }
  })
}

function onSubmitForm(tweet, editableId, activeId){
  if(editableId){
    return (dispatch) => {
      dispatch(triggerEditableTweet(editableId))
      dispatch(addTweet(tweet))
    }
  } else {
    return (dispatch) => {
      dispatch(createTweet(tweet))
      dispatch(persistTweet(tweet))
    }
  }
}

function fetchFailure(dispatch, error){
  dispatch(fetchTweetsFailure(error))
}

const mapStateToProps = (state) => ({
  editableTweet: getEditableTweet(state.entities.tweets),
  activeTweet: getActiveTweet(state.entities.tweets)
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    onSubmitForm,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
) (AddTweetInput)
