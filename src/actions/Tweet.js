import * as types from './ActionTypes';

export function addTweet(tweet, threadId){
  return {
      type: types.ADD_TWEET,
      tweet: tweet,
      threadId: threadId
  }
}

export function editTweet(tweet, editableTweetId){
  return {
      type: types.EDIT_TWEET,
      tweet: tweet,
      editableTweetId: editableTweetId
  }
}

export function deleteTweet(editableTweetId){
  return {
      type: types.DELETE_TWEET,
      editableTweetId: editableTweetId
  }
}

export function triggerEditable(id){
  return {
    type: types.TRIGGER_EDITABLE,
    id: id
  }
}
