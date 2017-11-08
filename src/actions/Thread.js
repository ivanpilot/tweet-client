import * as types from './ActionTypes';

export function openThread(threadId){
  return {
      type: types.OPEN_THREAD,
      threadId: threadId
  }
}

export function closeThread(threadId){
  return {
      type: types.CLOSE_THREAD,
      threadId: threadId
  }
}
