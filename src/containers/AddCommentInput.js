// import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getActiveTweet } from '../reducers/Tweets';
import { getEditableComment } from '../reducers/Comments';
import { addComment, createComment, deleteComment, triggerEditableComment } from '../actions/Comment';
import { createCommentToTweet, addCommentToTweet, deleteCommentInTweet } from '../actions/Tweet';
import { fetchItemFailure } from '../actions/Error';
import FormComment from '../components/FormComment';
import { apiComment } from '../client/ApiComment';


function persistComment(comment){
  return (dispatch) => {
    apiComment.createComment(comment).then(
      response => {
        apiComment.fetchComment(comment).then(
          response => {
            const newComment = response
            dispatch(addComment(newComment))
            dispatch(addCommentToTweet(newComment))
            dispatch(deleteCommentInTweet(comment.id, comment.activeTweetId))
            dispatch(deleteComment(comment.id))
          },
          error => {
            debugger
            dispatch(fetchItemFailure('comment', error, comment.id))
          }
        )
      },
      error => {
        debugger
        dispatch(fetchItemFailure('comment', error, comment.id))
      }
    )
  }
}

function onSubmitForm(comment, editableId){
  if(editableId){
    return (dispatch) => {
      dispatch(triggerEditableComment(editableId))
      dispatch(createComment(comment))
      dispatch(createCommentToTweet(comment))
    }
  } else {
    return (dispatch) => {
      dispatch(createComment(comment))
      dispatch(createCommentToTweet(comment))
      dispatch(persistComment(comment))
    }
  }
}



const mapStateToProps = (state) => ({
  activeTweet: getActiveTweet(state.entities.tweets),
  editableComment: getEditableComment(state.entities.comments.byId)
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
