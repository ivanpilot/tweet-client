import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getEditableTweet, getActiveTweet } from '../reducers/Tweets';
import { getActiveThread } from '../reducers/tweetsByThread';
import { addTweet, triggerEditableTweet, createTweet, deleteTweet } from '../actions/Tweet';
import { loadTweet } from '../actions/Thread';
import FormTweet from '../components/FormTweet';
import { apiTweet } from '../client/ApiTweet';
import { fetchItemFailure } from '../actions/Error';

// the only good way to put it
function persistTweet(tweet){
  return (dispatch, getState) => {
    return apiTweet.createTweet(tweet)
    .then(
      response => {apiTweet.fetchTweetByReactId(tweet.id)
        .then(
          response => {swapOldTweetForNewTweet(dispatch, getState, response)},
          error => {fetchFailure(dispatch, error, tweet.id)}
        )
      },
      error => {fetchFailure(dispatch, error, tweet.id)}
    )
    // .then(
    //   response => {swapOldTweetForNewTweet(dispatch, getState, response)},
    //   error => {fetchFailure(error)}
    // )
  }
}

function swapOldTweetForNewTweet(dispatch, getState, tweets){
  tweets.map(tweet => {
    const tempTweet = getState().entities.tweets.byId[tweet.react_id]
    const activeThreadId = getActiveThread(getState().tweetsByThread)
    if(tempTweet){
      dispatch(addTweet(tweet))
      dispatch(deleteTweet(tweet.react_id))
      dispatch(loadTweet(activeThreadId, tweet.id))
    }
    return;
  })
}

function onSubmitForm(tweet, editableId, activeId){
  if(editableId){
    return (dispatch) => {
      dispatch(triggerEditableTweet(editableId))
      dispatch(createTweet(tweet))
      dispatch(persistTweet(tweet))
    }
  } else {
    return (dispatch) => {
      dispatch(createTweet(tweet))
      dispatch(persistTweet(tweet))
    }
  }
}

function fetchFailure(dispatch, error, tweetId){
  dispatch(fetchItemFailure('tweet', error, tweetId))
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

export const AddTweetInput = connect(
  mapStateToProps,
  mapDispatchToProps,
) (FormTweet)
