import {findThreadIndex} from './FindThreadIndex'
import {editableTweetsReducer} from './EditableTweetsReducer'

export function threads(state = [
  {
    id: 'user-v1',
    name: 'My Tweets',
    editableTweets: []
  },
  {
    id: 'all',
    name: 'Wall',
    editableTweets: []
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
