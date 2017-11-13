import * as types from './ActionTypes';

export function addTweet(tweet){
  return {
    type: types.ADD_TWEET,
    tweet: tweet,
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

export function triggerEditable(id){
  return {
    type: types.TRIGGER_EDITABLE,
    id: id
  }
}

export function triggerActivable(id){
  return {
    type: types.TRIGGER_ACTIVABLE,
    id: id
  }
}
