import * as types from './ActionTypes';

export function addComment(comment){
  return {
    type: types.ADD_COMMENT,
    comment: comment,
  }
}

export function editComment(comment){
  return {
    type: types.EDIT_COMMENT,
    comment: comment,
  }
}

export function deleteComment(id, activeId){
  return {
    type: types.DELETE_COMMENT,
    id: id,
    activeTweetId: activeId
  }
}

export function triggerEditableComment(id){
  return {
    type: types.TRIGGER_EDITABLE_COMMENT,
    id: id
  }
}

export function loadComments(comments){
  return {
    type: types.LOAD_COMMENTS,
    comments: comments
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
    tweetId: tweetId
  }
}
