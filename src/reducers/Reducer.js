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

function editableTweetReducer(state, action){
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
      debugger
      return newEditableTweet;
    }

    case 'DELETE_TWEET':{
      return state
    }

    default:
      return state
  }
}

function findThreadIndex(state){
  const activeThreadId = state.activeThreadId;
  const threadIndex = state.threads.findIndex(thread => thread.id === activeThreadId);
  return threadIndex;
}

function threadReducer(state, action){
  switch (action.type) {
    case 'ADD_TWEET': {
      return {
        ...state,
        editableTweets: [
          editableTweetReducer(state, action),
          ...state.editableTweets
        ]
      }
    }

    default:
      return state
  }
}

export function reducer(state = initialState, action){
  switch (action.type) {

    case 'ADD_TWEET': {
      const threadIndex = findThreadIndex(state)
      const oldThread = state.threads[threadIndex]
      const newThread = threadReducer(oldThread, action)
      return {
        ...state,
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
      // debugger
      const newThread = {
        ...oldThread,
        editableTweets: oldThread.editableTweets.filter((eT) => (
          eT.tweet.id !== action.id
        ))
      }
      debugger
      return {
        ...state,
        threads: [
          ...state.threads.slice(0, threadIndex),
          newThread,
          ...state.threads.slice(threadIndex + 1, state.threads.length)
        ]
      }

    case 'EDIT_TWEET': {
      // const activeThreadId = state.activeThreadId
      // const threadIndex = state.threads.findIndex(thread => thread.id === activeThreadId)
      const threadIndex = findThreadIndex(state)
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
        ...state,
        threads: [
          ...state.threads.slice(0, threadIndex),
          newThread,
          ...state.threads.slice(threadIndex + 1, state.threads.length)
        ]
      }
    }


    }

    case 'ON_EDITABLE_TWEET_MODE': {
      const activeThreadIdd = state.activeThreadId
      const threadIndex = state.threads.findIndex(thread => thread.id === activeThreadIdd)
      const oldThread = state.threads[threadIndex]
      debugger
      const activeEditableTweetId = oldThread.editableTweets.findIndex((eT) => (
        eT.tweet.id === action.id
      ))
      // debugger
      return {
        ...state,
        activeEditableTweetId: activeEditableTweetId
      }
    }

    case 'OFF_EDITABLE_TWEET_MODE': {
      // debugger
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


    // case 'OPEN_FORM': {
    //   debugger
    //   const threadIndex = state.threads.findIndex((t) => (
    //     t.editableTweets.find((eT) => eT.id === action.editableTweetId)
    //   ))
    //   const oldThread = state.threads[threadIndex]
    //   const editableTweetIndex = oldThread.editableTweets.findIndex(eT => (
    //     eT.id === action.editableTweetId
    //   ))
    //   const oldEditableTweet = oldThread.editableTweets[editableTweetIndex]
    //   const newEditableTweet = {
    //     ...oldEditableTweet,
    //     openForm: true
    //   }
    //   const newThread = {
    //     ...oldThread,
    //     editableTweets: [
    //       ...oldThread.editableTweets.slice(0, editableTweetIndex),
    //       newEditableTweet,
    //       ...oldThread.editableTweets.slice(editableTweetIndex + 1, oldThread.editableTweets.length)
    //     ]
    //   }
    //
    //   return {
    //     ...state,
    //     threads: [
    //       ...state.threads.slice(0, threadIndex),
    //       newThread,
    //       ...state.threads.slice(threadIndex + 1, state.threads.length)
    //     ]
    //   }
    // }
    //
    // case 'CLOSE_FORM': {
    //   debugger
    //   const threadIndex = state.threads.findIndex((t) => (
    //     t.editableTweets.find((eT) => eT.id === action.editableTweetId)
    //   ))
    //   const oldThread = state.threads[threadIndex]
    //   const editableTweetIndex = oldThread.editableTweets.findIndex(eT => (
    //     eT.id === action.editableTweetId
    //   ))
    //   const oldEditableTweet = oldThread.editableTweets[editableTweetIndex]
    //   const newEditableTweet = {
    //     ...oldEditableTweet,
    //     openForm: false
    //   }
    //   const newThread = {
    //     ...oldThread,
    //     editableTweets: [
    //       ...oldThread.editableTweets.slice(0, editableTweetIndex),
    //       newEditableTweet,
    //       ...oldThread.editableTweets.slice(editableTweetIndex + 1, oldThread.editableTweets.length)
    //     ]
    //   }
    //
    //   return {
    //     ...state,
    //     threads: [
    //       ...state.threads.slice(0, threadIndex),
    //       newThread,
    //       ...state.threads.slice(threadIndex + 1, state.threads.length)
    //     ]
    //   }
    // }

    // case 'CLOSE_ALL_FORMS': {
    //   const activeThreadId = state.activeThreadId
    //   const threadIndex = state.threads.findIndex(thread => thread.id === activeThreadId)
    //   const oldThread = state.threads[threadIndex]
    //   const newEditableTweets = oldThread.editableTweets.map((eT) => {
    //     if(eT.tweet.user_id === client.currentUser().id){
    //       return {...eT, openForm: false}
    //     } else {
    //       return {...eT}
    //     }
    //   })
    //   const newThread = {
    //     ...oldThread,
    //     editableTweets: newEditableTweets
    //   }
    //
    //   return {
    //     activeThreadId: state.activeThreadId,
    //     threads: [
    //       ...state.threads.slice(0, threadIndex),
    //       newThread,
    //       ...state.threads.slice(threadIndex + 1, state.threads.length)
    //     ]
    //   }
    // }



    default:
      return state
  }
}
