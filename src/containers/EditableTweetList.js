import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllTweets, getEditableTweet, getActiveTweet } from '../reducers/TweetsById';
import { EditableTweet } from '../components/EditableTweet';
import { editTweet, deleteTweet, triggerEditableTweet, triggerActivableTweet, loadTweets } from '../actions/Tweet';
import { deleteTweetComments } from '../actions/Comment';
import '../styles/EditableList.css';
// import { client } from '../client/Client';
import { apiTweet } from '../client/ApiTweet';
import { normalize } from 'normalizr';
import { normalizedTweet } from '../normalizers/Normalizr';


class EditableTweetList extends React.Component {

  componentDidMount(){
    apiTweet.loadTweets((tweets) => {
      console.log(tweets)
      // return this.props.loadsTweets(tweets)
      const normalizedData = normalize(tweets:tweets, normalizedTweet)
      console.log(normalizedData)
      return this.props.loadsTweets(normalizedData)

    })

    // this.props.loadTweets(tweets)
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

// export default EditableTweetList

function onTrashClick(id){
  return (dispatch) => {
    dispatch(deleteTweet(id))
    dispatch(deleteTweetComments(id)) //should be modified once we change the state to normalized
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

function loadsTweets(tweets){
  return (dispatch) => {
    dispatch(loadTweets(tweets))
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
    loadsTweets,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (EditableTweetList)
