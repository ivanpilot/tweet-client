import { combineReducers } from 'redux';

export const errors = combineReducers({
  tweets,
  comments,
})

function tweets(state = false, action){
  switch (action.type) {
    case 'FETCH_TWEETS_FAILURE': {
      const res = action.message.response
      debugger
      return {
        message: res.statusText,
        status: res.status
      }
    }

    default:
      return false
  }
}

function comments(state = false, action){
  switch (action.type) {
    // case 'RESET_ERROR_MESSAGE': {
    //   return null
    // }

    case 'FETCH_COMMENTS_FAILURE': {
      const res = action.message.response
      return {
        message: res.statusText,
        status: res.status
      }
    }

    default:
      return false
  }
}

export const getCommentsError = (state) => state.comments
export const getTweetsError = (state) => {
  // debugger
  return state.tweets
}
