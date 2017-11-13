import { initialState } from './InitialState.js'

export function commentsById(state = initialState.commentsById, action){
  switch (action.type) {
    case 'ADD_COMMENT':
      return state
    case 'EDIT_COMMENT':
      return state
    case 'DELETE_COMMENT':
      return state
    default:
      return state
  }
}

export const getAllCommentsForTweet = (state) => {
  return Object.keys(state).filter(id => state[id].post_id !== '2').map(id => ({
    id: id,
    body: state[id].body,
    post_id: state[id].post_id,
    ownership: true,
    // ownership: state[id].user_id === client.currentUser().id
  }))
}
