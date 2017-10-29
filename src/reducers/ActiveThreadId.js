export function activeThreadId(state = 'user-v1', action){
  switch (action.type) {
    case 'OPEN_THREAD':
      return action.threadId
    default:
      return state
  }
}
