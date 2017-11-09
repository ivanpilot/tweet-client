import React from 'react';
// import { store } from '../store';
import { connect } from 'react-redux';
import thunk from 'redux-thunk';
import { client } from '../client/Client';
// import { apiTweet } from '../client/ApiTweet';
import { EditableTweet } from '../components/EditableTweet';
import { onEditableTweetMode, offEditableTweetMode } from '../actions/EditableTweet';
import { addTweet, editTweet, deleteTweet } from '../actions/Tweet';
import '../styles/EditableTweetList.css';
// import { fetchTweet } from '../actions/FetchTweet';

class EditableTweetList extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      isLoading:false,
      isLoaded: false
    }
    // debugger
    // this.props.fetchTweet()
  }




  handleClick = () =>{
    // debugger
    // store.dispatch(fetchTweet())
    this.props.fetchTweet()
    // this.props.dispatch(fetchTweet)
  }


  componentDidMount(){
   this.props.fetchTweet()
  }

  render(){
    return(
      <div>
        <button
          onClick={this.handleClick}
        >
          TWEETA
        </button>
        {this.state.isLoading ? (
          <div className='ui active centered inline loader' />
        ) : (
          <EditableTweet
            editableTweets={this.props.editableTweets}
            activeEditableTweetId={this.props.activeEditableTweetId}
            currentUserId={this.props.currentUserId}
            onSubmitForm={this.onSubmitForm}
            offEditableTweetMode={this.offEditableTweetMode}
            onEditClick={this.onEditClick}
            onTrashClick={this.onTrashClick}
          />
        )}
      </div>
    )
  }



  // render(){
  //   if(this.state.isLoading){
  //     return(
  //       <div className='ui active centered inline loader' />
  //     )
  //   } else {
  //     return(
  //       <div>
  //         <EditableTweet
  //           editableTweets={this.props.editableTweets}
  //           activeEditableTweetId={this.props.activeEditableTweetId}
  //           currentUserId={this.props.currentUserId}
  //           onSubmitForm={this.onSubmitForm}
  //           offEditableTweetMode={this.offEditableTweetMode}
  //           onEditClick={this.onEditClick}
  //           onTrashClick={this.onTrashClick}
  //         />
  //       </div>
  //     )
  //   }
  // }
}

function fetchTweet(){
  // debugger

  return (dispatch) => {
    // debugger
    return fetch('http://localhost:3000/api/posts/1')
    .then(response => response.json())
    .then(json => {
      // debugger
      const newTweet = {
        id: json.id,
        title: json.title,
        body: json.body,
        userId: json.user_id
      }

      return dispatch({
        type: 'ADD_TWEET',
        tweet: newTweet,
        threadId: 'user-v1'
      })
    })
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

const mapDispatchToProps = (dispatch) => {
  // debugger
  return {
    onEditClick: (editableTweetId) => (
      dispatch(onEditableTweetMode(editableTweetId))
    ),
    onTrashClick: (editableTweetId) => (
      dispatch(deleteTweet(editableTweetId))
    ),
    offEditableTweetMode: () => (
      dispatch(offEditableTweetMode())
    ),
    fetchTweet: () => dispatch(fetchTweet()),
    dispatch: dispatch,
  }
}

const mergeEditableTweetProps = (stateProps, dispatchProps) => {
  // debugger
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
    },
    // fetchTweet: fetchTweet,
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps,
  // mergeEditableTweetProps
)(EditableTweetList)

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
