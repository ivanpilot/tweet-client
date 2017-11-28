import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getEditableTweet, getActiveTweet } from '../reducers/Tweets';
// import { getAllTweets } from '../selectors/Tweet';
import { getAllTweets } from '../reducers/Tweets';
import { getTweetsForActiveThread } from '../reducers/tweetsByThread';
import { getFetchingTweetError } from '../reducers/Errors';
import { fetchItemFailure } from '../actions/Error';
import { EditableTweet } from '../components/EditableTweet';
import { editTweet, deleteTweet, triggerEditableTweet, triggerActivableTweet, triggerFetchingTweet } from '../actions/Tweet';
  import { apiTweet } from '../client/ApiTweet';
import '../styles/EditableList.css';


class EditableTweetList extends React.Component {
  render(){
    if(this.props.tweets.length === 0){
      return(
        <div className="no-tweet">
          <h3>There is no tweet for now. Why not writing the first one?</h3>
        </div>
      )
    } else {
      // debugger
      return(
        <div className="editable-list">
          <EditableTweet
            tweets={this.props.tweets}
            tweetError={this.props.tweetError}
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
  return (dispatch) => {
    dispatch(deleteTweet(id))
  }
}

function onEditClick(id, activeId, editableId){
  if(!activeId && !editableId){
    return (dispatch) => {
      dispatch(triggerActivableTweet(id))
      dispatch(triggerEditableTweet(id))
    }
  } else if(!editableId && activeId === id){
    return (dispatch) => {
      dispatch(triggerEditableTweet(id))
    }
  } else if(!editableId && activeId !== id){
    return (dispatch) => {
      dispatch(triggerActivableTweet(activeId))
      dispatch(triggerActivableTweet(id))
      dispatch(triggerEditableTweet(id))
    }
  } else {
    return (dispatch) => {
      dispatch(triggerActivableTweet(activeId))
      dispatch(triggerEditableTweet(activeId))
      dispatch(triggerActivableTweet(id))
      dispatch(triggerEditableTweet(id))
    }
  }
}


function onActiveClick(id, activeId, editableId){
  if(activeId && editableId && activeId === editableId){
    return (dispatch) => {
      dispatch(triggerActivableTweet(activeId))
      dispatch(triggerEditableTweet(activeId))
      dispatch(triggerActivableTweet(id))
    }
  } else if(activeId && activeId !== id){
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
    dispatch(triggerFetchingTweet(tweet.id))
    dispatch(triggerEditableTweet(tweet.id))
    dispatch(persistTweet(tweet))
  }
}


function persistTweet(tweet){
  return (dispatch) => {
    apiTweet.updateTweet(tweet).then(
      response => {
        dispatch(triggerFetchingTweet(tweet.id))
      },
      error => {
        dispatch(fetchItemFailure('tweet', error, tweet.id))
      }
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tweets: getAllTweets(state, getTweetsForActiveThread(state.tweetsByThread)),
    activeTweet: getActiveTweet(state.entities.tweets),
    editableTweet: getEditableTweet(state.entities.tweets),
    tweetError: getFetchingTweetError(state.errors),
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
