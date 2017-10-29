export function addTweet(tweet, threadId){
  return {
      type: 'ADD_TWEET',
      tweet: tweet,
      threadId: threadId
  }
}

export function editTweet(tweet, editableTweetId){
  return {
      type: 'EDIT_TWEET',
      tweet: tweet,
      editableTweetId: editableTweetId
  }
}

export function deleteTweet(editableTweetId){
  return {
      type: 'DELETE_TWEET',
      editableTweetId: editableTweetId
  }
}
