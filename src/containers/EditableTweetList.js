import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { allTweets, editableTweet } from '../reducers/TweetsById';
import { EditableTweet } from '../components/EditableTweet';
import { deleteTweet, triggerEditable } from '../actions/Tweet';
import '../styles/EditableTweetList.css';

// import { client } from '../client/Client';
// import { apiTweet } from '../client/ApiTweet';
// import { onEditableTweetMode, offEditableTweetMode } from '../actions/EditableTweet';

class EditableTweetList extends React.Component {
  render(){
    // debugger
    return(
      <div>
        <EditableTweet
          tweets={this.props.tweets}
          editableTweet={this.props.editableTweet}
          onEditClick={this.props.onEditClick}
          onTrashClick={this.props.onTrashClick}
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
    // debugger
    return (dispatch) => {
      dispatch(triggerEditable(editableId))
      dispatch(triggerEditable(id))
    }
  } else {
    // debugger
    return (dispatch) => {
      dispatch(triggerEditable(id))
    }
  }
}

const mapStateToProps = (state) => {
  // debugger
  return {
    tweets: allTweets(state.tweetsById),
    editableTweet: editableTweet(state.tweetsById)
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    onTrashClick,
    onEditClick,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (EditableTweetList)
