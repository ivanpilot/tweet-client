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
      const newTweet = {
        id: uuid.v4(),
        title: action.tweet.title,
        body: action.tweet.body,
        user_id: client.currentUser().id
      }
      const newEditableTweet = {
        id: uuid.v4(),
        openForm: false,
        tweet: newTweet
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
      const editableTweetIndex = oldThread.editableTweets.findIndex(editableTweet => (
        editableTweet.tweet.id === action.tweet.id
      ))
      const oldEditableTweet = oldThread.editableTweets[editableTweetIndex]
      const newEditableTweet = {
        ...oldEditableTweet,
        tweet: {
          ...oldEditableTweet.tweet,
          title: action.tweet.title,
          body: action.tweet.body
        }
      }
      const newThread = {
        ...oldThread,
        editableTweets: [
          ...oldThread.editableTweets.slice(0, editableTweetIndex),
          newEditableTweet,
          ...oldThread.editableTweets.slice(editableTweetIndex + 1, oldThread.editableTweets.length)
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

    case 'OPEN_FORM': {
      const threadIndex = state.threads.findIndex((t) => (
        t.editableTweets.find((eT) => eT.id === action.editableTweetId)
      ))
      const oldThread = state.threads[threadIndex]
      const editableTweetIndex = oldThread.editableTweets.findIndex(eT => (
        eT.id === action.editableTweetId
      ))
      const oldEditableTweet = oldThread.editableTweets[editableTweetIndex]
      const newEditableTweet = {
        ...oldEditableTweet,
        openForm: true
      }
      const newThread = {
        ...oldThread,
        editableTweets: [
          ...oldThread.editableTweets.slice(0, editableTweetIndex),
          newEditableTweet,
          ...oldThread.editableTweets.slice(editableTweetIndex + 1, oldThread.editableTweets.length)
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

    case 'CLOSE_FORM': {
      const threadIndex = state.threads.findIndex((t) => (
        t.editableTweets.find((eT) => eT.id === action.editableTweetId)
      ))
      const oldThread = state.threads[threadIndex]
      const editableTweetIndex = oldThread.editableTweets.findIndex(eT => (
        eT.id === action.editableTweetId
      ))
      const oldEditableTweet = oldThread.editableTweets[editableTweetIndex]
      const newEditableTweet = {
        ...oldEditableTweet,
        openForm: false
      }
      const newThread = {
        ...oldThread,
        editableTweets: [
          ...oldThread.editableTweets.slice(0, editableTweetIndex),
          newEditableTweet,
          ...oldThread.editableTweets.slice(editableTweetIndex + 1, oldThread.editableTweets.length)
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

    default:
      return state
  }
}
