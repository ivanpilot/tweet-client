export const getAllTweets = (state, listOfTweets) => {
  // debugger
  return listOfTweets.reduce((result, tweetId) => {
    // debugger
    if(Object.keys(state.entities.tweets.byId).includes(tweetId.toString())){
      return [...result, state.entities.tweets.byId[tweetId]]
    }
    return [...result, state.workInProgress.tweetsWIP.byId[tweetId]]
  }, [])
}
