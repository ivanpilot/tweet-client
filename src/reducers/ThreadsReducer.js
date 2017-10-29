import {findThreadIndex} from './FindThreadIndex'
import {editableTweetsReducer} from './EditableTweetsReducer'
export function threadsReducer(state = [
  {
    id: 'user-v1',
    name: 'My Tweets',
    // editableTweets: editableTweetsReducer(state, action = {})
    editableTweets: []  ///////editableTweetsReducer(state, action = {})
  },
  {
    id: 'all',
    name: 'Wall',
    // editableTweets: editableTweetsReducer(state, action = {})
    editableTweets: []  ///////editableTweetsReducer(state, action = {})
  }], action) {
  switch (action.type) {
    case 'ADD_TWEET':
    case 'EDIT_TWEET':
    case 'DELETE_TWEET':{
      const threadIndex = findThreadIndex(state, action)
      const oldThread = state[threadIndex]
      const newThread = {
        ...oldThread,
        editableTweets: editableTweetsReducer(oldThread.editableTweets, action)
      }
      return [
        ...state.slice(0, threadIndex),
        newThread,
        ...state.slice(threadIndex + 1, state.length)
      ]
    }

    default:
      return state
  }
}
