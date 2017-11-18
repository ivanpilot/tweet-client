// import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getActiveTweet } from '../reducers/Tweets';
import { getEditableComment } from '../reducers/CommentsById';
import { addComment, triggerEditableComment } from '../actions/Comment';
import FormComment from '../components/FormComment';

// import { apiTweet } from '../client/ApiTweet';

function onSubmitForm(comment, editableId){
  if(editableId){
    return (dispatch) => {
      dispatch(triggerEditableComment(editableId))
      dispatch(addComment(comment))
    }
  } else {
    return (dispatch) => {
      dispatch(addComment(comment))
    }
  }
}

const mapStateToProps = (state) => ({
  activeTweet: getActiveTweet(state.tweets),
  editableComment: getEditableComment(state.commentsById)
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
