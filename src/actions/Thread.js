import * as types from './ActionTypes';

export function triggerThread(threadId){
  return {
      type: types.TRIGGER_THREAD,
      id: threadId
  }
}

// export function closeThread(threadId){
//   return {
//       type: types.CLOSE_THREAD,
//       threadId: threadId
//   }
// }
