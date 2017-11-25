// import _ from 'lodash';
// import { initialState } from './InitialState';

export function tweetsByThread(state = {
  '1': {
    name: 'My Tweets',
    isFetching: false,
    didInvalidate: false,
    lastUpdated: Date.now(),
    isActive: true,
    tweets: []
  },
  '2': {
    name: 'Wall',
    isFetching: false,
    didInvalidate: false,
    lastUpdated: Date.now(),
    isActive: true,
    tweets: []
  },
}, action){
  switch (action.type) {

    case 'TRIGGER_THREAD':
      const oldThread = state[action.id]
      const newThread = {
        ...oldThread,
        active: !oldThread.active
      }
      return {
        ...state,
        [action.id]: newThread
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
