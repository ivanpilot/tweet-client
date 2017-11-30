import * as types from './ActionTypes';

export function triggerThread(id){
  return {
      type: types.TRIGGER_THREAD,
      id
  }
}

export function loadTweets(id, tweets){
  return {
    type: types.LOAD_TWEETS,
    id,
    tweets,
  }
}

export function loadTweet(id, tweet){
  return {
    type: types.LOAD_TWEET,
    id,
    tweet,
  }
}
