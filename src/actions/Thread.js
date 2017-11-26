import * as types from './ActionTypes';

export function triggerThread(threadId){
  return {
      type: types.TRIGGER_THREAD,
      id: threadId
  }
}

export function loadTweets(id, tweets){
  return {
    type: types.LOAD_TWEETS,
    id,
    tweets,
  }
}
