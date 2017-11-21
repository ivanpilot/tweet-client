import * as types from './ActionTypes';

export function fetchCommentsFailure(message){
  return {
    type: types.FETCH_COMMENTS_FAILURE,
    message
  }
}

export function fetchTweetsFailure(message){
  return {
    type: types.FETCH_TWEETS_FAILURE,
    message
  }
}
