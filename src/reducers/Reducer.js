import {client} from '../Client';
import uuid from 'uuid';

const initialState = {
  activeThreadId: 'user-v1',
  activeEditableTweetId: null,
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
}

///////////////
///////////////
///////////////


function findThreadIndex(state){
  const activeThreadId = state.activeThreadId;
  const threadIndex = state.threads.findIndex(thread => thread.id === activeThreadId);
  return threadIndex;
}

//state = editableTweet
function editableTweet(state, action){
  switch (action.type) {
    case 'ADD_TWEET':{
      const newTweet = {
        id: uuid.v4(),
        title: action.tweet.title,
        body: action.tweet.body,
        user_id: client.currentUser().id
      };
      const newEditableTweet = {
        id: uuid.v4(),
        openForm: false,
        tweet: newTweet
      };
      return newEditableTweet;
    }

    case 'EDIT_TWEET':{
      return {
        ...state,
        tweet: {
          ...state.tweet,
          title: action.tweet.title,
          body: action.tweet.body
        }
      }
    }

    default:
      return state
  }
}

//state = thread
function threadReducer(state, action){
  switch (action.type) {
    case 'ADD_TWEET': {
      return {
        ...state,
        editableTweets: [
          editableTweet(state.editableTweets, action),
          ...state.editableTweets
        ]
      }
    }

    case 'EDIT_TWEET': {
      const editableTweetIndex = state.editableTweets.findIndex((eT) => (
        eT.tweet.id === action.tweet.id
      ))

      return {
        ...state,
        editableTweets: [
          ...state.editableTweets.slice(0, editableTweetIndex),
          editableTweet(state.editableTweets[editableTweetIndex], action),
          ...state.editableTweets.slice(editableTweetIndex + 1, state.editableTweets.length)
        ]
      }
    }

    case 'DELETE_TWEET': {
      return {
        ...state,
        editableTweets: state.editableTweets.filter((eT) => (
          eT.tweet.id !== action.id
        ))
      }
    }

    default:
      return state
  }
}

export function reducer(state = initialState, action){
  switch (action.type) {
    case 'ADD_TWEET':
    case 'EDIT_TWEET':
    case 'DELETE_TWEET':
      const threadIndex = findThreadIndex(state)
      const oldThread = state.threads[threadIndex]
      return {
        ...state,
        threads: [
          ...state.threads.slice(0, threadIndex),
          threadReducer(oldThread, action),
          ...state.threads.slice(threadIndex + 1, state.threads.length)
        ]
      }

    case 'ON_EDITABLE_TWEET_MODE': {
      const threadIndexx = findThreadIndex(state)
      const oldThreadd = state.threads[threadIndexx]
      const activeEditableTweet = oldThreadd.editableTweets.find((eT) => (
        eT.tweet.id === action.id
      ))
      return {
        ...state,
        activeEditableTweetId: activeEditableTweet.id
      }
    }

    case 'OFF_EDITABLE_TWEET_MODE': {
      return {
        ...state,
        activeEditableTweetId: null
      }
    }

    case 'OPEN_THREAD':{
      return {
        ...state,
        activeThreadId: action.threadId,
      }
    }

    default:
      return state
  }
}
