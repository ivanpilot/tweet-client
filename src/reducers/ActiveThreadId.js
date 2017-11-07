import { initialState } from './InitialState';

export function activeThreadId(state = initialState.activeThreadId, action){
  switch (action.type) {
    case 'OPEN_THREAD':
      return action.threadId
    default:
      return state
  }
}
