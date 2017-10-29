export function openThread(threadId){
  return {
      type: 'OPEN_THREAD',
      threadId: threadId
  }
}
