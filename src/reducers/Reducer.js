import { combineReducers } from 'redux';
import { threadsById } from './ThreadsById';
import { tweets } from './Tweets';
import { comments } from './Comments';
import { errors } from './Errors';

export const reducer = combineReducers({
  errors,
  threadsById,
  tweets,
  comments,
})

// function reducer(state, action){
//   return {
//     tweetById: tweetsByIdReducer(state.tweetById, action),
//     threadsById: threadsByIdReducer(state.threadsById, action)
//   }
// }
