export function activeEditableTweetIdReducer(state = null, action){
  switch (action.type) {
    case 'ON_EDITABLE_TWEET_MODE':
      return action.id
    case 'OFF_EDITABLE_TWEET_MODE':
      return null
    default:
      return state
  }
}
