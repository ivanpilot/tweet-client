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
      // debugger
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          tweets: action.tweets
        }
      }
    }

    case 'LOAD_TWEET': {
      // debugger
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          tweets: [action.tweet, ...state[action.id].tweets]
        }
      }
    }

    case 'CREATE_TWEET': {
      // debugger
      return {
        ...state,
        '1': {
          ...state['1'],
          tweets: [
            action.tweet.id,
            ...state['1'].tweets
          ]
        },
        '2': {
          ...state['2'],
          tweets: [
            action.tweet.id,
            ...state['2'].tweets
          ]
        }
      }
    }

    // case 'ERASE_TWEET': 
    case 'DELETE_TWEET': {
      return {
        ...state,
        '1': {
          ...state['1'],
          tweets: state['1'].tweets.filter(id => id !== action.id)
        },
        '2': {
          ...state['2'],
          tweets: state['2'].tweets.filter(id => id !== action.id)
        }
      }
      // return {
      //   ...state,
      //   [action.threadId]: {
      //     ...state[action.threadId],
      //     tweets: state[action.threadId].tweets.filter(id => id !== action.id)
      //   }
      // }
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
  // debugger
  return state[activeThreadId].tweets
}
