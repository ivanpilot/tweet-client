export function findThreadIndex(threads = null, action){
  switch (action.type) {
    case 'ADD_TWEET':
      return threads.findIndex((t) => t.id === action.threadId)

    case 'EDIT_TWEET':
    case 'DELETE_TWEET':
      return threads.findIndex((t) => t.editableTweets.find(
        (eT) => eT.id === action.editableTweetId
      ))

    default:
      return threads
  }
}
