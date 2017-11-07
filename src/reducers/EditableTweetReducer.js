import { initialState } from './InitialState';
import { tweetReducer } from './TweetReducer';
import uuid from 'uuid';

export function editableTweetReducer(state = initialState.editableTweet, action) {
  switch (action.type) {
    case 'ADD_TWEET': {
      return {
        id: uuid.v4(),
        tweet: tweetReducer(null, action)
      }
    }

    case 'EDIT_TWEET': {
      return {
        ...state,
        tweet: tweetReducer(state.tweet, action)
      }
    }

    default:
      return state
  }
}
