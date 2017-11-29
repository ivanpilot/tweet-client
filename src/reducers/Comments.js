import { combineReducers } from 'redux';
import { comment } from './Comment';

export const comments = combineReducers({
  byId,
  allIds,
})

function byId(state = {}, action){
  switch (action.type) {
    case 'ADD_COMMENT':
    case 'CREATE_COMMENT':
    case 'EDIT_COMMENT': {
      return {
        ...state,
        [action.comment.id]: comment(state[action.comment.id], action)
      }
    }

    case 'DELETE_COMMENT': {
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

    // case 'LOAD_COMMENTS': {
    //   const entities = action.comments.entities
    //   if(Object.keys(entities).length === 0){
    //     return {}
    //   } else {
    //     const rawComments = entities.comments;
    //     return Object.keys(rawComments).reduce((result, id) => {
    //       return Object.assign({}, result, Object.assign({}, {[id]: comment(rawComments[id], action)}))
    //     }, {})
    //   }
    // }

    case 'CLEAR_COMMENTS': {
      return {}
    }

    default:
      return state
  }
}

function allIds(state = [], action){
  switch (action.type) {
    case 'ADD_COMMENT':
    case 'CREATE_COMMENT': {
      return [action.comment.id, ...state]
    }

    case 'DELETE_COMMENT': {
      return state.filter(id => id !== action.id)
    }

    // case 'LOAD_COMMENTS': {
    //   return action.comments.result
    // }

    case 'CLEAR_COMMENTS': {
      return []
    }

    default:
      return state
  }
}

export const getCommentById = (state, id) => {
  return state.byId[id]
}

export const getEditableComment = (state) => {
  if(Object.keys(state).length > 0){
    return Object.keys(state).find(id => state[id].editable)
  }
}

export const getAllCommentsForTweet = (state) => {
  return state.allIds.map(id => state.byId[id])
}
