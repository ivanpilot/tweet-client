import {combineReducers} from 'redux';
// import {activeThreadId} from './ActiveThreadId'
// import {activeEditableTweetId} from './ActiveEditableTweetId'
// import {threads} from './Threads'
import { threadsById } from './ThreadsById';

// export const reducer = combineReducers({
//   activeThreadId,
//   activeEditableTweetId,
//   threads
// })

export const reducer = combineReducers({
  tweetsById,
  threadsById,
})

// function reducer(state, action){
//   return {
//     tweetById: tweetsByIdReducer(state.tweetById, action),
//     threadsById: threadsByIdReducer(state.threadsById, action)
//   }
// }
