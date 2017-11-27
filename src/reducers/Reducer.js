import { combineReducers } from 'redux';
// import { threadsById } from './ThreadsById';
import { tweetsByThread } from './tweetsByThread';
import { tweets } from './Tweets';
import { comments } from './Comments';
import { errors } from './Errors';
import { tweetsWIP } from './TweetsWIP';
import { commentsWIP } from './CommentsWIP';
import { errorsWIP } from './ErrorsWIP';



export const reducer = combineReducers({
  entities: combineReducers({
    tweets,
    comments,
  }),
  tweetsByThread,
  errors,
  workInProgress: combineReducers({
    tweetsWIP,
    commentsWIP,
    errorsWIP,
  }),
})

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

// export function reducer(state = {}, action){
//   return {
//     entities: entities(state.entities, action),
//     tweetsByThread: tweetsByThread(state.tweetsByThread, action),
//     workInProgress: workInProgress(state.workInProgress, action),
//   }
// }
//
// function entities(state = {}, action){
//   return {
//     tweets: tweets(state.tweets, action),
//     comments: comments(state.comments, action),
//   }
// }
//
// function workInProgress(state = {}, action){
//   return {
//     errors: errors(state.errors, action),
//     tweets: tweets(state.tweets, action),
//     comments: comments(state.comments, action),
//   }
// }
