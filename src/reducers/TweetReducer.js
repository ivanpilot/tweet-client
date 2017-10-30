import {client} from '../Client';
import uuid from 'uuid';


export function tweetReducer(state = {}, action) {
  switch (action.type) {
    case 'ADD_TWEET': {
      const currentUserId = client.currentUser().id
      return {
        id: uuid.v4(),
        title: action.tweet.title,
        body: action.tweet.body,
        userId: currentUserId
      }
    }

    case 'EDIT_TWEET': {
      return {
        ...state,
        title: action.tweet.title,
        body: action.tweet.body
      }
    }

    default:
      return state
  }
}
