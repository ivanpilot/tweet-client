import { initialState } from './InitialState.js';
import uuid from 'uuid';

export function commentsById(state = initialState.commentsById, action){
  switch (action.type) {
    case 'ADD_COMMENT': {
      const tempComment = newComment(action.comment)
      return {
        [tempComment.id]: tempComment.comment,
        ...state
      }
    }
    case 'EDIT_COMMENT':
      return state
    case 'DELETE_COMMENT':
      return state
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

    case 'LOAD_COMMENTS':
      return state
    default:
      return state
  }
}

export const getAllCommentsForTweet = (state, activeTweetId) => {
  return Object.keys(state).filter(id => state[id].tweet_id === activeTweetId).map(id => ({
    id: id,
    description: state[id].description,
    tweetId: state[id].tweet_id,
    userId: state[id].user_id,
    editable: state[id].editable || false,
    ownership: true,
    // ownership: state[id].user_id === client.currentUser().id
  }))
}

export const getEditableComment = (state) => {
  return Object.keys(state).find(id => state[id].editable)
}

function newComment(comment){
  return {
    id: uuid.v4(),
    comment: {
      description: comment.description,
      tweet_id: comment.activeTweet.id,
      editable: false,
      ownership: true
    }
  }
}
