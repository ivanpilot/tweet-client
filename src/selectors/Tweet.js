export const getAllTweets = (state, listOfTweets) => {
  return listOfTweets.reduce((result, tweetId) => {
    if(Object.keys(state.entities.tweets.byId).includes(tweetId)){
      return [...result, state.entities.tweets.byId[tweetId]]
    }
    return [...result, state.workInProgress.tweetsWIP.byId[tweetId]]
  }, [])
}
