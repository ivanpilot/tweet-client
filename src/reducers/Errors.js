import { combineReducers } from 'redux';

export const errors = combineReducers({
  connect,
  fetching,
})

function connect(state = false, action){
  switch (action.type) {
    case 'CONNECT_FAILURE':
      return {
        message: action.message.response.statusText// || action.message,
        status: action.message.response.status// || action.status
      }
    default:
      return false
  }
}

function fetching(state = {
  tweets: false,
  tweet: false,
  comments: false,
  comment: false
}, action){
  switch (action.type) {
    case 'FETCH_ITEM_FAILURE': {
      return {
        ...state,
        [action.item]: {
          id: action.id,
          message: action.message.response.statusText,
          status: action.message.response.status
        }
      }
    }

    default:
      return {
        tweets: false,
        tweet: false,
        comments: false,
        comment: false
      }
  }
}

export const getConnectError = (state) => {
  // debugger
  return state.connect
}
export const getFetchingTweetsError = (state) => state.fetching.tweets
export const getFetchingTweetError = (state) => state.fetching.tweet
export const getFetchingCommentsError = (state) => state.fetching.comments
export const getFetchingCommentError = (state) => state.fetching.comment
