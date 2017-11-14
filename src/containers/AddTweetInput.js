// import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getEditableTweet } from '../reducers/TweetsById';
import { addTweet, triggerEditableTweet } from '../actions/Tweet';
import FormTweet from '../components/FormTweet';

// import { apiTweet } from '../client/ApiTweet';

function onSubmitForm(tweet, editableId){
  if(editableId){
    return (dispatch) => {
      dispatch(triggerEditableTweet(editableId))
      dispatch(addTweet(tweet))
    }
  } else {
    return (dispatch) => {
      dispatch(addTweet(tweet))
    }
  }
}

const mapStateToProps = (state) => ({
  editableTweet: getEditableTweet(state.tweetsById)
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    onSubmitForm
  }, dispatch)
}

export const AddTweetInput = connect(
  mapStateToProps,
  mapDispatchToProps,
) (FormTweet)
