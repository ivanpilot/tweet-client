import React from 'react';
// import { store } from '../store';
import { connect } from 'react-redux';
import { client } from './../Client';
import { apiTweet } from '../api/ApiTweet';
import { EditableTweet } from './EditableTweet';
import { onEditableTweetMode, offEditableTweetMode } from '../actions/EditableTweet';
import { addTweet, editTweet, deleteTweet } from '../actions/Tweet';
import '../styles/EditableTweetList.css';

class EditableTweetList extends React.Component {
  state = {
    isLoading:false,
    isLoaded: false
  }

  componentDidMount(){
    this.setState({isLoading: true})
    apiTweet.loadTweets((tweets) => {
      tweets.map(tweet => {
        const item = {
          id: tweet.id,
          title: tweet.title,
          body: tweet.body,
          userId: tweet.user_id
        }
        this.props.preloadTweets(item)
      })
      this.setState({isLoading: false, isLoaded: true})
    })

  }

  render(){
    if(this.state.isLoading){
      return(
        <div className='ui active centered inline loader' />
      )
    } else {
      return(
        <div>
          <EditableTweet
            editableTweets={this.props.editableTweets}
            activeEditableTweetId={this.props.activeEditableTweetId}
            currentUserId={this.props.currentUserId}
            onSubmitForm={this.onSubmitForm}
            offEditableTweetMode={this.offEditableTweetMode}
            onEditClick={this.onEditClick}
            onTrashClick={this.onTrashClick}
          />
        </div>
      )
    }
  }
}


const mapStateToProps = (state) => {
  const currentUserId = client.currentUser().id
  const activeThreadId = state.activeThreadId
  const activeEditableTweetId = state.activeEditableTweetId
  const activeThread = state.threads.find((thread) => thread.id === activeThreadId)
  const editableTweets = activeThread.editableTweets

  return {
    editableTweets,
    activeThreadId,
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
    },
    preloadTweets: (tweet) => {
      // debugger
      dispatchProps.dispatch(addTweet(tweet, stateProps.activeThreadId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeEditableTweetProps)(EditableTweetList)

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
