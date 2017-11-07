export const initialState = {
  activeThreadId: 'user-v1',
  activeEditableTweetId: '',
  threads: [
    {
      id: 'user-v1',
      name: 'My Tweets',
      editableTweets: []
    },
    {
      id: 'all',
      name: 'Wall',
      editableTweets: []
    }
  ],
  editableTweets: [],
  editableTweet: {},
  tweet: {}
}
