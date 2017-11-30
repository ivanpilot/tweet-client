import { client } from '../client/Client';

export function comment(state, action){
  switch (action.type) {
    case 'ADD_COMMENT': {
      return {
        id: action.comment.id,
        react_id: action.comment.react_id,
        description: action.comment.description,
        post_id: action.comment.post_id,
        commenter_id: action.comment.commenter_id,
        isFetching: false,
        editable: false,
        ownership: action.comment.commenter_id === client.getCurrentUserId() //to be changed by function testing if commenter_id === currentUser.id
      }
    }

    case 'CREATE_COMMENT': {
      return {
        id: action.comment.id,
        react_id: action.comment.id,
        description: action.comment.description,
        post_id: action.comment.activeTweetId,
        commenter_id: client.getCurrentUserId(), //to be changed by replacing currentUser.id
        isFetching: true,
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

    case 'TRIGGER_FETCHING_COMMENT': {
      return {
        ...state,
        isFetching: !state.isFetching
      }
    }

    default:
      return state

  }
}
