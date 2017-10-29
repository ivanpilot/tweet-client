export function activeEditableTweetId(state = '', action){
  switch (action.type) {
    case 'ON_EDITABLE_TWEET_MODE':
      return action.editableTweetId
    case 'OFF_EDITABLE_TWEET_MODE':
      return null
    default:
      return state
  }
}
