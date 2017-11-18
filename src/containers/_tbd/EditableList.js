import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllTweets, getEditableTweet } from '../reducers/Tweets';
import { EditableTweet } from '../components/EditableTweet';
import { editTweet, deleteTweet, triggerEditable } from '../actions/TweetComment';
import '../styles/EditableTweetList.css';

// import { client } from '../client/Client';
// import { apiTweet } from '../client/ApiTweet';


class EditableList extends React.Component {
  render(){
    return(
      <div>
        <EditableTweetList
          tweets={this.props.tweets}
          editableTweet={this.props.editableTweet}
          onEditClick={this.props.onEditClick}
          onTrashClick={this.props.onTrashClick}
          onSubmitForm={this.props.onSubmitForm}
          closeEditable={this.props.closeEditable}
        />
      </div>
    )
  }
}

function onTrashClick(id){
  return (dispatch) => dispatch(deleteTweet(id))
}

function onEditClick(id, editableId){
  if(editableId){
    return (dispatch) => {
      dispatch(triggerEditable(editableId))
      dispatch(triggerEditable(id))
    }
  } else {
    return (dispatch) => {
      dispatch(triggerEditable(id))
    }
  }
}

function closeEditable(editableId){
  return (dispatch) => {
    dispatch(triggerEditable(editableId))
  }
}

function onSubmitForm(tweet){
  return (dispatch) => {
    dispatch(editTweet(tweet))
    dispatch(triggerEditable(tweet.id))
  }
}

const mapStateToProps = (state) => {
  return {
    tweets: getAllTweets(state.tweets),
    editableTweet: getEditableTweet(state.tweets)
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    onTrashClick,
    onEditClick,
    closeEditable,
    onSubmitForm,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (EditableList)