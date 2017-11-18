import { combineReducers } from 'redux';
import { threadsById } from './ThreadsById';
import { tweetsById } from './TweetsById';
import { commentsById } from './CommentsById';
import { tweets } from './Tweets';
// import { commentsById } from './CommentsById';

export const reducer = combineReducers({
  tweets,
  threadsById,
  commentsById
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
