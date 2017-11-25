import { combineReducers } from 'redux';
// import { threadsById } from './ThreadsById';
import { activeThread } from './activeThread';
import { tweetsByThread } from './tweetsByThread';
import { tweets } from './Tweets';
import { comments } from './Comments';
import { errors } from './Errors';

// function reducer(state, action){
//   return {
//     tweetById: tweetsByIdReducer(state.tweetById, action),
//     threadsById: threadsByIdReducer(state.threadsById, action)
//   }
// }

// export const reducer = combineReducers({
//   errors,
//   threadsById,
//   tweets,
//   comments,
// })

export const reducer = combineReducers({
  activeThread,
  entities,
  tweetsByThread,
})


const entities = combineReducers({
  tweets,
  comments,
})

const workInProgress = combineReducers({
  errors,
  tweets,
  comments,
})
