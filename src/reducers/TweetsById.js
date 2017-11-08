export function tweetsById(state = {
  '1': {
    title: 'First Tweet',
    body: 'Hi I am the first',
    userId: '1',
    active: false
  },
  '2': {
    title: 'First Tweet',
    body: 'Hi I am the first',
    userId: '1',
    active: false
  }
}, action){
  switch (action.type) {
    case 'ADD_TWEET': {
      return {
        action.tweet,
        ...state
      }
    }

    case 'EDIT_TWEET': {
      const oldTweet = state[action.tweet.id]
      const newTweet = {
        ...oldTweet,
        title: action.tweet.title,
        body: action.tweet.body
      }
      return {
        ...state,
        [action.tweet.id]: newTweet
      }
    }

    case 'DELETE_TWEET': {
      const stateCopy = Object.assign({}, state)
      delete stateCopy[action.id]
      return {
        stateCopy
      }
    }

    default:
      return state
  }
}
