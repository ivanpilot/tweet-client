import React from 'react';
import { connect } from 'react-redux';
import { allTweets } from '../reducers/TweetsById';
import { EditableTweet } from '../components/EditableTweet';
// import { client } from '../client/Client';
// import { apiTweet } from '../client/ApiTweet';

import { onEditableTweetMode, offEditableTweetMode } from '../actions/EditableTweet';
import { addTweet, editTweet, deleteTweet } from '../actions/Tweet';
import '../styles/EditableTweetList.css';

class EditableTweetList extends React.Component {
  render(){
      // debugger
      // const tweets = this.props.tweets.map((tweet, index) =>
      //   <EditableTweet
      //     key={index}
      //     tweet={tweet}
      //   />
      // )
      // debugger
    return(
      <div>
        <EditableTweet
          tweets={this.props.tweets}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // debugger
  return {
    tweets: allTweets(state.tweetsById)
  }
}

const mapDispatchToProps = (dispatch) => {

}

export default connect(
  mapStateToProps,
  // mapDispatchToProps
) (EditableTweetList)



// const mapStateToProps = (state) => {
//   const currentUserId = client.currentUser().id
//   const activeThreadId = state.activeThreadId
//   const activeEditableTweetId = state.activeEditableTweetId
//   const activeThread = state.threads.find((thread) => thread.id === activeThreadId)
//   const editableTweets = activeThread.editableTweets
//
//   return {
//     editableTweets,
//     activeThreadId,
//     activeEditableTweetId,
//     currentUserId
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   // debugger
//   return {
//     onEditClick: (editableTweetId) => (
//       dispatch(onEditableTweetMode(editableTweetId))
//     ),
//     onTrashClick: (editableTweetId) => (
//       dispatch(deleteTweet(editableTweetId))
//     ),
//     offEditableTweetMode: () => (
//       dispatch(offEditableTweetMode())
//     ),
//     fetchTweet: () => dispatch(fetchTweet()),
//     dispatch: dispatch,
//   }
// }

// const mergeEditableTweetProps = (stateProps, dispatchProps) => {
//   // debugger
//   return {
//     ...stateProps,
//     ...dispatchProps,
//     onSubmitForm: (tweet) => {
//       dispatchProps.dispatch(editTweet(tweet, stateProps.activeEditableTweetId))
//       dispatchProps.dispatch(offEditableTweetMode())
//     },
//     preloadTweets: (tweet) => {
//       // debugger
//       dispatchProps.dispatch(addTweet(tweet, stateProps.activeThreadId))
//     },
//     // fetchTweet: fetchTweet,
//   }
// }

// export default connect (
//   mapStateToProps,
//   mapDispatchToProps,
//   // mergeEditableTweetProps
// )(EditableTweetList)

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
