import { combineReducers } from 'redux';

export const errors = combineReducers({
  fetching,
})

function failure(state, action){
  debugger
  return {
    message: action.statusText,
    status: action.status
  }
}

function fetching(state = {
  tweets: false,
  tweet: false,
  comments: false,
  comment: false
}, action){
  switch (action.type) {
    case 'FETCH_TWEETS_FAILURE':
    case 'FETCH_TWEET_FAILURE':
    case 'FETCH_COMMENTS_FAILURE':
    case 'FETCH_COMMENT_FAILURE': {
      return {
        ...state,
        [action.object]: failure(state, action.message.response)
      }
    }

    default:
      return state
  }
}

// function fetchingTweet(state = false, action){
//   switch (action.type) {
//     case 'FETCH_TWEET_FAILURE': {
//       return failure(state, action.message.response)
//     }
//
//     default:
//       return false
//   }
// }
//
// function fetchingComment(state = false, action){
//   switch (action.type) {
//     case 'FETCH_COMMENT_FAILURE': {
//       return failure(state, action.message.response)
//     }
//
//     default:
//       return false
//   }
// }
//
// function fetchingTweets(state = false, action){
//   switch (action.type) {
//     case 'FETCH_TWEETS_FAILURE': {
//       // return failure(state, action.message.response)
//       const res = action.message.response
//       debugger
//       return {
//         message: res.statusText,
//         status: res.status
//       }
//     }
//
//     default:
//       return false
//   }
// }
//
// function fetchingComments(state = false, action){
//   switch (action.type) {
//     // case 'RESET_ERROR_MESSAGE': {
//     //   return null
//     // }
//
//     case 'FETCH_COMMENTS_FAILURE': {
//       const res = action.message.response
//       return {
//         message: res.statusText,
//         status: res.status
//       }
//     }
//
//     default:
//       return false
//   }
// }

export const getFetchingCommentsError = (state) => state.fetchingCmments
export const getFetchingTweetsError = (state) => {
  // debugger
  return state.fetchingTweets
}
