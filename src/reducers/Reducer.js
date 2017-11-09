import { combineReducers } from 'redux';
import { threadsById } from './ThreadsById';
import { tweetsById } from './TweetsById';

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
