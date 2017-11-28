import * as types from './ActionTypes';

export function addTweet(tweet){
  return {
    type: types.ADD_TWEET,
    tweet: tweet,
  }
}

export function createTweet(tweet){
  return {
    type: types.CREATE_TWEET,
    tweet
  }
}

export function editTweet(tweet){
  return {
    type: types.EDIT_TWEET,
    tweet: tweet,
  }
}

export function deleteTweet(id){
  return {
    type: types.DELETE_TWEET,
    id: id
  }
}

export function eraseTweet(id, threadId = null){
  return {
    type: types.ERASE_TWEET,
    id,
    threadId
  }
}

export function triggerEditableTweet(id){
  return {
    type: types.TRIGGER_EDITABLE_TWEET,
    id: id
  }
}

export function triggerActivableTweet(id){
  return {
    type: types.TRIGGER_ACTIVABLE_TWEET,
    id: id
  }
}

export function addCommentToTweet(comment){
  return {
    type: types.ADD_COMMENT_TO_TWEET,
    tweetId: comment.activeTweetId,
    commentId: comment.id
  }
}

export function deleteCommentInTweet(commentId, tweetId){
  return {
    type: types.DELETE_COMMENT_IN_TWEET,
    commentId: commentId,
    tweetId: tweetId
  }
}
