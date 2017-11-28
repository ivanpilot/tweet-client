import { combineReducers } from 'redux';
import { tweet } from './Tweet';


export const tweets = combineReducers({
  byId,
  allIds,
})

function byId(state = {}, action){
  switch (action.type) {
    case 'ADD_TWEET':
    case 'CREATE_TWEET':
    case 'EDIT_TWEET': {
      return {
        ...state,
        [action.tweet.id]: tweet(state[action.tweet.id], action)
      }
    }

    // case 'ERASE_TWEET':
    case 'DELETE_TWEET': {
      const newState = Object.assign({}, state)
      delete newState[action.id]
      return Object.assign({}, newState)
    }

    case 'TRIGGER_EDITABLE_TWEET':
    case 'TRIGGER_ACTIVABLE_TWEET':
    case 'TRIGGER_FETCHING_TWEET': {
      return {
        ...state,
        [action.id]: tweet(state[action.id], action)
      }
    }

    case 'ADD_COMMENT_TO_TWEET':
    case 'DELETE_COMMENT_IN_TWEET': {
      return {
        ...state,
        [action.tweetId]: tweet(state[action.tweetId], action)
      }
    }

    default:
      return state
  }
}


function allIds(state = [], action){
  switch (action.type) {
    case 'ADD_TWEET':
    case 'CREATE_TWEET': {
      return [action.tweet.id, ...state]
    }

    // case 'ERASE_TWEET':
    case 'DELETE_TWEET': {
      return state.filter(id => id !== action.id)
    }

    default:
      return state
  }
}

export const getAllTweets = (state, listOfTweets) => {
  return listOfTweets.reduce((result, tweetId) => {
    return [...result, state.entities.tweets.byId[tweetId]]
  }, [])
}

export const getListOfTweetIds = (state) => state.allIds

export const getEditableTweet = (state) => {
  return state.allIds.find(id => state.byId[id].editable)
  // return Object.keys(state.byId).find(id => state.byId[id].editable)
}

export const getActiveTweet = (state) => {
  return state.allIds.find(id => state.byId[id].active)


  // return Object.keys(state.byId).find(id => state.byId[id].active)

  // const tweetId = Object.keys(state.byId).find(id => state.byId[id].active)
  // const numTweetId = parseInt(tweetId, 10)
  // return numTweetId == tweetId ? numTweetId : tweetId
}
