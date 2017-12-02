import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getEditableComment, getAllCommentsForTweet } from '../reducers/Comments';
import { getActiveTweet } from '../reducers/Tweets';
import { getFetchingCommentsError, getFetchingCommentError } from '../reducers/Errors';
import { EditableComment } from '../components/EditableComment';
import { addComment, editComment, deleteComment, triggerEditableComment, triggerFetchingComment, clearComments } from '../actions/Comment';
import { deleteCommentInTweet } from '../actions/Tweet';
import { fetchItemFailure } from '../actions/Error';
import { DisplayError } from '../components/DisplayError';
import '../styles/EditableList.css';
import { apiComment } from '../client/ApiComment';
import { normalize } from 'normalizr';
import { normalizedComment } from '../normalizers/Normalizr';


class EditableCommentList extends React.Component {
  state = {
    loading: false,
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.activeTweet && nextProps.activeTweet !== this.props.activeTweet){ //comparison to avoid infinite loop
      this.setState({loading: true});
      this.props.clearingComments();
      this.fetchingComments(nextProps.activeTweet);
    }
  }

  fetchingComments = (tweetId) => {
    this.props.fetchComments(tweetId).then(
      response => {
        this.setState({loading: false})
      },
      error => {
        this.setState({loading: false})
        this.props.handleFetchingError(error)
      }
    )
  }

  render(){
    if(this.state.loading){
      return(
        <div className='ui active centered inline loader' />
      )
    } else if(!this.props.activeTweet || !this.props.comments){
      return(
        null
      )
    } else if(this.props.activeTweet && this.props.commentsError){
      return(
        <div>
          <DisplayError
            message={`Looks like a server issue. Retry in a few sec... 'HTTP status: ${this.props.error.status}. Error message: ${this.props.error.message}'`}
            onRetry={() => this.fetchingComments(this.props.activeTweet)}
          />
        </div>
      )
    } else if(this.props.activeTweet && this.props.comments.length === 0){
      return(
        <div className="no-comment">
          <p>Be the first to write a comment...</p>
        </div>
      )
    } else {
      return(
        <div className="editable-list">
          <EditableComment
            comments={this.props.comments}
            commentError={this.props.commentError}
            editableComment={this.props.editableComment}
            activeTweet={this.props.activeTweet}
            onEditClick={this.props.onEditClick}
            onTrashClick={this.props.onTrashClick}
            onSubmitForm={this.props.onSubmitCommentForm}
            closeEditable={this.props.closeEditable}
          />
        </div>
      )
    }
  }
}

function onTrashClick(id, activeId){
  return (dispatch) => {
    dispatch(destroyComment(id, activeId))
  }
}

function destroyComment(id, activeId){
  return (dispatch) => {
    apiComment.deleteComment(id, activeId).then(
      response => {
        dispatch(deleteCommentInTweet(id, activeId))
        dispatch(deleteComment(id))
      },
      error => {
        dispatch(fetchItemFailure('comment', error, id))
      }
    )
  }
}

function onEditClick(id, editableId){
  if(editableId){
    return (dispatch) => {
      dispatch(triggerEditableComment(editableId))
      dispatch(triggerEditableComment(id))
    }
  } else {
    return (dispatch) => {
      dispatch(triggerEditableComment(id))
    }
  }
}

function closeEditable(editableId){
  return (dispatch) => {
    dispatch(triggerEditableComment(editableId))
  }
}

function onSubmitCommentForm(comment){
  return (dispatch) => {
    dispatch(editComment(comment))
    dispatch(triggerFetchingComment(comment.id)) //TBD
    dispatch(triggerEditableComment(comment.id))
    dispatch(updateComment(comment)) //TBD
  }
}

function updateComment(comment){
  return (dispatch) => {
    apiComment.updateComment(comment).then(
      response => {
        dispatch(triggerFetchingComment(comment.id))
      },
      error => {
        dispatch(fetchItemFailure('comment', error, comment.id))
      }
    )
  }
}


function fetchComments(tweetId){
  return dispatch => {
    return apiComment.fetchComments(tweetId, (comments) => {
      const normalizedComments = normalize(comments, normalizedComment)
      const newComments = normalizedComments.entities.comments || {} // in case there is no comment yet
      Object.keys(newComments).map(newComment => {
        return dispatch(addComment(newComments[newComment]))
      })
    })
  }
}

function clearingComments(){
  return (dispatch) => {
    dispatch(clearComments())
  }
}

function handleFetchingError(error){
  return (dispatch) => {
    dispatch(clearComments())
    dispatch(fetchItemFailure('comments', error))
  }
}

const mapStateToProps = (state) => {
  return {
    comments: getAllCommentsForTweet(state.entities.comments),
    editableComment: getEditableComment(state.entities.comments),
    activeTweet: getActiveTweet(state.entities.tweets),
    commentsError: getFetchingCommentsError(state.errors),
    commentError: getFetchingCommentError(state.errors),
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    onTrashClick,
    onEditClick,
    closeEditable,
    onSubmitCommentForm,
    fetchComments,
    clearingComments,
    handleFetchingError,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (EditableCommentList)
