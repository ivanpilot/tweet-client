import { combineReducers } from 'redux';
import { tweet } from './Tweet';


export const tweets = combineReducers({
  byId,
  allIds,
})

function byId(state = {}, action){
  switch (action.type) {
    case 'ADD_TWEET':
    case 'EDIT_TWEET': {
      return {
        ...state,
        [action.tweet.id]: tweet(state[action.tweet.id], action)
      }
    }

    case 'DELETE_TWEET': {
      const newState = Object.assign({}, state)
      delete newState[action.id]
      return Object.assign({}, newState)
    }

    case 'TRIGGER_EDITABLE_TWEET':
    case 'TRIGGER_ACTIVABLE_TWEET': {
      // debugger
      return {
        ...state,
        [action.id]: tweet(state[action.id], action)
      }
    }

    case 'LOAD_TWEETS': {
      const rawTweets = action.tweets.entities.tweets;
      return Object.keys(rawTweets).reduce((result, id) => {
        return Object.assign({}, result, Object.assign({}, {[id]: tweet(rawTweets[id], action)}))
      }, {})
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
    case 'ADD_TWEET': {
      return [action.tweet.id, ...state]
    }

    case 'DELETE_TWEET': {
      return state.filter(id => id !== action.id)
    }

    case 'LOAD_TWEETS': {
      return action.tweets.result.concat(state)
    }

    default:
      return state
  }
}

export const getAllTweets = (state) => {
  return state.allIds.map(id => state.byId[id])
}

export const getEditableTweet = (state) => {
  return Object.keys(state.byId).find(id => state.byId[id].editable)
}

export const getActiveTweet = (state) => {
  const tweetId = Object.keys(state.byId).find(id => state.byId[id].active)
  const numTweetId = parseInt(tweetId, 10)
  return numTweetId == tweetId ? numTweetId : tweetId
}
