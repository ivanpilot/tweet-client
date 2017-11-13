import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllTweets, getEditableTweet } from '../reducers/TweetsById';
import { getAllCommentsForTweet } from '../reducers/CommentsById';
import { EditableItem } from '../components/EditableItem';
import { editTweet, deleteTweet, triggerEditable } from '../actions/Tweet';
// import EditableTweetList from '../containers/EditableTweetList';


class TweetContainer extends React.Component {
  render(){
    // debugger
    return(
      <div className="ui center aligned">
        <div className={ this.props.activeTweet ? ('ui two column stackable divided grid') : ('')}>
          <div className="row">
            <div className={this.props.activeTweet ? ('ui eight wide column') : ('')}>
              <EditableItem
                items={this.props.tweets}
                editableTweet={this.props.editableTweet}
                onEditClick={this.props.onEditClick}
                onTrashClick={this.props.onTrashClick}
                onSubmitForm={this.props.onSubmitForm}
                closeEditable={this.props.closeEditable}
              />
            </div>
            { this.props.activeTweet ? (
            <div className='ui eight wide column'>
              <EditableItem
                items={this.props.comments}
                editableTweet={this.props.editableTweet}
                onEditClick={this.props.onEditClick}
                onTrashClick={this.props.onTrashClick}
                onSubmitForm={this.props.onSubmitForm}
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
    tweets: getAllTweets(state.tweetsById),
    editableTweet: getEditableTweet(state.tweetsById),
    comments: getAllCommentsForTweet(state.commentsById),
    activeTweet: true
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
) (TweetContainer)
