import * as types from './ActionTypes';

export function addTweet(tweet){
  return {
    type: types.ADD_TWEET,
    tweet: tweet,
  }
}

export function editTweet(tweet){
  return {
    type: types.EDIT_TWEET,
    tweet: tweet,
  }
}

export function deleteTweet(id){
  return {
    type: types.DELETE_TWEET,
    id: id
  }
}

export function triggerEditableTweet(id){
  return {
    type: types.TRIGGER_EDITABLE_TWEET,
    id: id
  }
}

export function triggerActivableTweet(id){
  return {
    type: types.TRIGGER_ACTIVABLE_TWEET,
    id: id
  }
}

export function loadTweets(tweets){
  return {
    type: types.LOAD_TWEETS,
    tweets: tweets
  }
}
