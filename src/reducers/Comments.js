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
        descripton: action.comment.description
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
        [action.comment.id]: comment(state[action.comment.id], action),
        ...state
      }
    }

    // case 'EDIT_COMMENT': {
    //   return state
    // }

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

    // case 'DELETE_TWEET_COMMENTS': {
    //   return state
    // }

    case 'LOAD_COMMENTS': {
      const rawComments = action.comments.entities.comments;
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
      return action.comments.result.concat(state)
    }

    default:
      return state
  }
}

export const getCommentById = (state, id) => {
  return state.byId[id]
}

export const getEditableComment = (state) => {
  return Object.keys(state.byId).find(id => state.byId[id].editable)
}

// const getCommentIdsForTweet = (state, tweetId) => {
//   return Object.keys(state.byId).filter(id => state.byId[id].tweet_id === tweetId)
// }


// export const getAllCommentsForTweet = (state, activeTweetId) => {
//   return Object.keys(state.byId).filter(id => state.byId[id].tweet_id === activeTweetId).map(id => ({
//     id: id,
//     description: state[id].description,
//     tweetId: state[id].tweet_id,
//     userId: state[id].user_id,
//     editable: state[id].editable || false,
//     ownership: true,
//     // ownership: state[id].user_id === client.currentUser().id
//   }))
// }

//
// export function commentsById(state = initialState.commentsById, action){
//   switch (action.type) {
//     case 'ADD_COMMENT':{
//       const tempComment = newComment(action.comment)
//       return {
//         [tempComment.id]: tempComment.comment,
//         ...state
//       }
//     }
//
//     case 'EDIT_COMMENT':{
//       const oldComment = state[action.comment.id]
//       const newComment = {
//         ...oldComment,
//         description: action.comment.description,
//       }
//       return {
//         ...state,
//         [action.comment.id]: newComment
//       }
//     }
//
//     case 'DELETE_COMMENT':{
//       const newState = Object.assign({}, state)
//       delete newState[action.id]
//       return Object.assign({}, newState)
//     }
//
//     case 'TRIGGER_EDITABLE_COMMENT': {
//       const oldEditable = state[action.id]
//       const newEditable = {
//         ...oldEditable,
//         editable: !oldEditable.editable
//       }
//
//       return {
//         ...state,
//         [action.id]: newEditable
//       }
//     }
//
//     //should be simplified with normalizer
//     case 'DELETE_TWEET_COMMENTS':{
//       const commentIds = getCommentIdsForTweet(state, action.tweetId)
//       const modifiedState = Object.assign({}, state)
//       commentIds.map(id => delete modifiedState[id])
//       return Object.assign({}, modifiedState)
//     }
//
//     case 'LOAD_COMMENTS':
//       return state
//     default:
//       return state
//   }
// }
//
// const getCommentIdsForTweet = (state, tweetId) => {
//   return Object.keys(state).filter(id => state[id].tweet_id === tweetId)
// }
//
// // export const getEditableCommentForTweet = (state, tweetId) => {
// //
// //   return Object.keys(state).filter(id => state[id].tweet_id === tweetId).find(id => state[id].editable)
// // }
//
//
// export const getAllCommentsForTweet = (state, activeTweetId) => {
//   return Object.keys(state).filter(id => state[id].tweet_id === activeTweetId).map(id => ({
//     id: id,
//     description: state[id].description,
//     tweetId: state[id].tweet_id,
//     userId: state[id].user_id,
//     editable: state[id].editable || false,
//     ownership: true,
//     // ownership: state[id].user_id === client.currentUser().id
//   }))
// }
//
// export const getEditableComment = (state) => {
//   return Object.keys(state).find(id => state[id].editable)
// }
//
// function newComment(comment){
//   return {
//     id: uuid.v4(),
//     comment: {
//       description: comment.description,
//       tweet_id: comment.activeTweetId,
//       editable: false,
//       ownership: true
//     }
//   }
// }
