import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getEditableComment, getAllCommentsForTweet } from '../reducers/Comments';
import { getActiveTweet } from '../reducers/Tweets';
import { EditableComment } from '../components/EditableComment';
import { editComment, deleteComment, triggerEditableComment, loadComments } from '../actions/Comment';
import { deleteCommentInTweet } from '../actions/Tweet';
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
    debugger
    if(nextProps.activeTweet && nextProps.activeTweet !== this.props.activeTweet){ //comparison to avoid infinite loop
      this.setState({loading: true});
// debugger
      apiComment.loadRawComments(nextProps.activeTweet, (comments) => {
          const normalizedData = normalize(comments, normalizedComment)
          debugger
          return this.props.loadingComments(normalizedData)
      }).then(() => {
        this.setState({loading: false})
      })
    }
  }

  render(){
    if(this.state.loading){
      return(
        <div className='ui active centered inline loader' />
      )
    } else if(!this.props.activeTweet || !this.props.comments){
      // debugger
      return(
        null
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

const mapStateToProps = (state) => {
  return {
    comments: getAllCommentsForTweet(state.comments),
    editableComment: getEditableComment(state.comments),
    activeTweet: getActiveTweet(state.tweets)
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    onTrashClick,
    onEditClick,
    closeEditable,
    onSubmitCommentForm,
    loadingComments,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (EditableCommentList)
