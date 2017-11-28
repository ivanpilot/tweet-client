import { combineReducers } from 'redux';
// import { threadsById } from './ThreadsById';
import { tweetsByThread } from './tweetsByThread';
import { tweets } from './Tweets';
import { comments } from './Comments';
import { errors } from './Errors';
// import { tweetsWIP } from './TweetsWIP';
// import { commentsWIP } from './CommentsWIP';
// import { errorsWIP } from './ErrorsWIP';



export const reducer = combineReducers({
  entities: combineReducers({
    tweets,
    comments,
  }),
  tweetsByThread,
  errors,
})

// function reducer(state, action){
//   return {
//     tweetById: tweetsByIdReducer(state.tweetById, action),
//     threadsById: threadsByIdReducer(state.threadsById, action)
//   }
// }
