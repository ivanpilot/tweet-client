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

  //OK
  offEditableTweetMode = () => {
    store.dispatch(offEditableTweetMode())
  }

  //OK
  onSubmitForm = (tweet) => {
    const activeEditableTweetId = store.getState().activeEditableTweetId
    store.dispatch(editTweet(tweet, activeEditableTweetId))
    this.offEditableTweetMode()
  }

  render(){
    // debugger
    const state = store.getState()
    const currentUserId = client.currentUser().id
    const activeThreadId = state.activeThreadId
    const activeThread = state.threads.find((thread) => thread.id === activeThreadId)
    const editableTweets = activeThread.editableTweets.map((editableTweet, index) => (
      <EditableTweet
        key={index}
        editableTweet={editableTweet}
        activeEditableTweetId={state.activeEditableTweetId}
        currentUserId={currentUserId} //OK
        onSubmitForm={this.onSubmitForm} //OK
        offEditableTweetMode={this.offEditableTweetMode}
        onEditClick={this.onEditClick} //OK
        onTrashClick={this.onTrashClick} //OK
      />
    ))

    return(
      <div>
        {editableTweets}
      </div>
    )
  }
}


// class EditableTweetList extends React.Component {
//
//   componentDidMount(){
//     store.subscribe(() => this.forceUpdate())
//   }
//
//   render(){
//     const state = store.getState()
//     const activeThreadId = state.activeThreadId
//     const activeThread = state.threads.find((thread) => thread.id === activeThreadId)
//     const editableTweets = activeThread.editableTweets.map((editableTweet, index) => (
//       <div
//         className='ui center aligned grid'
//         key={index}
//       >
//         <EditableTweet
//           store={store}
//           editableTweet={editableTweet}
//           activeEditableTweetId={state.activeEditableTweetId}
//         />
//       </div>
//     ))
//
//     return(
//       <div className='tweet-list'>
//         {editableTweets}
//       </div>
//     )
//   }
// }

export default EditableTweetList;
