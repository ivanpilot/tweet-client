import _ from 'lodash';

export function threadsById(state = {
  '1': {
    name: 'My Tweets',
    active: true
  },
  '2': {
    name: 'Wall',
    active: false
  }
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

export const allThreads = (state) => {
  return _.keys(state).map(id => ({
      id: id,
      name: state[id].name,
      active: state[id].active
    })
  )
}

export const activeThread = (state) => {
  return Object.keys(state).find(id => state[id].active)
}
