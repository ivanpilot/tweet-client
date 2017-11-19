import { combineReducers } from 'redux';
import { threadsById } from './ThreadsById';
// import { tweetsById } from './TweetsById';
// import { commentsById } from './Comments';
import { tweets } from './Tweets';
import { comments } from './Comments';

export const reducer = combineReducers({
  threadsById,
  tweets,
  comments,
})

// export const reducer = combineReducers({
//   tweetsById,
//   threadsById,
//   commentsById
// })

// function reducer(state, action){
//   return {
//     tweetById: tweetsByIdReducer(state.tweetById, action),
//     threadsById: threadsByIdReducer(state.threadsById, action)
//   }
// }
