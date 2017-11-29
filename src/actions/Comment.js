import * as types from './ActionTypes';

export function addComment(comment){
  return {
    type: types.ADD_COMMENT,
    comment
  }
}

export function createComment(comment){
  return {
    type: types.CREATE_COMMENT,
    comment
  }
}

export function editComment(comment){
  return {
    type: types.EDIT_COMMENT,
    comment
  }
}

export function deleteComment(id, activeTweetId){
  return {
    type: types.DELETE_COMMENT,
    id,
    activeTweetId
  }
}

export function triggerEditableComment(id){
  return {
    type: types.TRIGGER_EDITABLE_COMMENT,
    id
  }
}

export function clearComments(){
  return {
    type: types.CLEAR_COMMENTS,
  }
}

export function deleteAllCommentsInTweet(tweetId){
  return {
    type: types.DELETE_ALL_COMMENTS_IN_TWEET,
    tweetId
  }
}
