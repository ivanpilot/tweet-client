import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllTweets, getEditableTweet, getActiveTweet } from '../reducers/Tweets';
import { getAllCommentsForTweet, getEditableComment } from '../reducers/CommentsById';
import { EditableTweet } from '../components/EditableTweet';
import { EditableComment } from '../components/EditableComment';
import { editTweet, deleteTweet, triggerEditable, triggerActivable } from '../actions/TweetComment';
// import EditableTweetList from '../containers/EditableTweetList';


class TweetContainer extends React.Component {
  render(){
    // debugger
    return(
      <div className="ui center aligned">
        <div className={ this.props.activeTweet ? ('ui two column stackable divided grid') : ('')}>
          <div className="row">
            <div className={this.props.activeTweet ? ('ui eight wide column') : ('')}>
              <EditableTweet
                tweets={this.props.tweets}
                activeTweet={this.props.activeTweet}
                editableTweet={this.props.editableTweet}
                onEditClick={this.props.onEditClick}
                onTrashClick={this.props.onTrashClick}
                onActiveClick={this.props.onActiveClick}
                onSubmitForm={this.props.onSubmitTweetForm}
                closeEditable={this.props.closeEditable}
              />
            </div>
            { this.props.activeTweet ? (
            <div className='ui eight wide column'>
              <EditableComment
                comments={this.props.comments}
                editableComment={this.props.editableComment}
                onEditClick={this.props.onEditClick}
                onTrashClick={this.props.onTrashClick}
                onSubmitForm={this.props.onSubmitTweetForm}
                closeEditable={this.props.closeEditable}
              />
            </div>
            ) : (null)
            }
          </div>
        </div>
      </div>
    )
  }
}

function onTrashClick(id){
  return (dispatch) => dispatch(deleteTweet(id))
}

function onEditClick(id, editableId){

  if(editableId){
    // debugger
    return (dispatch) => {
      dispatch(triggerEditable(editableId))
      dispatch(triggerEditable(id))
    }
  } else {
    debugger
    return (dispatch) => {
      dispatch(triggerEditable(id))
    }
  }
}

function onActiveClick(id, activeId){
  // debugger
  if(activeId && activeId !== id){
    return (dispatch) => {
      dispatch(triggerActivable(activeId))
      dispatch(triggerActivable(id))
    }
  } else {
    return (dispatch) => {
      dispatch(triggerActivable(id))
    }
  }
}

function closeEditable(editableId){
  return (dispatch) => {
    dispatch(triggerEditable(editableId))
  }
}

function onSubmitTweetForm(tweet){ /////////////////
  return (dispatch) => {
    dispatch(editTweet(tweet))
    dispatch(triggerEditable(tweet.id))
  }
}

const mapStateToProps = (state) => {
  return {
    tweets: getAllTweets(state.tweets),
    activeTweet: getActiveTweet(state.tweets),
    editableTweet: getEditableTweet(state.tweets),
    comments: getAllCommentsForTweet(state.commentsById, getActiveTweet(state.tweets)),
    editableComment: getEditableComment(state.commentsById),
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    onTrashClick,
    onEditClick,
    onActiveClick,
    closeEditable,
    onSubmitTweetForm,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (TweetContainer)
