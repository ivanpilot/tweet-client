import { combineReducers } from 'redux';
import { tweet } from './Tweet';


export const tweetsWIP = combineReducers({
  byId,
  allIds,
})

function byId(state = {}, action){
  switch (action.type) {
    case 'CREATE_TWEET':
    // case 'UPDATE_TWEET': {
      return {
        ...state,
        [action.tweet.id]: tweet(state[action.tweet.id], action)
      }
    // }

    // case 'DELETE_TWEET': {
    //   const newState = Object.assign({}, state)
    //   delete newState[action.id]
    //   return Object.assign({}, newState)
    // }
    //
    // case 'CREATE_COMMENT_TO_TWEET':
    // case 'DELETE_COMMENT_IN_TWEET': {
    //   return {
    //     ...state,
    //     [action.tweetId]: tweet(state[action.tweetId], action)
    //   }
    // }

    default:
      return state
  }
}


function allIds(state = [], action){
  switch (action.type) {
    case 'CREATE_TWEET': {
      return [action.tweet.id, ...state]
    }
    //
    // case 'DELETE_TWEET': {
    //   return state.filter(id => id !== action.id)
    // }

    default:
      return state
  }
}

// export const getAllTweets = (state, listOfTweets) => {
//   return listOfTweets.reduce((result, tweetId) => {
//     return [...result, state.byId[tweetId]]
//   }, [])
// }
//
// export const getEditableTweet = (state) => {
//   return Object.keys(state.byId).find(id => state.byId[id].editable)
// }
//
// export const getActiveTweet = (state) => {
//   const tweetId = Object.keys(state.byId).find(id => state.byId[id].active)
//   const numTweetId = parseInt(tweetId, 10)
//   return numTweetId == tweetId ? numTweetId : tweetId
// }
