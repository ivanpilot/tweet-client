export function tweetsByThread(state = {
  '1': {
    id: '1',
    name: 'My Tweets',
    isFetching: false,
    didInvalidate: false,
    lastUpdated: Date.now(),
    active: true,
    tweets: []
  },
  '2': {
    id: '2',
    name: 'Wall',
    isFetching: false,
    didInvalidate: false,
    lastUpdated: Date.now(),
    active: false,
    tweets: []
  },
}, action){
  switch (action.type) {

    case 'TRIGGER_THREAD': {
      const oldThread = state[action.id]
      const newThread = {
        ...oldThread,
        active: !oldThread.active
      }
      return {
        ...state,
        [action.id]: newThread
      }
    }

    case 'LOAD_TWEETS': {
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          tweets: action.tweets
        }
      }
    }

    case 'CREATE_TWEET': {
      return {
        ...state,
        '1': {
          ...state['1'],
          tweets: [
            action.tweet.id,
            ...state['1'].tweets
          ]
        }
      }
    }

    default:
      return state
  }
}

export const getAllThreads = (state) => {
  return Object.keys(state).map(id => ({
      id: id,
      name: state[id].name,
      active: state[id].active
    })
  )
}

export const getActiveThread = (state) => {
  return Object.keys(state).find(id => state[id].active)
}

export const getTweetsForActiveThread = (state) => {
  const activeThreadId = getActiveThread(state)
  return state[activeThreadId].tweets
}
