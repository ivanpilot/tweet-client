import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getEditableComment } from '../reducers/Comments';
import { getActiveTweet, getAllCommentsForTweet} from '../reducers/Tweets';
import { EditableComment } from '../components/EditableComment';
import { editComment, deleteComment, triggerEditableComment, loadComments } from '../actions/Comment';
import '../styles/EditableList.css';
// import { client } from '../client/Client';
import { apiComment } from '../client/ApiComment';
import { normalize } from 'normalizr';
import { normalizedComment } from '../normalizers/Normalizr';


class EditableCommentList extends React.Component {

  componentWillReceiveProps(nextProps){
    if(nextProps.activeTweet){
      apiComment.loadComments(nextProps.activeTweet, (comments) => {
        console.log(comments)
        const normalizedData = normalize(comments, normalizedComment)
        console.log(normalizedData)
        return this.props.loadingComments(normalizedData)
      })
    }

    // this.props.loadTweets(tweets)
  }

  render(){
    debugger
    if(this.props.comments){
      return(
        <div className="editable-list">
          <EditableComment
            comments={this.props.comments}
            editableComment={this.props.editableComment}
            onEditClick={this.props.onEditClick}//
            onTrashClick={this.props.onTrashClick}//
            onSubmitForm={this.props.onSubmitCommentForm}//
            closeEditable={this.props.closeEditable}
          />
        </div>

      )
    } else {
      return(
        <div className="no-comment">
          <p>Be the first to write a comment...</p>
        </div>
      )
    }
  }

  // render(){
  //   debugger
  //   if(this.props.activeTweet && this.props.comments.length === 0){
  //     return(
  //       <div className="no-comment">
  //         <p>Be the first to write a comment...</p>
  //       </div>
  //     )
  //   } else {
  //     return(
  //       <div className="editable-list">
  //         <EditableComment
  //           comments={this.props.comments}
  //           editableComment={this.props.editableComment}
  //           onEditClick={this.props.onEditClick}//
  //           onTrashClick={this.props.onTrashClick}//
  //           onSubmitForm={this.props.onSubmitCommentForm}//
  //           closeEditable={this.props.closeEditable}
  //         />
  //       </div>
  //     )
  //   }
  // }
}

function onTrashClick(id){
  return (dispatch) => dispatch(deleteComment(id))
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
  debugger
  return {
    // comments: getAllCommentsForTweet(state.comments.byId, getActiveTweet(state.tweets)),
    comments: getAllCommentsForTweet(state.tweets, getActiveTweet(state.tweets), state.comments),
    editableComment: getEditableComment(state.comments.byId),
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
