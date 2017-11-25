// import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getEditableTweet, getActiveTweet } from '../reducers/Tweets';
import { addTweet, triggerEditableTweet, loadTweets } from '../actions/Tweet';
import FormTweet from '../components/FormTweet';

import { apiTweet } from '../client/ApiTweet';
import { normalize } from 'normalizr';
import { normalizedTweet } from '../normalizers/Normalizr';
import { store } from '../store';


const fetchTweets = () => {
  apiTweet.loadRawTweets(tweets =>
    normalize(tweets, normalizedTweet))
    .then((tweets) =>
      store.dispatch({
        type: 'LOAD_TWEETS',
        tweets
      })
  )
}

function onSubmitForm(tweet, editableId, activeId){
  if(editableId){
    return (dispatch) => {
      // dispatch(triggerEditableComment(getTweetEditableComment(activeId))) //messy to implement w/o normalizer
      dispatch(triggerEditableTweet(editableId))
      dispatch(addTweet(tweet))
    }
  } else {
    return (dispatch) => {
      // dispatch(triggerEditableComment(getEditableCommentForTweet(activeId))) //messy to implement w/o normalizer
      dispatch(addTweet(tweet))
      // debugger
      apiTweet.createTweet(tweet).then((response) => {
        // debugger
        console.log('AND NOW THE SECOND PART OF RESPONSE: ', response)
        return fetchTweets()
      })
      // apiTweet.createTweet(tweet).then((response) => {
      //   console.log('AND NOW THE SECOND PART OF RESPONSE: ', response)
      //   return dispatch => {
      //     dispatch({
      //       type: 'LOAD_TWEETS',
      //       tweets: tweets
      //     })
      //       // fetchTweets()
      //   }
      // })
    }
  }
}

// function loadingTweets(tweets){
//   debugger
//   store.dispatch(loadTweets(tweets))
//   // return (dispatch) => {
//   //   debugger
//   //   dispatch(loadTweets(tweets))
//   // }
// }

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
