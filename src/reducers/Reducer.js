import {activeThreadIdReducer} from './ActiveThreadIdReducer'
import {activeEditableTweetIdReducer} from './ActiveEditableTweetIdReducer'
import {threadsReducer} from './ThreadsReducer'

export function reducer(state = {}, action){
  return {
    activeThreadId: activeThreadIdReducer(state.activeThreadId, action),
    activeEditableTweetId: activeEditableTweetIdReducer(state.activeEditableTweetId, action),
    threads: threadsReducer(state.threads, action)
  }
}
