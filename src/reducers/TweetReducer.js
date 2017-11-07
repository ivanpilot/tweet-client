import { initialState } from './InitialState';
// import { client } from '../client/Client';
import uuid from 'uuid';


export function tweetReducer(state = initialState.tweet, action) {
  switch (action.type) {
    case 'ADD_TWEET': {
      // const currentUserId = client.currentUser().id
      return {
        id: action.tweet.id,
        title: action.tweet.title,
        body: action.tweet.body,
        // userId: currentUserId
        userId: action.tweet.userId
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
