// import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getActiveTweet } from '../reducers/TweetsById';
import { addComment } from '../actions/Comment';
import FormComment from '../components/FormComment';

// import { apiTweet } from '../client/ApiTweet';

function onSubmitForm(comment, activeTweetId){ //, editableId
  // if(editableId){
  //   return (dispatch) => {
  //     dispatch(triggerEditable(editableId))
  //     dispatch(addTweet(tweet))
  //   }
  // } else {
    return (dispatch) => {
      dispatch(addComment(comment))
    }
  // }
}

const mapStateToProps = (state) => ({
  activeTweet: getActiveTweet(state.tweetsById)
  // editableComment: getEditableComment(state.commentsById)
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    onSubmitForm
  }, dispatch)
}

export const AddCommentInput = connect(
  mapStateToProps,
  mapDispatchToProps,
) (FormComment)
