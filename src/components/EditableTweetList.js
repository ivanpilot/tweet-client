import React from 'react';
import { store } from '../store';
import { client } from './../Client'
import { EditableTweet } from './EditableTweet';
import { onEditableTweetMode, offEditableTweetMode } from '../actions/EditableTweet';
import { editTweet, deleteTweet } from '../actions/Tweet';
import '../styles/EditableTweetList.css';

class EditableTweetList extends React.Component {

  componentDidMount(){
    store.subscribe(() => this.forceUpdate())
  }

  onEditClick = (editableTweetId) => {
    store.dispatch(onEditableTweetMode(editableTweetId))
  }

  onTrashClick = (editableTweetId) => {
    store.dispatch(deleteTweet(editableTweetId))
  }

  offEditableTweetMode = () => {
    store.dispatch(offEditableTweetMode())
  }

  onSubmitForm = (tweet) => {
    debugger
    const activeEditableTweetId = store.getState().activeEditableTweetId
    store.dispatch(editTweet(tweet, activeEditableTweetId))
    this.offEditableTweetMode()
  }

  render(){
    const state = store.getState()
    const currentUserId = client.currentUser().id
    const activeThreadId = state.activeThreadId
    const activeThread = state.threads.find((thread) => thread.id === activeThreadId)
    const editableTweets = activeThread.editableTweets.map((editableTweet, index) => (
      <EditableTweet
        key={index}
        editableTweet={editableTweet}
        activeEditableTweetId={state.activeEditableTweetId}
        currentUserId={currentUserId}
        onSubmitForm={this.onSubmitForm}
        offEditableTweetMode={this.offEditableTweetMode}
        onEditClick={this.onEditClick}
        onTrashClick={this.onTrashClick}
      />
    ))

    return(
      <div>
        {editableTweets}
      </div>
    )
  }
}

export default EditableTweetList;
