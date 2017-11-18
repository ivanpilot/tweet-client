// import _ from 'lodash';
import uuid from 'uuid';
import { initialState } from './InitialState';
import { combineReducers } from 'redux';

// export function tweetsById(state = initialState.tweetsById, action){

export const tweets = combineReducers({
  byId,
  allIds,
})

function tweet(state, action){
  switch(action.type){
    case 'ADD_TWEET': {
      return {
        id: action.tweet.id,
        title: action.tweet.title,
        body: action.tweet.body,
        editable: false,
        active: false,
        userId: action.tweet.title || null
      }
    }

    case 'EDIT_TWEET': {
      return {
        ...state,
        title: action.tweet.title,
        body: action.tweet.body,
      }
    }

    case 'TRIGGER_EDITABLE_TWEET': {
      return {
        ...state,
        editable: !state.editable
      }
    }

    case 'TRIGGER_ACTIVABLE_TWEET': {
      return {
        ...state,
        activable: !state.activable
      }
    }

  }
}


function byId(state = {}, action){
  switch (action.type) {
    // case 'ADD_TWEET': {
    //   return {
    //     ...state,
    //     [action.tweet.id] = tweet(state[action.tweet.id], action)
    //   }
    // }
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

    // case 'TRIGGER_EDITABLE_TWEET': {
    //   return {
    //     ...state,
    //     [action.id] = tweet(state[action.id], action)
    //   }
    // }
    case 'TRIGGER_EDITABLE_TWEET':
    case 'TRIGGER_ACTIVABLE_TWEET': {
      return {
        ...state,
        [action.id]: tweet(state[action.id], action)
      }
    }

    case 'LOAD_TWEETS': {
      // debugger
      return action.tweets.entities.tweets
    }

    default:
      return state
  }
}


function allIds(state = [], action){
  switch (action.type) {
    case 'ADD_TWEET': {
      return state.concat(action.tweet.id)
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
  return Object.keys(state).find(id => state[id].editable)
}

export const getActiveTweet = (state) => {
  return Object.keys(state).find(id => state[id].active)
}



// export function tweetsById(state = {}, action){
//   switch (action.type) {
//     case 'ADD_TWEET': {
//       const tempTweet = newTweet(action.tweet)
//       return {
//         [tempTweet.id]: tempTweet.tweet,
//         ...state
//       }
//     }
//
//     case 'EDIT_TWEET': {
//       const oldTweet = state[action.tweet.id]
//       const newTweet = {
//         ...oldTweet,
//         title: action.tweet.title,
//         body: action.tweet.body
//       }
//       return {
//         ...state,
//         [action.tweet.id]: newTweet
//       }
//     }
//
//     case 'DELETE_TWEET': {
//       const newState = Object.assign({}, state)
//       delete newState[action.id]
//       return Object.assign({}, newState)
//     }
//
//     case 'TRIGGER_EDITABLE_TWEET': {
//       const oldEditable = state[action.id]
//       const newEditable = {
//         ...oldEditable,
//         editable: !oldEditable.editable
//       }
//       return {
//         ...state,
//         [action.id]: newEditable
//       }
//     }
//
//     case 'TRIGGER_ACTIVABLE_TWEET': {
//       const oldActivable = state[action.id]
//       const newActivable = {
//         ...oldActivable,
//         active: !oldActivable.active
//       }
//       return {
//         ...state,
//         [action.id]: newActivable
//       }
//     }
//
//     case 'LOAD_TWEETS': {
//       // const tweets = action.tweets.entities.tweets
//       //
//       // return Object.keys(tweets).reduce((result, tweet) => {
//       //   return Object.assign({}, result, Object.assign({}, {[tweets[tweet].id]: tweets[tweet]}))
//       // }, {})
//       return action.tweets.entities.tweets
//     }
//
//     default:
//       return state
//   }
// }

// export const getAllTweets = (state) => {
//   return Object.keys(state).map(id => ({
//     id: id,
//     title: state[id].title,
//     body: state[id].body,
//     userId: state[id].user_id,
//     editable: state[id].editable || false,
//     active: state[id].active,
//     ownership: true,
//     // ownership: state[id].user_id === client.currentUser().id
//   })
//   )
// }

// export const getEditableTweet = (state) => {
//   return Object.keys(state).find(id => state[id].editable)
// }
//
// export const getActiveTweet = (state) => {
//   return Object.keys(state).find(id => state[id].active)
// }

// function newTweet(tweet){
//   return {
//     id: uuid.v4(),
//     tweet: {
//       title: tweet.title,
//       body: tweet.body,
//       editable: false,
//       active: false,
//       userId: '1'
//     }
//   }
// }
