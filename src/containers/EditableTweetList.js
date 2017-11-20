import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllTweets, getEditableTweet, getActiveTweet } from '../reducers/Tweets';
import { EditableTweet } from '../components/EditableTweet';
import { editTweet, deleteTweet, triggerEditableTweet, triggerActivableTweet, loadTweets } from '../actions/Tweet';
import { deleteAllCommentsInTweet } from '../actions/Comment';
import '../styles/EditableList.css';
// import { client } from '../client/Client';
import { apiTweet } from '../client/ApiTweet';
import { normalize } from 'normalizr';
import { normalizedTweet } from '../normalizers/Normalizr';


class EditableTweetList extends React.Component {

  componentDidMount(){
    apiTweet.loadRawTweets((tweets) => {
      console.log(tweets)
      const normalizedData = normalize(tweets, normalizedTweet)
      console.log('SHOWME STUFFFFF', normalizedData)
      return this.props.loadingTweets(normalizedData)
    })
  }

  render(){
    // debugger
    if(this.props.tweets.length === 0){
      return(
        <div className="no-tweet">
          <h3>There is no tweet for now</h3>
        </div>
      )
    } else {
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
}

function onTrashClick(id){
  // debugger
  return (dispatch) => {
    dispatch(deleteTweet(id))
    // dispatch(deleteAllCommentsInTweet(id)) //should be modified once we change the state to normalized
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
    // debugger
    return (dispatch) => {
      dispatch(triggerActivableTweet(activeId))
      dispatch(triggerActivableTweet(id))
    }
  } else {
    // debugger
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

function loadingTweets(tweets){
  return (dispatch) => {
    dispatch(loadTweets(tweets))
  }
}

const mapStateToProps = (state) => {
  // debugger
  return {
    tweets: getAllTweets(state.tweets),
    activeTweet: getActiveTweet(state.tweets),
    editableTweet: getEditableTweet(state.tweets)
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    onTrashClick,
    onEditClick,
    onActiveClick,
    closeEditable,
    onSubmitTweetForm,
    loadingTweets,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (EditableTweetList)
