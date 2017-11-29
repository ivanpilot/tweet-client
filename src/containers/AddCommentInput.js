// import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getActiveTweet } from '../reducers/Tweets';
import { getEditableComment } from '../reducers/Comments';
import { addComment, createComment, triggerEditableComment } from '../actions/Comment';
import { addCommentToTweet } from '../actions/Tweet';
import { fetchItemFailure } from '../actions/Error';
import FormComment from '../components/FormComment';
import { apiComment } from '../client/ApiComment';


function persistComment(comment){
  return (dispatch) => {
    apiComment.createComment(comment).then(
      response => {
        console.log('COMMENT HAS BEEN ADDED')
      },
      error => {
        fetchItemFailure('comment', error, comment.id)
      }
    )
  }
}

function onSubmitForm(comment, editableId){
  if(editableId){
    return (dispatch) => {
      dispatch(triggerEditableComment(editableId))
      dispatch(addComment(comment))
      dispatch(addCommentToTweet(comment))
    }
  } else {
    return (dispatch) => {
      dispatch(createComment(comment))
      dispatch(addCommentToTweet(comment))
    }
  }
}

// function onSubmitForm(comment, editableId){
//   if(editableId){
//     return (dispatch) => {
//       dispatch(triggerEditableComment(editableId))
//       dispatch(addComment(comment))
//       dispatch(addCommentToTweet(comment))
//     }
//   } else {
//     return (dispatch) => {
//       dispatch(addComment(comment))
//       dispatch(addCommentToTweet(comment))
//     }
//   }
// }

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
