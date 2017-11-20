// import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getActiveTweet } from '../reducers/Tweets';
import { getEditableComment } from '../reducers/Comments';
import { addComment, triggerEditableComment } from '../actions/Comment';
import { addCommentToTweet } from '../actions/Tweet';
import FormComment from '../components/FormComment';

// import { apiTweet } from '../client/ApiTweet';

function onSubmitForm(comment, editableId){
  if(editableId){
    return (dispatch) => {
      dispatch(triggerEditableComment(editableId))
      dispatch(addComment(comment))
      dispatch(addCommentToTweet(comment))
    }
  } else {
    return (dispatch) => {
      dispatch(addComment(comment))
      dispatch(addCommentToTweet(comment))
    }
  }
}

const mapStateToProps = (state) => ({
  activeTweet: getActiveTweet(state.tweets),
  editableComment: getEditableComment(state.comments.byId)
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
