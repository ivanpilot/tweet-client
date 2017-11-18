import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllCommentsForTweet, getEditableComment } from '../reducers/CommentsById';
import { getActiveTweet } from '../reducers/Tweets';
import { EditableComment } from '../components/EditableComment';
import { editComment, deleteComment, triggerEditableComment } from '../actions/Comment';
import '../styles/EditableList.css';

// import { client } from '../client/Client';
// import { apiTweet } from '../client/ApiTweet';


class EditableCommentList extends React.Component {

  // componentDidMount(){
  //   apiTweet.loadComments((tweets) => {
  //     console.log(tweets)
  //     // return this.props.loadsTweets(tweets)
  //     const normalizedData = normalize(tweets, normalizedTweet)
  //     console.log(normalizedData)
  //     return this.props.loadsTweets(normalizedData)
  //
  //   })
  //
  //   // this.props.loadTweets(tweets)
  // }

  render(){
    // debugger
    if(this.props.activeTweet && this.props.comments.length === 0){
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
            editableComment={this.props.editableComment}
            onEditClick={this.props.onEditClick}//
            onTrashClick={this.props.onTrashClick}//
            onSubmitForm={this.props.onSubmitCommentForm}//
            closeEditable={this.props.closeEditable}
          />
        </div>
      )
    }
  }
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

const mapStateToProps = (state) => {
  return {
    comments: getAllCommentsForTweet(state.commentsById, getActiveTweet(state.tweets)),
    editableComment: getEditableComment(state.commentsById),
    activeTweet: getActiveTweet(state.tweets)
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    onTrashClick,
    onEditClick,
    closeEditable,
    onSubmitCommentForm,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (EditableCommentList)
