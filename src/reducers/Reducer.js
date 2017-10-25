import {client} from '../Client';
import uuid from 'uuid';

export function reducer(state, action){
  switch (action.type) {
    case 'ADD_TWEET': {
      const newMessage = {
        id: uuid.v4(),
        title: action.tweet.title,
        body: action.tweet.body,
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

      return {
        activeThreadId: state.activeThreadId,
        threads: [
          ...state.threads.slice(0, threadIndex),
          newThread,
          ...state.threads.slice(threadIndex + 1, state.threads.length)
        ]
      }
    }

    case 'EDIT_TWEET': {
      const activeThreadId = state.activeThreadId
      const threadIndex = state.threads.findIndex(thread => thread.id === activeThreadId)
      const oldThread = state.threads[threadIndex]
      const messageIndex = oldThread.tweets.findIndex(tweet => tweet.id === action.tweet.id)
      const oldMessage = oldThread.tweets[messageIndex]
      const newMessage = {
        ...oldMessage,
        title: action.tweet.title,
        body: action.tweet.body
      }
      const newThread = {
        ...oldThread,
        tweets: [
          ...oldThread.tweets.slice(0, messageIndex),
          newMessage,
          ...oldThread.tweets.slice(messageIndex + 1, oldThread.tweets.length)
        ]
      }

      return {
        activeThreadId: state.activeThreadId,
        threads: [
          ...state.threads.slice(0, threadIndex),
          newThread,
          ...state.threads.slice(threadIndex + 1, state.threads.length)
        ]
      }
    }
    case 'DELETE_TWEET': {
      const activeThreadId = state.activeThreadId
      const threadIndex = state.threads.findIndex(thread => thread.id === activeThreadId)
      const oldThread = state.threads[threadIndex]
      const newThread = {
        ...oldThread,
        tweets: oldThread.tweets.filter(t => t.id !== action.id)
      }

      return {
        activeThreadId: state.activeThreadId,
        threads: [
          ...state.threads.slice(0, threadIndex),
          newThread,
          ...state.threads.slice(threadIndex + 1, state.threads.length)
        ]
      }
    }

    case 'OPEN_THREAD':
      return state

    default:
      return state
  }
}
