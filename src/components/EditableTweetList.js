// import React from 'react';
import { connect } from 'react-redux';
// import { store } from '../store';
import { client } from './../Client';
import { EditableTweet } from './EditableTweet';
import { onEditableTweetMode, offEditableTweetMode } from '../actions/EditableTweet';
import { editTweet, deleteTweet } from '../actions/Tweet';
import '../styles/EditableTweetList.css';

const mapStateToProps = (state) => {
  const currentUserId = "1"//client.currentUser().id
  const activeThreadId = state.activeThreadId
  const activeEditableTweetId = state.activeEditableTweetId
  const activeThread = state.threads.find((thread) => thread.id === activeThreadId)
  const editableTweets = activeThread.editableTweets

  return {
    editableTweets,
    activeEditableTweetId,
    currentUserId
  }
}

const mapDispatchToProps = (dispatch) => ({
  onEditClick: (editableTweetId) => (
    dispatch(onEditableTweetMode(editableTweetId))
  ),
  onTrashClick: (editableTweetId) => (
    dispatch(deleteTweet(editableTweetId))
  ),
  offEditableTweetMode: () => (
    dispatch(offEditableTweetMode())
  ),
  dispatch: dispatch
})

const mergeEditableTweetProps = (stateProps, dispatchProps) => {
  return {
    ...stateProps,
    ...dispatchProps,
    onSubmitForm: (tweet) => {
      dispatchProps.dispatch(editTweet(tweet, stateProps.activeEditableTweetId))
      dispatchProps.dispatch(offEditableTweetMode())
    }
  }
}

export const EditableTweetList = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeEditableTweetProps
)(EditableTweet)

// class EditableTweetList extends React.Component {
//
//   componentDidMount(){
//     store.subscribe(() => this.forceUpdate())
//   }
//
//   onEditClick = (editableTweetId) => {
//     store.dispatch(onEditableTweetMode(editableTweetId))
//   }
//
//   onTrashClick = (editableTweetId) => {
//     store.dispatch(deleteTweet(editableTweetId))
//   }
//
//   offEditableTweetMode = () => {
//     store.dispatch(offEditableTweetMode())
//   }
//
//   onSubmitForm = (tweet) => {
//     const activeEditableTweetId = store.getState().activeEditableTweetId
//     store.dispatch(editTweet(tweet, activeEditableTweetId))
//     this.offEditableTweetMode()
//   }
//
//   render(){
//     const state = store.getState()
//     const currentUserId = client.currentUser().id
//     const activeThreadId = state.activeThreadId
//     const activeThread = state.threads.find((thread) => thread.id === activeThreadId)
//     const editableTweets = activeThread.editableTweets.map((editableTweet, index) => (
//       <EditableTweet
//         key={index}
//         editableTweet={editableTweet}
//         activeEditableTweetId={state.activeEditableTweetId}
//         currentUserId={currentUserId}
//         onSubmitForm={this.onSubmitForm}
//         offEditableTweetMode={this.offEditableTweetMode}
//         onEditClick={this.onEditClick}
//         onTrashClick={this.onTrashClick}
//       />
//     ))
//
//     return(
//       <div>
//         {editableTweets}
//       </div>
//     )
//   }
// }
//
// export default EditableTweetList;
