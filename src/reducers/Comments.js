import { initialState } from './InitialState.js';
import uuid from 'uuid';
import { combineReducers } from 'redux';

export const comments = combineReducers({
  byId,
  allIds
})




function comment(state, action){
  switch (action.type) {
    case 'ADD_COMMENT': {
      return {
        id: action.comment.id,
        description: action.comment.description,
        tweet_id: comment.comment.activeTweetId,
        editable: false,
        ownership: true
      }
    }

    case 'EDIT_COMMENT': {
      return {
        ...state,
        description: action.comment.description
      }
    }

    case 'TRIGGER_EDITABLE_COMMENT': {
      return {
        ...state,
        editable: !state.editable
      }
    }

    case 'LOAD_COMMENTS': {
      return {
        ...state,
        editable: false,
        ownership: true,
      }
    }
  }
}

function byId(state = {}, action){
  switch (action.type) {
    case 'ADD_COMMENT':
    case 'EDIT_COMMENT': {
      return {
        ...state,
        [action.comment.id]: comment(state[action.comment.id], action)
      }
    }

    // case 'EDIT_COMMENT': {
    //   return state
    // }

    case 'DELETE_COMMENT': {
      // debugger
      const newState = Object.assign({}, state)
      delete newState[action.id]
      return Object.assign({}, newState)
    }

    case 'TRIGGER_EDITABLE_COMMENT': {
      return {
        ...state,
        [action.id]: comment(state[action.id], action)
      }
    }

    // case 'DELETE_ALL_COMMENTS_IN_TWEET': {
    //   debugger
    //   const copyState = Object.assign({}, state)
    //   Object.keys(copyState).filter(id => {
    //     if(copyState[id].post_id === action.tweetId){
    //       delete copyState[id]
    //     }
    //   })
    //   return Object.assign({}, copyState)
    // }

    case 'LOAD_COMMENTS': {
      const rawComments = action.comments.entities.comments;
      // debugger
      return Object.keys(rawComments).reduce((result, id) => {
        return Object.assign({}, result, Object.assign({}, {[id]: comment(rawComments[id], action)}))
      }, {})
    }

    default:
      return state
  }
}

function allIds(state = [], action){
  switch (action.type) {
    case 'ADD_COMMENT': {
      return [action.comment.id, ...state]
    }

    case 'DELETE_COMMENT': {
      return state.filter(id => id !== action.id)
    }

    // case 'DELETE_TWEET_COMMENTS': {
    //   return state
    // }

    case 'LOAD_COMMENTS': {
      return action.comments.result//.concat(state)
    }

    default:
      return state
  }
}

export const getCommentById = (state, id) => {
  return state.byId[id]
}

export const getEditableComment = (state) => {
  // debugger
  if(Object.keys(state).length > 0){
    // debugger
    return Object.keys(state).find(id => state[id].editable)

  } //else if(Object.keys(state).length > 0 && Object.keys(state.byId).length > 0){
  //   debugger
  //   return Object.keys(state.byId).find(id => state.byId[id].editable)
  //
  // } else {
  //   null
  // }
}

export const getAllCommentsForTweet = (stateTweets, tweetId, stateComments) => {
  // debugger
  if(tweetId){
    // debugger
    return stateTweets.byId[tweetId].comments.map(comment => getCommentById(stateComments, comment))
  }
}
