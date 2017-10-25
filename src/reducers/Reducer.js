import {client} from '../Client';
import uuid from 'uuid';

export function reducer(state, action){
  switch (action.type) {
    case 'ADD_TWEET':
      const newMessage = {
        id: uuid.v4(),
        title: action.title,
        body: action.body,
        user_id: client.currentUser().id
      }
      const activeThreadId = state.activeThreadId
      const threadIndex = state.threads.findIndex(thread => thread.id === activeThreadId)
      const oldThread = state.threads[threadIndex]
      const newThread = {
        ...oldThread,
        tweets: [
          newMessage,
          ...oldThread.tweets
        ]
      }
      debugger
      return {
        activeThreadId: state.activeThreadId,
        threads: [
          ...state.threads.slice(0, threadIndex),
          newThread,
          ...state.threads.slice(threadIndex + 1, state.threads.length)
        ]
      }

    case 'EDIT_TWEET':
      return state
    case 'DELETE_TWEET':
      return state
    case 'OPEN_THREAD':
      return state
    default:
      return state
  }
}
