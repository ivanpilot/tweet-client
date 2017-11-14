import _ from 'lodash';
import uuid from 'uuid';
import { initialState } from './InitialState';

export function tweetsById(state = initialState.tweetsById, action){
  switch (action.type) {
    case 'ADD_TWEET': {
      const tempTweet = newTweet(action.tweet)
      return {
        [tempTweet.id]: tempTweet.tweet,
        ...state
      }
    }

    case 'EDIT_TWEET': {
      const oldTweet = state[action.tweet.id]
      const newTweet = {
        ...oldTweet,
        title: action.tweet.title,
        body: action.tweet.body
      }
      return {
        ...state,
        [action.tweet.id]: newTweet
      }
    }

    case 'DELETE_TWEET': {
      const newState = Object.assign({}, state)
      delete newState[action.id]
      return Object.assign({}, newState)
    }

    case 'TRIGGER_EDITABLE': {
      const oldEditable = state[action.id]
      const newEditable = {
        ...oldEditable,
        editable: !oldEditable.editable
      }
      return {
        ...state,
        [action.id]: newEditable
      }
    }

    case 'TRIGGER_ACTIVABLE': {
      const oldActivable = state[action.id]
      const newActivable = {
        ...oldActivable,
        active: !oldActivable.active
      }
      return {
        ...state,
        [action.id]: newActivable
      }
    }

    case 'LOAD_TWEETS': {
      return state
    }

    default:
      return state
  }
}

export const getAllTweets = (state) => {
  return _.keys(state).map(id => ({
    id: id,
    title: state[id].title,
    body: state[id].body,
    userId: state[id].user_id,
    editable: state[id].editable || false,
    active: state[id].active,
    ownership: true,
    // ownership: state[id].user_id === client.currentUser().id
  })
  )
}

export const getEditableTweet = (state) => {
  return Object.keys(state).find(id => state[id].editable)
}

export const getActiveTweet = (state) => {
  return Object.keys(state).find(id => state[id].active)
}

function newTweet(tweet){
  return {
    id: uuid.v4(),
    tweet: {
      title: tweet.title,
      body: tweet.body,
      editable: false,
      active: false,
      ownership: true
    }
  }
}
