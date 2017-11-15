import { initialState } from './InitialState.js';
import uuid from 'uuid';

export function commentsById(state = initialState.commentsById, action){
  switch (action.type) {
    case 'ADD_COMMENT':{
      const tempComment = newComment(action.comment)
      return {
        [tempComment.id]: tempComment.comment,
        ...state
      }
    }

    case 'EDIT_COMMENT':{
      const oldComment = state[action.comment.id]
      const newComment = {
        ...oldComment,
        description: action.comment.description,
      }
      return {
        ...state,
        [action.comment.id]: newComment
      }
    }

    case 'DELETE_COMMENT':{
      const newState = Object.assign({}, state)
      delete newState[action.id]
      return Object.assign({}, newState)
    }

    case 'TRIGGER_EDITABLE_COMMENT': {
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

    case 'DELETE_TWEET_COMMENTS':{
      const commentIds = getCommentIdsForTweet(state, action.tweetId)
      const modifiedState = Object.assign({}, state)
      commentIds.map(id => delete modifiedState[id])
      return Object.assign({}, modifiedState)
    }

    case 'LOAD_COMMENTS':
      return state
    default:
      return state
  }
}

const getCommentIdsForTweet = (state, tweetId) => {
  return Object.keys(state).filter(id => state[id].tweet_id === tweetId)
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
      tweet_id: comment.activeTweetId,
      editable: false,
      ownership: true
    }
  }
}
