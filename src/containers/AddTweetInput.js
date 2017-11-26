// import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getEditableTweet, getActiveTweet } from '../reducers/Tweets';
import { addTweet, triggerEditableTweet, createTweet } from '../actions/Tweet';
import FormTweet from '../components/FormTweet';

import { apiTweet } from '../client/ApiTweet';
import { normalize } from 'normalizr';
import { normalizedTweet } from '../normalizers/Normalizr';
// import { store } from '../store';


// const fetchTweets = () => {
//   apiTweet.loadRawTweets(tweets =>
//     normalize(tweets, normalizedTweet))
//     .then((tweets) =>
//       store.dispatch({
//         type: 'LOAD_TWEETS',
//         tweets
//       })
//   )
// }

function onSubmitForm(tweet, editableId, activeId){
  if(editableId){
    return (dispatch) => {
      dispatch(triggerEditableTweet(editableId))
      dispatch(addTweet(tweet))
    }
  } else {
    return (dispatch) => {
      // dispatch(addTweet(tweet))
      dispatch(createTweet(tweet))
    }
  }
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
