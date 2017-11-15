import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllTweets, getEditableTweet, getActiveTweet } from '../reducers/TweetsById';
import { EditableTweet } from '../components/EditableTweet';
import { editTweet, deleteTweet, triggerEditableTweet, triggerActivableTweet } from '../actions/Tweet';
import { deleteTweetComments } from '../actions/Comment';
import '../styles/EditableList.css';
// import { client } from '../client/Client';
// import { apiTweet } from '../client/ApiTweet';


class EditableTweetList extends React.Component {
  render(){
    // debugger
    return(
      <div className="editable-list">
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
    )
  }
}

// export default EditableTweetList

function onTrashClick(id){
  return (dispatch) => {
    dispatch(deleteTweet(id))
    dispatch(deleteTweetComments(id))
  }
}

function onEditClick(id, editableId){
  if(editableId){
    return (dispatch) => {
      dispatch(triggerEditableTweet(editableId))
      dispatch(triggerEditableTweet(id))
    }
  } else {
    return (dispatch) => {
      dispatch(triggerEditableTweet(id))
    }
  }
}

function onActiveClick(id, activeId){
  if(activeId && activeId !== id){
    return (dispatch) => {
      dispatch(triggerActivableTweet(activeId))
      dispatch(triggerActivableTweet(id))
    }
  } else {
    return (dispatch) => {
      dispatch(triggerActivableTweet(id))
    }
  }
}

function closeEditable(editableId){
  return (dispatch) => {
    dispatch(triggerEditableTweet(editableId))
  }
}

function onSubmitTweetForm(tweet){
  return (dispatch) => {
    dispatch(editTweet(tweet))
    dispatch(triggerEditableTweet(tweet.id))
  }
}

const mapStateToProps = (state) => {
  return {
    tweets: getAllTweets(state.tweetsById),
    activeTweet: getActiveTweet(state.tweetsById),
    editableTweet: getEditableTweet(state.tweetsById)
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
) (EditableTweetList)
