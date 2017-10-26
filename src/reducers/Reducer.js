import {client} from '../Client';
import uuid from 'uuid';

export function reducer(state = {
  activeThreadId: 'user-v1',
  threads: [
    {
      id: 'user-v1',
      name: 'My Tweets',
      editableTweets: [
        {
          id: '1',
          openForm: false,
          tweet: {
            id: 1,
            title: "First tweet",
            body: "This is the first tweet",
            user_id: "1"
          }
        },
        {
          id: '2',
          openForm: false,
          tweet: {
            id: 2,
            title: "Second tweet",
            body: "This is the second tweet",
            user_id: "1"
          }
        }
      ]
    },
    {
      id: 'all',
      name: 'Wall',
      editableTweets: [
        {
          id: '3',
          openForm: false,
          tweet: {
            id: 1,
            title: "First tweet",
            body: "This is the first tweet",
            user_id: "1"
          }
        },
        {
          id: '4',
          openForm: false,
          tweet: {
            id: 2,
            title: "Second tweet",
            body: "This is the second tweet",
            user_id: "1"
          }
        },
        {
          id: '5',
          openForm: false,
          tweet: {
            id: 3,
            title: "Third tweet",
            body: "This is the third tweet",
            user_id: "2"
          }
        }
      ]
    }
  ]
}, action){
  switch (action.type) {
    case 'ADD_TWEET': {
      const newMessage = {
        id: uuid.v4(),
        title: action.tweet.title,
        body: action.tweet.body,
        user_id: client.currentUser().id
      }
      const newEditableTweet = {
        id: uuid.v4(),
        openForm: false,
        tweet: newMessage
      }
      const activeThreadId = state.activeThreadId
      const threadIndex = state.threads.findIndex(thread => thread.id === activeThreadId)
      const oldThread = state.threads[threadIndex]
      const newThread = {
        ...oldThread,
        editableTweets: [
          newEditableTweet,
          ...oldThread.editableTweets
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
      return {
        ...state,
        activeThreadId: action.threadId,
      }

    case 'OPEN_FORM':
      return {
        editFormOpen: true
      }

    case 'CLOSE_FORM':
      return {
        editFormOpen: false
      }

    default:
      return state
  }
}
