import { client } from '../client/Client';

export function tweet(state, action){
  switch(action.type){
    case 'ADD_TWEET': {
      // debugger
      return {
        id: action.tweet.id,
        react_id: action.tweet.react_id,
        title: action.tweet.title,
        body: action.tweet.body,
        comments: action.tweet.comments,
        isFetching: false,
        editable: false,
        active: false,
        ownership: action.tweet.author_id === client.getCurrentUser().id, //to be changed by function testing if author_id === currentUser.id
        author_id: action.tweet.author_id,
        author_name: client.getCurrentUser().username,
      }
    }

    case 'CREATE_TWEET': {
      return {
        id: action.tweet.id,
        react_id: action.tweet.id,
        title: action.tweet.title,
        body: action.tweet.body,
        isFetching: true,
        author_id: client.getCurrentUser().id, //to be changed by replacing currentUser.id
        author_name: client.getCurrentUser().username,
      }
    }

    case 'EDIT_TWEET': {
      return {
        ...state,
        title: action.tweet.title,
        body: action.tweet.body,
      }
    }

    case 'TRIGGER_FETCHING_TWEET': {
      return {
        ...state,
        isFetching: !state.isFetching
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
        active: !state.active
      }
    }

    case 'ADD_COMMENT_TO_TWEET':
    case 'CREATE_COMMENT_TO_TWEET': {
      return {
        ...state,
        comments: [action.commentId, ...state.comments]
      }
    }

    case 'DELETE_COMMENT_IN_TWEET': {
      return {
        ...state,
        comments: state.comments.filter(id => id !== action.commentId)
      }
    }

    default:
      return state

  }
}
