import * as types from './ActionTypes';

export function onEditableTweetMode(editableTweetId){
  return {
    type: types.ON_EDITABLE_TWEET_MODE,
    editableTweetId: editableTweetId
  }
}

export function offEditableTweetMode(){
  return {
    type: types.OFF_EDITABLE_TWEET_MODE
  }
}
