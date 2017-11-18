// import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getEditableTweet, getActiveTweet } from '../reducers/Tweets';
// import { getEditableCommentForTweet } from '../reducers/CommentsById';
import { addTweet, triggerEditableTweet } from '../actions/Tweet';
// import { triggerEditableComment } from '../actions/Comment';
import FormTweet from '../components/FormTweet';

// import { apiTweet } from '../client/ApiTweet';

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
    }
  }
}

const mapStateToProps = (state) => ({
  editableTweet: getEditableTweet(state.tweets),
  activeTweet: getActiveTweet(state.tweets)
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
