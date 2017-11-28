import * as types from './ActionTypes';

export function fetchCommentsFailure(object, message){
  return {
    type: types.FETCH_COMMENTS_FAILURE,
    object,
    message
  }
}

export function fetchTweetsFailure(object, message){
  return {
    type: types.FETCH_TWEETS_FAILURE,
    object,
    message
  }
}

export function fetchCommentFailure(object, message){
  return {
    type: types.FETCH_COMMENT_FAILURE,
    object,
    message
  }
}

export function fetchTweetFailure(object, message){
  return {
    type: types.FETCH_TWEET_FAILURE,
    object,
    message
  }
}
