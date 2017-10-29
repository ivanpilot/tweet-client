export function onEditableTweetMode(editableTweetId){
  return {
    type: 'ON_EDITABLE_TWEET_MODE',
    editableTweetId: editableTweetId
  }
}

export function offEditableTweetMode(){
  return {
    type: 'OFF_EDITABLE_TWEET_MODE'
  }
}
