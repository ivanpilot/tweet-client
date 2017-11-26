import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getEditableComment, getAllCommentsForTweet } from '../reducers/Comments';
import { getActiveTweet } from '../reducers/Tweets';
import { getCommentsError } from '../reducers/Errors';
import { EditableComment } from '../components/EditableComment';
import { editComment, deleteComment, triggerEditableComment, loadComments, clearComments } from '../actions/Comment';
import { deleteCommentInTweet } from '../actions/Tweet';
import { fetchCommentsFailure } from '../actions/Error';
import { DisplayError } from '../components/DisplayError';
import '../styles/EditableList.css';
// import { client } from '../client/Client';
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
      this.fetchComments(nextProps.activeTweet)
    }
  }

  fetchComments = (tweetId) => {
    return apiComment.loadRawComments(tweetId, (comments) => {
      const normalizedData = normalize(comments, normalizedComment)
      return this.props.loadingComments(normalizedData)
    }).then(
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
    // debugger
    if(this.state.loading){
      return(
        <div className='ui active centered inline loader' />
      )
    } else if(!this.props.activeTweet || !this.props.comments){
      // debugger
      return(
        null
      )
    } else if(this.props.activeTweet && this.props.error){
      // debugger
      return(
        <div>
          <DisplayError
            message={`Looks like a server issue. Retry in a few sec... 'HTTP status: ${this.props.error.status}. Error message: ${this.props.error.message}'`}
            onRetry={() => this.fetchComments(this.props.activeTweet)}
          />
        </div>
      )
    } else if(this.props.activeTweet && this.props.comments.length === 0){
      // debugger
      return(
        <div className="no-comment">
          <p>Be the first to write a comment...</p>
        </div>
      )
    } else {
      // debugger
      return(
        <div className="editable-list">
          <EditableComment
            comments={this.props.comments}
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
    dispatch(deleteCommentInTweet(id, activeId))
    dispatch(deleteComment(id))
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
    dispatch(triggerEditableComment(comment.id))
  }
}

function loadingComments(comments){
  return (dispatch) => {
    dispatch(loadComments(comments))
  }
}

function handleFetchingError(error){
  return (dispatch) => {
    dispatch(clearComments())
    dispatch(fetchCommentsFailure(error))
  }
}

const mapStateToProps = (state) => {
  return {
    comments: getAllCommentsForTweet(state.entities.comments),
    editableComment: getEditableComment(state.entities.comments),
    activeTweet: getActiveTweet(state.entities.tweets),
    error: getCommentsError(state.errors),
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    onTrashClick,
    onEditClick,
    closeEditable,
    onSubmitCommentForm,
    loadingComments,
    handleFetchingError,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (EditableCommentList)
