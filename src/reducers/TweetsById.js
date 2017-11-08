import _ from 'lodash';

export function tweetsById(state = {
  '1': {
    title: 'First Tweet',
    body: 'Hi I am the first',
    user_id: '1',
    editable: false
  },
  '2': {
    title: 'Second Tweet',
    body: 'Hi I am the second',
    user_id: '1',
    editable: false
  }
}, action){
  switch (action.type) {
    case 'ADD_TWEET': {
      return {
        [action.tweet.id]: action.tweet,
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

    case 'TRIGGER_TWEET': {
      return state
    }

    case 'LOAD_TWEETS': {
      return state
    }

    default:
      return state
  }
}

export const allTweets = (state) => {
  return _.keys(state).map(id => ({
    id: id,
    title: state[id].title,
    body: state[id].body,
    userId: state[id].user_id,
    editable: false,
    ownership: true,
    // ownership: state[id].user_id === client.currentUser().id
  })
  )
}
