// import {editableTweetReducer} from './EditableTweetReducer'
// import {client} from '../Client';
// import uuid from 'uuid';
// import {editableTweetsReducer} from './EditableTweetsReducer'
import {findThreadIndex} from './FindThreadIndex'
import {editableTweetsReducer} from './EditableTweetsReducer'

//OK
// function findThreadIndex(threads, action){
//   switch (action.type) {
//     case 'ADD_TWEET':
//       return threads.findIndex((t) => t.id === action.threadId)
//
//     case 'EDIT_TWEET':
//     case 'DELETE_TWEET':
//       return threads.findIndex((t) => t.editableTweets.find(
//         (eT) => eT.id === action.editableTweetId
//       ))
//
//     default:
//       return threads
//   }
// }

// function tweetReducer(state = {
//   id: 1,
//   title: 'Hey I am first',
//   body: 'I am the first tweet ever typed in here',
//   userId: '1'
// }, action) {
//   switch (action.type) {
//     case 'ADD_TWEET': {
//       const currentUserId = client.currentUser().id
//       return {
//         id: uuid.v4(),
//         title: action.tweet.title,
//         body: action.tweet.body,
//         userId: currentUserId
//       }
//     }
//
//     case 'EDIT_TWEET': {
//       // debugger
//       return {
//         ...state,
//         title: action.tweet.title,
//         body: action.tweet.body
//       }
//     }
//
//     default:
//       return state
//   }
// }

//OK >> state amended
// function editableTweetReducer(state = {
//   id: '1',
//   // tweet: tweetReducer(state, {})
//   tweet: {} //////tweetReducer(state, {})
// }, action) {
//   switch (action.type) {
//     case 'ADD_TWEET': {
//       return {
//         id: uuid.v4(),
//         tweet: tweetReducer(null, action)
//       }
//     }
//
//     case 'EDIT_TWEET': {
//       // debugger
//       return {
//         ...state,
//         tweet: tweetReducer(state.tweet, action)
//       }
//     }
//
//     default:
//       return state
//   }
// }


// OK >> state amended
// function editableTweetsReducer(state = [
//   {
//     id: '1',
//     // tweet: tweetReducer(state, {})
//     tweet: {}  //////tweetReducer(state, {})
//   },
//   {
//     id: '2',
//     // tweet: tweetReducer(state, {})
//     tweet: {}  //////tweetReducer(state, {})
//   }
// ], action) {
//   switch (action.type) {
//     case 'ADD_TWEET': {
//       return [
//         editableTweetReducer(null, action),
//         ...state
//       ]
//     }
//
//     case 'EDIT_TWEET': {
//       const editableTweetIndex = state.findIndex((eT) => (
//         eT.id === action.editableTweetId
//       ))
//       const oldEditableTweet = state[editableTweetIndex]
//       const newEditableTweet = editableTweetReducer(oldEditableTweet, action)
//
//       return [
//         ...state.slice(0, editableTweetIndex),
//         newEditableTweet,
//         ...state.slice(editableTweetIndex + 1, state.length)
//       ]
//     }
//
//     case 'DELETE_TWEET': {
//       return [
//         ...state.filter(eT => eT.id !== action.editableTweetId)
//       ]
//     }
//
//     default:
//       return state
//   }
// }

//OK >> state amended
export function threadsReducer(state = [
  {
    id: 'user-v1',
    name: 'My Tweets',
    // editableTweets: editableTweetsReducer(state, action = {})
    editableTweets: []  ///////editableTweetsReducer(state, action = {})
  },
  {
    id: 'all',
    name: 'Wall',
    // editableTweets: editableTweetsReducer(state, action = {})
    editableTweets: []  ///////editableTweetsReducer(state, action = {})
  }], action) {
  switch (action.type) {
    case 'ADD_TWEET':
    case 'EDIT_TWEET':
    case 'DELETE_TWEET':{
      const threadIndex = findThreadIndex(state, action)
      const oldThread = state[threadIndex]
      const newThread = {
        ...oldThread,
        editableTweets: editableTweetsReducer(oldThread.editableTweets, action)
      }
      return [
        ...state.slice(0, threadIndex),
        newThread,
        ...state.slice(threadIndex + 1, state.length)
      ]
    }

    default:
      return state
  }
}
